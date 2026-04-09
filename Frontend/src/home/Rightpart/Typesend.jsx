import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Typesend() {
  const [message, setMessage] = useState("");
  const { sendMessages } = useSendMessage();
  const { selectedConversation } = useConversation();
  const { startTyping, stopTyping } = useSocketContext();
  const typingTimeoutRef = useRef(null);
  const activeTypingConversationRef = useRef(null);

  const clearTypingTimeout = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  const stopTypingForConversation = (receiverId) => {
    if (!receiverId) {
      return;
    }

    stopTyping(receiverId);
    if (activeTypingConversationRef.current === receiverId) {
      activeTypingConversationRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearTypingTimeout();
      stopTypingForConversation(activeTypingConversationRef.current);
    };
  }, []);

  useEffect(() => {
    const currentConversationId = selectedConversation?._id;
    const previousConversationId = activeTypingConversationRef.current;

    if (previousConversationId && previousConversationId !== currentConversationId) {
      stopTypingForConversation(previousConversationId);
    }
  }, [selectedConversation?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }

    await sendMessages(message);
    clearTypingTimeout();
    stopTypingForConversation(selectedConversation?._id);
    setMessage("");
  };

  const handleMessageChange = (e) => {
    const nextMessage = e.target.value;
    const receiverId = selectedConversation?._id;

    setMessage(nextMessage);

    if (!receiverId) {
      return;
    }

    clearTypingTimeout();

    if (!nextMessage.trim()) {
      stopTypingForConversation(receiverId);
      return;
    }

    if (activeTypingConversationRef.current !== receiverId) {
      if (activeTypingConversationRef.current) {
        stopTypingForConversation(activeTypingConversationRef.current);
      }

      startTyping(receiverId);
      activeTypingConversationRef.current = receiverId;
    }

    typingTimeoutRef.current = setTimeout(() => {
      stopTypingForConversation(receiverId);
      typingTimeoutRef.current = null;
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 border-t border-white/8 bg-white/5 px-4 py-3 backdrop-blur-xl">
        <div className="mx-1 w-full">
          <div className="flex items-center rounded-[24px] border border-white/10 bg-slate-900/70 px-4 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition focus-within:border-emerald-400/40">
            <input
              type="text"
              placeholder="Write a message..."
              value={message}
              onChange={handleMessageChange}
              className="w-full bg-transparent px-1 py-3 text-slate-100 outline-none transition placeholder:text-slate-500"
            />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500 md:block">
              Enter
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-2xl bg-emerald-500 p-3 text-slate-950 shadow-[0_14px_30px_rgba(16,185,129,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-400"
        >
          <IoSend className="text-2xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
