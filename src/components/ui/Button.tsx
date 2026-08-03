"use client";

import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  size?: "small" | "medium";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "medium",
  type = "button",
  disabled = false,
  className = "",
  onClick,
}: ButtonProps) {
  const buttonClasses = `
    ${styles.button}
    ${styles[variant]}
    ${styles[size]}
    ${disabled ? styles.disabled : ""}
    ${className}
  `;

  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        onClick={onClick}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}