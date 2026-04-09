import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // current logged in user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save()
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]); // run parallel
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const markMessagesAsSeen = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const currentUserId = req.user._id;
    const seenAt = new Date();

    const unseenMessages = await Message.find({
      senderId: chatUser,
      receiverId: currentUserId,
      seen: false,
    }).select("_id");

    if (unseenMessages.length === 0) {
      return res.status(200).json([]);
    }

    const messageIds = unseenMessages.map((message) => message._id);

    await Message.updateMany(
      { _id: { $in: messageIds } },
      { $set: { seen: true, seenAt } }
    );

    const senderSocketId = getReceiverSocketId(chatUser);
    if (senderSocketId) {
      io.to(senderSocketId).emit("messagesSeen", {
        messageIds: messageIds.map((id) => id.toString()),
        seenAt,
        seenBy: currentUserId.toString(),
      });
    }

    const updatedMessages = await Message.find({ _id: { $in: messageIds } });
    res.status(200).json(updatedMessages);
  } catch (error) {
    console.log("Error in markMessagesAsSeen", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; // current logged in user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }
    const messages = conversation.messages;

    const unseenMessageIds = messages
      .filter(
        (message) =>
          message.senderId.toString() === chatUser &&
          message.receiverId.toString() === senderId.toString() &&
          !message.seen
      )
      .map((message) => message._id);

    if (unseenMessageIds.length > 0) {
      const seenAt = new Date();

      await Message.updateMany(
        { _id: { $in: unseenMessageIds } },
        { $set: { seen: true, seenAt } }
      );

      messages.forEach((message) => {
        if (unseenMessageIds.some((id) => id.toString() === message._id.toString())) {
          message.seen = true;
          message.seenAt = seenAt;
        }
      });

      const senderSocketId = getReceiverSocketId(chatUser);
      if (senderSocketId) {
        io.to(senderSocketId).emit("messagesSeen", {
          messageIds: unseenMessageIds.map((id) => id.toString()),
          seenAt,
          seenBy: senderId.toString(),
        });
      }
    }

    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
