import { Link, useNavigate } from "react-router-dom";
import { RouteCreateBlog, RouteIndex } from "../helpers/RouteName";
import { FaUserCircle, FaRegUser } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/slices/user.slice";
import axios from "axios";
import { showToast } from "../helpers/ShowToast";
import { GrBlog } from "react-icons/gr";

export default function DesktopUserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fullUser = useSelector((state) => state.user);
  const user = fullUser?.user;

  const handleSignout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/signout`,
        { withCredentials: true },
      );
      dispatch(removeUser());
      navigate(RouteIndex);
      showToast("success", response.data.message);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message ||
          "Something went wrong, Please try again.",
      );
    }
  };

  return (
    <div className="relative hidden md:inline-block text-left">
      <Menu>
        {/* Profile Button */}
        <MenuButton className="cursor-pointer transition">
          {user && (
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Username */}
              <span className="font-medium text-gray-900 text-sm sm:text-base md:text-lg">
                Hello, {user?.fullName || "Anonymous"}
              </span>

              {/* Avatar */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-semibold">
                {user?.fullName?.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </MenuButton>

        {/* Dropdown Menu */}
        <MenuItems
          transition
          className="absolute right-0 mt-2 w-48 sm:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none 
          data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-leave:duration-100">
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
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-700 transition">
              <FaRegUser /> Profile
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              to={RouteCreateBlog}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-700 transition">
              <GrBlog /> Create Blog
            </Link>
          </MenuItem>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2" />

          {/* Auth Actions */}
          <div className="px-4 pb-3">
            {user ? (
              <button
                onClick={handleSignout}
                className="block w-full cursor-pointer text-sm font-medium bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition">
                Logout
              </button>
            ) : (
              <Link
                to="/signin"
                className="block w-full cursor-pointer text-center font-semibold bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md transition">
                Sign in
              </Link>
            )}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
