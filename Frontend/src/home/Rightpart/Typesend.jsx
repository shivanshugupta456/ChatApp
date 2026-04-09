import { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
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
              onChange={(e) => setMessage(e.target.value)}
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
