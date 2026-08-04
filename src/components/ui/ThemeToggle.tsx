"use client";

import { useEffect, useState } from "react";

import styles from "./ThemeToggle.module.css";

type Theme = "dark" | "light";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />

      <path d="M12 2V4" />
      <path d="M12 20V22" />
      <path d="M4.93 4.93L6.34 6.34" />
      <path d="M17.66 17.66L19.07 19.07" />
      <path d="M2 12H4" />
      <path d="M20 12H22" />
      <path d="M4.93 19.07L6.34 17.66" />
      <path d="M17.66 6.34L19.07 4.93" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5A8.5 8.5 0 1 0 20.5 15.5Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    let initialTheme: Theme = "dark";

    if (savedTheme === "dark" || savedTheme === "light") {
      initialTheme = savedTheme;
    } else if (
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      initialTheme = "light";
    }

    document.documentElement.setAttribute(
      "data-theme",
      initialTheme
    );

    setTheme(initialTheme);
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme =
      theme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute(
      "data-theme",
      newTheme
    );

    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === "light"}
    >
      <span
        className={`${styles.icon} ${
          isMounted ? styles.iconVisible : ""
        }`}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}