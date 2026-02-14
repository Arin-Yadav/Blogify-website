import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import DesktopUserProfile from "./DesktopUserProfile";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const user = useSelector((state) => state.user);

  return (
    <nav className="sticky top-0 z-20 w-full h-16 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 shadow-md flex items-center md:justify-between">
      {/* Left: Mobile Sidebar Toggle */}
      <div className="flex gap-2 items-center">
        <button
          className="lg:hidden p-2 rounded-md bg-white border border-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 transition-transform hover:scale-105"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <IoCloseSharp size={22} />
          ) : (
            <RxHamburgerMenu size={22} />
          )}
        </button>
        <h1 className="text-2xl font-bold">✍️ Blogify</h1>
      </div>

      {/* Right: Auth/Profile */}
      <div className="flex items-center gap-3 sm:gap-6">
        {!user.isLoggedIn ? (
          <Link
            to="/signin"
            className="hidden md:block px-4 py-2 text-sm sm:text-base font-semibold rounded-full bg-[#0f766e] hover:bg-[#0c615a] text-white transition-transform hover:scale-105 shadow-sm">
            Sign in
          </Link>
        ) : (
          <DesktopUserProfile user={user.user} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
