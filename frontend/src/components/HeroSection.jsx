import { Link } from "react-router-dom";
import { RouteSignup } from "../helpers/RouteName";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-8 py-12 bg-gradient-to-b from-teal-50 via-white to-teal-100 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-72 h-72 bg-teal-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-6 sm:gap-8 text-center max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Discover Stories That Matter
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-700 opacity-90">
          Join our community of writers and readers sharing insights,
          experiences, and knowledge across diverse topics.
        </p>

        {!user.isLoggedIn && (
          <Link to={RouteSignup}>
            <button className="mt-4 px-6 cursor-pointer sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold bg-[#0f766e] text-white rounded-full shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:scale-105">
              Join Now <span className="ml-1">→</span>
            </button>
          </Link>
        )}
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16 sm:h-24 md:h-32 text-teal-200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0 C600,120 600,0 1200,120 L1200,0 L0,0 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
