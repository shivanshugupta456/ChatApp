function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? " chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="px-1 py-2">
      <div>
        <div className={`chat ${chatName}`}>
          <div
            className={`chat-bubble max-w-[80%] border text-white shadow-[0_12px_30px_rgba(0,0,0,0.16)] ${
              itsMe
                ? "border-emerald-400/20 bg-emerald-500/90"
                : "border-white/10 bg-slate-800/95"
            }`}
          >
            {message.message}
          </div>
          <div className="chat-footer mt-1 px-1 text-[11px] text-slate-500">
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
