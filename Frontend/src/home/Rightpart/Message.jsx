function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? "chat-end" : "chat-start";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="px-1 py-1.5">
      <div>
        <div className={`chat ${chatName}`}>
          <div
            className={`chat-bubble max-w-[82%] rounded-[22px] border px-4 py-3 text-[15px] leading-relaxed text-white shadow-[0_16px_35px_rgba(0,0,0,0.18)] ${
              itsMe
                ? "border-emerald-300/20 bg-gradient-to-br from-emerald-400 to-emerald-500"
                : "border-white/10 bg-slate-800/95 backdrop-blur-xl"
            }`}
          >
            {message.message}
          </div>
          <div
            className={`chat-footer mt-1 px-2 text-[11px] tracking-wide ${
              itsMe ? "text-emerald-100/70" : "text-slate-500"
            }`}
          >
            <span>{formattedTime}</span>
            {itsMe && (
              <span className="ml-2 font-medium">
                {message.seen ? "Seen" : "Delivered"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
