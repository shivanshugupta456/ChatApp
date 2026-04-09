import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import profile from "../../../public/user.jpg";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`mb-1 rounded-2xl border transition duration-300 ${
        isSelected
          ? "border-emerald-400/30 bg-emerald-400/10 shadow-[0_10px_30px_rgba(16,185,129,0.10)]"
          : "border-transparent hover:border-white/10 hover:bg-white/5"
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex cursor-pointer items-center space-x-4 px-5 py-3">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={profile} />
          </div>
        </div>
        <div className="min-w-0">
          <h1 className="truncate font-semibold text-white">{user.fullname}</h1>
          <span className="block truncate text-sm text-slate-400">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
