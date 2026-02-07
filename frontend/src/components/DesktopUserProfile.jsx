import { Link, useNavigate } from "react-router-dom";
import { RouteIndex } from "../helpers/RouteName";
import { FaUserCircle, FaRegUser } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/slices/user.slice";
import axios from "axios";
import { showToast } from "../helpers/ShowToast";

export default function DesktopUserProfile({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/signout`,
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate(RouteIndex);
      showToast("success", response.data.message);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message ||
          "Something went wrong, Please try again."
      );
    }
  };

  return (
    <div className="relative hidden md:inline-block text-left">
      <Menu>
        {/* Profile Button */}
        <MenuButton className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full cursor-pointer transition">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-600" />
          )}
        </MenuButton>

        {/* Dropdown Menu */}
        <MenuItems
          transition
          className="absolute right-0 mt-2 w-48 sm:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none 
          data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-leave:duration-100"
        >
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-semibold text-gray-800 truncate">
              {user?.fullName}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>

          {/* Profile Link */}
          <MenuItem>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-700 transition"
            >
              <FaRegUser /> Profile
            </Link>
          </MenuItem>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2" />

          {/* Auth Actions */}
          <div className="px-4 pb-3">
            {user ? (
              <button
                onClick={handleSignout}
                className="block w-full cursor-pointer text-sm font-medium bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/signin"
                className="block w-full cursor-pointer text-center font-semibold bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md transition"
              >
                Sign in
              </Link>
            )}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
