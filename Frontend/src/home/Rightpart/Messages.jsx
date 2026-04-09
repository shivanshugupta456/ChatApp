import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // listing incoming messages

  const lastMsgRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);
  return (
    <div
      className="flex-1 overflow-y-auto bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] px-2 py-4 md:px-4"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-[24px] border border-white/10 bg-white/5 px-8 py-6 text-center shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/70">
              New Conversation
            </p>
            <p className="text-slate-400">Say hi to start the conversation.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
