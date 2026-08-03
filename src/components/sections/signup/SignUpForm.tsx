"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import styles from "./SignUpForm.module.css";

function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.7" />

      {visible && <path d="M4 4 20 20" />}
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#CAFF33"
        d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.7 4.7 0 0 1-2 3v2.6h3.3c1.9-1.8 2.9-4.4 2.9-7.5Z"
      />

      <path
        fill="#CAFF33"
        d="M12 22c2.7 0 5-.9 6.7-2.3l-3.3-2.6c-.9.6-2.1 1-3.4 1a5.9 5.9 0 0 1-5.6-4.1H3v2.7A10 10 0 0 0 12 22Z"
        opacity=".85"
      />

      <path
        fill="#CAFF33"
        d="M6.4 14a6 6 0 0 1 0-3.9V7.3H3a10 10 0 0 0 0 9.4L6.4 14Z"
        opacity=".7"
      />

      <path
        fill="#CAFF33"
        d="M12 5.9c1.5 0 2.9.5 4 1.6l3-3A10 10 0 0 0 3 7.3l3.4 2.8A5.9 5.9 0 0 1 12 5.9Z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#CAFF33"
        d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.7.3-1 1-1Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#CAFF33"
        d="M17.1 12.7c0-2.7 2.2-4 2.3-4.1a5 5 0 0 0-4-2.2c-1.7-.2-3.3 1-4.1 1-.9 0-2.2-1-3.6-1-1.8 0-3.5 1.1-4.5 2.7-1.9 3.3-.5 8.2 1.4 10.9.9 1.3 2 2.8 3.5 2.7 1.4-.1 1.9-.9 3.6-.9s2.2.9 3.7.9c1.5 0 2.5-1.4 3.4-2.7a12 12 0 0 0 1.6-3.3 4.8 4.8 0 0 1-3.3-4Z"
      />

      <path
        fill="#CAFF33"
        d="M14.3 4.6a4.8 4.8 0 0 0 1.1-3.4 4.7 4.7 0 0 0-3.1 1.6 4.5 4.5 0 0 0-1.2 3.3 4 4 0 0 0 3.2-1.5Z"
      />
    </svg>
  );
}

export default function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!message) return;

    const messageTimer = window.setTimeout(() => {
      setMessage("");
      setIsSuccess(false);
    }, 3000);

    return () => {
      window.clearTimeout(messageTimer);
    };
  }, [message]);

  const clearMessage = () => {
    setMessage("");
    setIsSuccess(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearMessage();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setMessage("Please complete all the fields.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    setIsSuccess(true);
    setMessage(
      `Welcome ${firstName.trim()}! Your account has been created successfully.`
    );

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  return (
    <section className={styles.section} id="signup">
      <div className={styles.signUpContainer}>
        <Image
          src="/images/login-pattern.png"
          alt=""
          width={256}
          height={243}
          className={styles.pattern}
          aria-hidden="true"
        />

        <div className={styles.textContainer}>
          <h1>Sign Up</h1>

          <p>
            Join our community today! Create an account to unlock exclusive
            features and personalized experiences.
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className={styles.fieldsContainer}>
            <label className={styles.inputField}>
              <span className={styles.visuallyHidden}>First name</span>

              <input
                type="text"
                name="signup-first-name"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                  clearMessage();
                }}
                placeholder="Enter First Name"
                autoComplete="off"
              />
            </label>

            <label className={styles.inputField}>
              <span className={styles.visuallyHidden}>Last name</span>

              <input
                type="text"
                name="signup-last-name"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                  clearMessage();
                }}
                placeholder="Enter Last Name"
                autoComplete="off"
              />
            </label>

            <label className={styles.inputField}>
              <span className={styles.visuallyHidden}>Email address</span>

              <input
                type="email"
                name="signup-email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearMessage();
                }}
                placeholder="Enter your Email"
                autoComplete="off"
                spellCheck={false}
              />
            </label>

            <label className={styles.inputField}>
              <span className={styles.visuallyHidden}>Password</span>

              <input
                type={showPassword ? "text" : "password"}
                name="signup-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  clearMessage();
                }}
                placeholder="Enter your Password"
                autoComplete="new-password"
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() =>
                  setShowPassword((currentValue) => !currentValue)
                }
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                <EyeIcon visible={showPassword} />
              </button>
            </label>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.signUpButton}>
              Sign Up
            </button>

            <Link href="/login" className={styles.loginButton}>
              Login
            </Link>

            <div className={styles.socialContainer}>
              <div className={styles.continueRow}>
                <span />
                <p>Or Continue with</p>
                <span />
              </div>

              <div className={styles.socialButtons}>
                <a
                  href="https://accounts.google.com/signin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialOuter}
                  aria-label="Continue with Google"
                >
                  <span className={styles.socialInner}>
                    <GoogleIcon />
                  </span>
                </a>

                <a
                  href="https://www.facebook.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialOuter}
                  aria-label="Continue with Facebook"
                >
                  <span className={styles.socialInner}>
                    <FacebookIcon />
                  </span>
                </a>

                <a
                  href="https://appleid.apple.com/sign-in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialOuter}
                  aria-label="Continue with Apple"
                >
                  <span className={styles.socialInner}>
                    <AppleIcon />
                  </span>
                </a>
              </div>
            </div>

            {message && (
              <p
                className={`${styles.message} ${
                  isSuccess
                    ? styles.successMessage
                    : styles.errorMessage
                }`}
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}