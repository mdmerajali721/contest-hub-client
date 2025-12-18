import { useLocation } from "react-router";
import { Link } from "react-router";
import { HiMenuAlt2 } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const { role } = useRole();
  const location = useLocation();

  // Dynamically set page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("participated")) return "My Participated Contests";
    if (path.includes("winning")) return "My Winning Contests";
    if (path.includes("profile")) return "My Profile";
    return "Dashboard";
  };

  return (
    <header className="fixed md:sticky top-0 z-50 w-full bg-base-100 shadow backdrop-blur-md border-b border-base-300">
      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        {/* Left: Mobile Menu + Page Title */}
        <div className="flex items-center gap-1">
          {/* Mobile Hamburger */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-base-200 transition"
            aria-label="Toggle Sidebar"
          >
            <HiMenuAlt2 className="w-6 h-6 text-green-600" />
          </button>

          {/* Page Title */}
          <div className="flex flex-col">
            <Link to="/" className="text-2xl font-extrabold text-green-500">
              {getPageTitle()}
            </Link>
          </div>
        </div>

        {/* Right: Theme Toggle + Profile */}
        <div className="flex items-center gap-1">
          {/* Theme Switch */}
          <ThemeToggle />

          {/* Profile */}
          <div className="flex items-center gap-2 px-3 py-1.5  transition cursor-pointer">
            <img
              src={user?.photoURL || "/avatar.jpg"}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-green-500"
            />
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-sm font-semibold">
                {user?.displayName || "User"}
              </span>
              <span className="text-xs text-green-600">{role}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;