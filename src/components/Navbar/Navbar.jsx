import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

import {
  RiMenuFoldFill,
  RiMenuFold2Fill,
  RiUserSharedFill,
  RiUserReceived2Fill,
} from "react-icons/ri";
import { GrContact } from "react-icons/gr";
import { AiOutlineHome } from "react-icons/ai";
import { FaFileContract } from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdLeaderboard } from "react-icons/md";

import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "animate.css";

const Navbar = () => {
  const { user, loading, logOutUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logOutUser();
    setProfileOpen(false);
    setMenuOpen(false);
  };

  const menuItems = [
    { to: "/", label: "Home", icon: <AiOutlineHome /> },
    { to: "/all-contests", label: "All Contests", icon: <FaFileContract /> },
    { to: "/about", label: "About", icon: <GrContact /> },
    { to: "/leaderboard", label: "Leaderboard", icon: <MdLeaderboard /> },
  ];

  const MenuLink = ({ item, close, delay = 0 }) => (
    <NavLink
      to={item.to}
      onClick={close}
      style={{ animationDelay: `${delay}ms` }}
      className={({ isActive }) =>
        `px-3 py-2 flex items-center gap-2 font-semibold rounded transition
        animate__animated animate__fadeInRight
        ${isActive ? "bg-base-300 text-green-500" : "hover:text-green-500"}`
      }
    >
      {item.icon} {item.label}
    </NavLink>
  );

  if (loading) return null;

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-base-100 shadow-md fixed p-2 w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-2">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="mb-2">
              <h1 className="font-extrabold text-3xl text-green-500">
                Contest<span className="text-gray-500">Hub</span>
              </h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-3">
              {menuItems.map((item) => (
                <MenuLink key={item.to} item={item} />
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Profile */}
              {user ? (
                <div className="relative" ref={profileRef}>
                  <img
                    src={user.photoURL || "/avator.jpg"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-green-600 cursor-pointer hover:scale-110 transition"
                    onClick={() => setProfileOpen(!profileOpen)}
                  />

                  {profileOpen && (
                    <div className="hidden md:block absolute right-0 mt-4 w-64 bg-base-200 rounded shadow-2xl border border-base-300 animate__animated animate__fadeIn">
                      <div className="p-4 border-b border-base-300">
                        <p className="flex items-center gap-2 uppercase text-green-600 font-bold">
                          <CgProfile className="text-xl" />
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 font-semibold py-5 mb-6 px-4 my-2 hover:text-green-600 text-green-500 bg-base-200 shadow-md hover:bg-base-300"
                      >
                        <FaChalkboardUser /> Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-red-100 text-red-500 transition"
                      >
                        <RiUserReceived2Fill /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth/login"
                  className="hidden md:flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  <RiUserSharedFill /> Login
                </Link>
              )}

              {/* Mobile Toggle */}
              <button
                className="md:hidden text-3xl text-green-600"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <RiMenuFold2Fill /> : <RiMenuFoldFill />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* BACKDROP */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-17 right-0 h-full w-[60%] bg-base-100 shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <nav className="flex flex-col gap-2">
            {menuItems.map((item, i) => (
              <MenuLink
                key={item.to}
                item={item}
                close={() => setMenuOpen(false)}
                delay={i * 100}
              />
            ))}

            {user ? (
              <div className="mt-4 pt-6 border-t border-green-600">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={user.photoURL || "/avator.jpg"}
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-green-600"
                  />
                  <div>
                    <p className="font-bold uppercase text-green-600">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 font-semibold py-5 mb-6 px-4 rounded-md hover:text-green-600 text-green-500 bg-base-200 shadow-md hover:bg-base-300"
                >
                  <FaChalkboardUser /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-red-100 text-red-500 transition"
                >
                  <RiUserReceived2Fill /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth/login"
                onClick={() => setMenuOpen(false)}
                className="mt-6 flex items-center justify-center gap-2 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                <RiUserSharedFill /> Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
