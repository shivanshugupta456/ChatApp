import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };
  return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
        <div className="absolute inset-0 opacity-60">
          <div className="absolute left-[12%] top-[16%] h-44 w-44 rounded-full bg-emerald-400/12 blur-3xl" />
          <div className="absolute bottom-[12%] right-[10%] h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 w-full max-w-md space-y-4 rounded-[28px] border border-white/10 bg-slate-950/70 px-6 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
          <div className="space-y-2 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/70">
              Welcome Back
            </p>
            <h1 className="text-3xl font-semibold text-white">
              Chat<span className="text-emerald-400">App</span>
            </h1>
            <p className="text-sm text-slate-400">
              Continue your conversations with a cleaner, faster workspace.
            </p>
          </div>

          {/* Email */}
          <label className="input flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-slate-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow bg-transparent"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
          {/* Password */}
          <label className="input flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-slate-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow bg-transparent"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
          {/* Text & Button */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-slate-400">
              New user?
              <Link
                to="/signup"
                className="ml-1 text-emerald-300 transition hover:text-emerald-200"
              >
                Signup
              </Link>
            </p>
            <input
              type="submit"
              value="Login"
              className="cursor-pointer rounded-xl bg-emerald-500 px-5 py-2.5 font-medium text-slate-950 transition hover:bg-emerald-400"
            />
          </div>
        </form>
      </div>
  );
}

export default Login;
