"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      document.documentElement.setAttribute(
        "data-theme",
        savedTheme
      );
    }
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    document.documentElement.setAttribute(
      "data-theme",
      newTheme
    );

    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${
        theme === "dark" ? "light" : "dark"
      } theme`}
      title={`Switch to ${
        theme === "dark" ? "light" : "dark"
      } theme`}
    >
      <span className={styles.icon}>
        {theme === "dark" ? "☀" : "☾"}
      </span>
    </button>
  );
}