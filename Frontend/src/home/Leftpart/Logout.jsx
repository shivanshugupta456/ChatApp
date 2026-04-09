import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };
  return (
    <div className="mt-3 border-t border-white/8 pt-3">
      <div className="rounded-[22px] border border-white/8 bg-slate-900/65 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="flex items-center justify-between rounded-2xl border border-transparent px-3 py-2 transition hover:border-white/8 hover:bg-white/5">
          <div>
            <p className="text-sm font-medium text-white">Sign out</p>
            <p className="text-xs text-slate-400">Securely end this session</p>
          </div>
          <BiLogOutCircle
            className="cursor-pointer rounded-2xl bg-white/5 p-3 text-4xl text-white transition duration-300 hover:bg-rose-500/15 hover:text-rose-200"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}

export default Logout;
