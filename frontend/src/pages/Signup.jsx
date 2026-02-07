import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RouteIndex, RouteSignin } from "../helpers/RouteName";
import { showToast } from "../helpers/ShowToast";
import { IoHomeOutline } from "react-icons/io5";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (values) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, values);
      showToast("success", "Account created successfully!");
      navigate("/signin");
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Signup failed. Please try again.",
      );
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h2 className="flex items-center justify-end">
          <Link
            to={RouteIndex}
            className="cursor-pointer flex items-center gap-1 hover:text-blue-500 hover:underline">
            <IoHomeOutline />
            Back to Home
          </Link>
        </h2>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        {/* Full Name */}
        <div className="flex flex-col">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

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
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
              },
            })}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Password do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
          Sign Up
        </button>

        {/* Footer Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          {/* <a href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </a> */}
          <Link to={RouteSignin} className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
