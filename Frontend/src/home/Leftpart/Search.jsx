import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };
  return (
    <div className="h-[10vh]">
      <div className="px-2 py-2">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 rounded-[22px] border border-white/8 bg-slate-900/65 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <label className="flex w-full items-center gap-2 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-slate-300 transition focus-within:border-emerald-400/30 focus-within:bg-white/[0.07]">
              <input
                type="text"
                className="grow bg-transparent outline-none placeholder:text-slate-500"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="rounded-2xl bg-emerald-500 p-3 text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              <FaSearch className="text-xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
