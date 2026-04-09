import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import profile from "../../../public/user.jpg";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers, typingUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  const isTyping = Boolean(typingUsers[selectedConversation._id]);
  const statusText = isTyping
    ? "Typing..."
    : getOnlineUsersStatus(selectedConversation._id);

  return (
    <div className="relative flex items-center justify-center gap-4 border-b border-white/8 bg-white/5 px-4 py-4 backdrop-blur-xl">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-4 border border-white/10 bg-slate-900/70 transition hover:border-emerald-400/20 hover:bg-slate-800/90"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex items-center justify-center space-x-3 rounded-2xl border border-white/8 bg-slate-900/60 px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
        <div className={`avatar ${getOnlineUsersStatus(selectedConversation._id) === "Online" ? "online" : ""}`}>
          <div className="w-14 rounded-full ring-1 ring-white/10">
            <img src={profile} />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white">{selectedConversation.fullname}</h1>
          <span
            className={`text-sm ${
              isTyping ? "font-medium text-emerald-300" : "text-slate-400"
            }`}
          >
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
