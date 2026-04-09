import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";

function Left() {
  return (
    <div className="flex h-full w-full flex-col bg-transparent px-3 py-4 text-gray-300">
      <Search />
      <div
        className="mt-3 flex-1 overflow-y-auto rounded-[24px] border border-white/8 bg-slate-900/65 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <Users />
      </div>
      <Logout />
    </div>
  );
}

export default Left;
