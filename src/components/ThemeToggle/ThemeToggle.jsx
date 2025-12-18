import { useLayoutEffect, useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full cursor-pointer flex items-center justify-center bg-base-200 shadow-md
                 hover:shadow-lg active:shadow-sm transition-all duration-500"
    >
      <span
        className={`inline-flex text-2xl transition-all duration-500
          ${
            theme === "dark"
              ? "rotate-180 text-yellow-400"
              : "rotate-0 text-gray-800"
          }`}
      >
        {theme === "light" ? <MdDarkMode /> : <BsSunFill />}
      </span>
    </button>
  );
}