"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("admin-theme");
    if (savedTheme === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("admin-theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("admin-theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-stone-800 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:border-stone-800 dark:hover:bg-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}
