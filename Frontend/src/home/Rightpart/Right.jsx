import { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="min-h-[calc(100vh-1.5rem)] w-full overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/58 text-gray-300 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
      <div>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div
              className=" flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 8vh)" }}
            >
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.12),transparent_32%)]" />
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5 top-5 border border-white/10 bg-slate-900/70"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex min-h-[calc(100vh-1.5rem)] items-center justify-center px-6">
        <div className="max-w-xl rounded-[28px] border border-white/10 bg-white/5 px-8 py-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/70">
            Inbox Ready
          </p>
          <h1 className="text-center text-2xl leading-relaxed text-slate-200">
            Welcome{" "}
            <span className="text-xl font-semibold text-white">
              {authUser.user.fullname}
            </span>
            <br />
            <span className="text-base text-slate-400">
              No chat selected yet. Pick a contact from the sidebar to start a conversation.
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};
