import { useEffect } from "react";
import axios from "axios";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();

      if (selectedConversation?._id === newMessage.senderId) {
        axios.post(`/api/message/seen/${newMessage.senderId}`).catch((error) => {
          console.log("Error marking message as seen", error);
        });
      }

      if (
        selectedConversation?._id &&
        selectedConversation._id !== newMessage.senderId
      ) {
        return;
      }

      setMessage([...messages, newMessage]);
    });

    socket.on("messagesSeen", ({ messageIds, seenAt }) => {
      if (!Array.isArray(messageIds) || messageIds.length === 0) {
        return;
      }

      setMessage(
        messages.map((message) =>
          messageIds.includes(message._id)
            ? { ...message, seen: true, seenAt }
            : message
        )
      );
    });

    return () => {
      socket.off("newMessage");
      socket.off("messagesSeen");
    };
  }, [socket, messages, selectedConversation, setMessage]);
};

export default useGetSocketMessage;
