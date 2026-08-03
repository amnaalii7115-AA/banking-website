"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

import styles from "./Navbar.module.css";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Security", href: "/security" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((previousState) => !previousState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isLoginPage = pathname === "/login";
  const isSignUpPage = pathname === "/signup";

  return (
    <Container>
      <div
  className={`${styles.navbarArea} ${
    isMenuOpen ? styles.navbarAreaOpen : ""
  }`}
>
        <Image
          src="/images/nav-pattern.svg"
          alt=""
          width={497}
          height={353}
          className={styles.navPattern}
          aria-hidden="true"
          priority
        />

        <header className={styles.navbar}>
          <Logo href="/" />

          <nav
            className={`${styles.navigation} ${
              isMenuOpen ? styles.navigationOpen : ""
            }`}
            aria-label="Main navigation"
          >
            {navigationLinks.map((link) => {
              const isActive = isActiveRoute(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`${styles.navLink} ${
                    isActive ? styles.navLinkActive : ""
                  }`}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className={styles.mobileActions}>
              <Link
                href="/signup"
                className={`${styles.mobileSignUp} ${
                  isSignUpPage ? styles.accountLinkActive : ""
                }`}
                onClick={closeMenu}
                aria-current={isSignUpPage ? "page" : undefined}
              >
                Sign Up
              </Link>

              <Link
                href="/login"
                className={`${styles.mobileLogin} ${
                  isLoginPage ? styles.accountLinkActive : ""
                }`}
                onClick={closeMenu}
                aria-current={isLoginPage ? "page" : undefined}
              >
                Login
              </Link>
            </div>
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />

            <Link
              href="/signup"
              className={`${styles.signUp} ${
                isSignUpPage ? styles.accountLinkActive : ""
              }`}
              aria-current={isSignUpPage ? "page" : undefined}
            >
              Sign Up
            </Link>

            <Link
              href="/login"
              className={`${styles.loginLink} ${
                isLoginPage ? styles.accountLinkActive : ""
              }`}
              aria-current={isLoginPage ? "page" : undefined}
            >
              Login
            </Link>
          </div>

          <button
            type="button"
            className={`${styles.menuButton} ${
              isMenuOpen ? styles.menuButtonOpen : ""
            }`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </header>
      </div>
    </Container>
  );
}