import { forwardRef } from "react";
import { Link, useLocation } from "react-router";
import { FaTrophy, FaUserFriends } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { toast } from "react-toastify";
import { FaChalkboardUser } from "react-icons/fa6";
import { RiFileSettingsFill, RiUserReceived2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdLibraryAdd } from "react-icons/md";
import { GrDocumentUser } from "react-icons/gr";

/* Menu Item */
const MenuItem = forwardRef(
  (
    { icon: Icon, text, isDestructive = false, active = false, onClick },
    ref
  ) => (
    <button
      ref={ref}
      onClick={onClick}
      role="menuitem"
      tabIndex={0}
      className={`
        flex items-center w-full px-4 py-3 rounded text-sm font-semibold transition-all duration-200
        ${
          isDestructive
            ? "text-red-500 hover:bg-red-100"
            : active
            ? "bg-green-100 font-bold text-green-700"
            : "hover:text-green-500"
        }
      `}
    >
      {Icon && (
        <Icon
          className={`mr-3 text-lg ${
            active ? "text-green-600" : "text-neutral/60 dark:text-neutral/400"
          }`}
        />
      )}
      {text}
    </button>
  )
);

/* Sidebar Components */
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { role } = useRole();
  const { logOutUser } = useAuth();

  const handleLogOut = () =>
    logOutUser().catch((err) => toast.error(err.message));

  const menuItems =
    role === "user"
      ? [
          { name: "Dashboard", icon: FaChalkboardUser, path: "/dashboard" },
          {
            name: "Participated Contests",
            icon: FaUserFriends,
            path: "/dashboard/participated-contests",
          },
          {
            name: "Winning Contests",
            icon: FaTrophy,
            path: "/dashboard/winning",
          },
          { name: "Profile", icon: CgProfile, path: "/dashboard/profile" },
        ]
      : role === "creator"
      ? [
          { name: "Dashboard", icon: FaChalkboardUser, path: "/dashboard" },
          {
            name: "Add Contest",
            icon: MdLibraryAdd,
            path: "/dashboard/add-contest",
          },
          {
            name: "My Contests",
            icon: GrDocumentUser,
            path: "/dashboard/my-contests",
          },
        ]
      : [
          { name: "Dashboard", icon: FaChalkboardUser, path: "/dashboard" },
          {
            name: "Manage Users",
            icon: FaUserFriends,
            path: "/dashboard/users",
          },
          {
            name: "Manage Contests",
            icon: RiFileSettingsFill,
            path: "/dashboard/contests",
          },
        ];

  const isActive = (path) =>
    path === "/dashboard"
      ? location.pathname === "/dashboard"
      : location.pathname.startsWith(path);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          mt-20 md:mt-0 fixed inset-y-0 left-0 z-50 w-72 bg-base-100 shadow backdrop-blur-xl 
          transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }
          lg:translate-x-0 lg:sticky lg:top-0 lg:h-max
        `}
      >
        {/* Logo */}
        <div className="px-6 py-8 border-b border-gray-200">
          <Link to="/" className="flex flex-col">
            <h1 className="text-3xl font-extrabold text-green-500">
              Contest<span className="text-gray-500">Hub</span>
            </h1>
            <span className="text-xs text-gray-400 mt-1">
              Contest Management Platform
            </span>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item, i) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              className="block animate__animated animate__fadeInLeft"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <MenuItem
                icon={item.icon}
                text={item.name}
                active={isActive(item.path)}
              />
            </Link>
          ))}
        </nav>
        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <MenuItem
            icon={RiUserReceived2Fill}
            text="Log Out"
            isDestructive
            onClick={handleLogOut}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
