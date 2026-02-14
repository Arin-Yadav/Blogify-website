import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignup } from "../helpers/RouteName";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user.slice";
import { showToast } from "../helpers/ShowToast";
import { IoHomeOutline } from "react-icons/io5";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/signin`,
        values,
        { withCredentials: true },
      );
      dispatch(setUser(response.data.user));
      navigate(RouteIndex)
      showToast("success", "Signed in successfully!");
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Sign in failed. Please try again.",
      );
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-4">
          <h2 className="flex items-center justify-end">
            <Link to={RouteIndex} className="cursor-pointer flex items-center gap-1 hover:text-blue-500 hover:underline">
            <IoHomeOutline />
              Back to Home
            </Link>
          </h2>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h2>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors outline-none cursor-pointer">
          Sign In
        </button>

        {/* Footer Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to={RouteSignup} className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
