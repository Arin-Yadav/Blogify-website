import { LuUsers } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {
  RouteIndex,
  RouteUsers,
} from "../helpers/RouteName";
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/slices/user.slice";
import { showToast } from "../helpers/ShowToast";
import axios from "axios";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/signout`,
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

  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={handleCloseSidebar}>
          {/* Sidebar */}
          <div
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 shadow-md flex flex-col justify-between transform transition-transform duration-700 z-40 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {user?.user.isLoggedIn ? (
                <div className="flex items-center pb-2">
                  <img
                    src={user?.user.avatar}
                    alt="avatar"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover cursor-pointer"
                  />
                  <div className="px-4 text-sm text-gray-700">
                    <p className="font-semibold truncate">
                      {user?.user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.user.email}
                    </p>
                  </div>
                </div>
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-600" />
              )}

              <Link
                to={RouteIndex}
                onClick={handleCloseSidebar}
                className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e]">
                <IoHomeOutline className="mr-2" /> Home
              </Link>

              {user?.isLoggedIn && user?.user?.role === "user" && (
                <>
                  <Link
                    to="/profile"
                    onClick={handleCloseSidebar}
                    className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-[#0f766e]">
                    <FaRegUser className="mr-2" /> Profile
                  </Link>
                </>
              )}

              {user?.isLoggedIn && user?.user?.role === "admin" && (
                <>
                  <Link
                    to={RouteUsers}
                    onClick={handleCloseSidebar}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 hover:text-[#0f766e]">
                    <LuUsers className="mr-2" /> Users
                  </Link>
                </>
              )}
            </nav>

            {/* Auth Buttons pinned at bottom */}
            <div className="px-4 py-3 border-t border-gray-200">
              {!user?.isLoggedIn ? (
                <Link
                  to="/signin"
                  onClick={handleCloseSidebar}
                  className="w-full block text-center font-semibold bg-[#0f766e] hover:bg-[#0c615a] text-white px-5 py-2 rounded-md transition-colors">
                  Sign in
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleCloseSidebar();
                    handleSignout();
                  }}
                  className="w-full block text-sm font-medium bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
