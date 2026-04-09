import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers] = useGetAllUsers();

  return (
    <div>
      <div className="mb-2 flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-5 py-3">
        <div>
          <h1 className="font-semibold text-white">Messages</h1>
          <p className="text-xs text-slate-400">{allUsers.length} contacts</p>
        </div>
        <div className="rounded-full bg-emerald-400/12 px-3 py-1 text-xs text-emerald-300">
          Active
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto py-2"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
