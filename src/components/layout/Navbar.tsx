"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

import styles from "./Navbar.module.css";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Security", href: "/security" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((previousState) => !previousState);
  };

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isLoginPage = pathname === "/login";
  const isSignUpPage = pathname === "/signup";

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <Container>
      <div className={styles.navbarArea}>
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
            id="main-navigation"
            className={`${styles.navigation} ${
              isMenuOpen ? styles.navigationOpen : ""
            }`}
            aria-label="Main navigation"
          >
            <div className={styles.mobileMenuHeader}>
              <span>Menu</span>

              <button
                type="button"
                className={styles.drawerCloseButton}
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <span />
                <span />
              </button>
            </div>

            <div className={styles.navigationLinks}>
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
            </div>

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
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </header>

        <button
          type="button"
          className={`${styles.menuBackdrop} ${
            isMenuOpen ? styles.menuBackdropVisible : ""
          }`}
          onClick={closeMenu}
          aria-label="Close navigation menu"
          tabIndex={isMenuOpen ? 0 : -1}
        />
      </div>
    </Container>
  );
}