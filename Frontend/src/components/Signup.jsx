import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // watch the password and confirm password fields
  const password = watch("password", "");
  watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
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
          <div className="absolute left-[14%] top-[14%] h-44 w-44 rounded-full bg-emerald-400/12 blur-3xl" />
          <div className="absolute bottom-[10%] right-[8%] h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 w-full max-w-md space-y-4 rounded-[28px] border border-white/10 bg-slate-950/70 px-6 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
          <div className="space-y-2 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/70">
              Create Account
            </p>
            <h1 className="text-3xl font-semibold text-white">
              Chat<span className="text-emerald-400">App</span>
            </h1>
            <p className="text-sm text-slate-400">
              Join with a lightweight setup and start chatting instantly.
            </p>
          </div>
          {/* Fullname */}
          <label className="input flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-slate-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow bg-transparent"
              placeholder="Fullname"
              {...register("fullname", { required: true })}
            />
          </label>
          {errors.fullname && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}
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
              type="email"
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

          {/*Confirm Password */}
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
              placeholder="confirm password"
              {...register("confirmPassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
            />
          </label>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.confirmPassword.message}
            </span>
          )}

          {/* Text & Button */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-slate-400">
              Have an account?
              <Link
                to="/login"
                className="ml-1 text-emerald-300 transition hover:text-emerald-200"
              >
                Login
              </Link>
            </p>
            <input
              type="submit"
              value="Signup"
              className="cursor-pointer rounded-xl bg-emerald-500 px-5 py-2.5 font-medium text-slate-950 transition hover:bg-emerald-400"
            />
          </div>
        </form>
      </div>
  );
}

export default Signup;
