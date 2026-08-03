"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CTA.module.css";

export default function CTA() {
  const [showMessage, setShowMessage] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleOpenAccount = () => {
    setShowMessage(true);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setShowMessage(false);
      timeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.section} id="open-account">
      <div className={styles.cta}>
        <div className={styles.pattern} aria-hidden="true" />

        <div className={styles.textContainer}>
          <h2>
            Start your financial journey with{" "}
            <span>YourBank today!</span>
          </h2>

          <p>
            Lorem ipsum dolor sit amet consectetur. Blandit odio semper
            risus pellentesque elit. Pellentesque eget ut imperdiet
            nulla penatibus. Nascetur viverra arcu sed amet cursus
            purus.
          </p>
        </div>

        <div className={styles.buttonWrapper}>
          <button
            type="button"
            className={styles.openButton}
            onClick={handleOpenAccount}
          >
            Open Account
          </button>

          {showMessage && (
            <p
              className={styles.response}
              role="status"
              aria-live="polite"
            >
              ✓ Account request submitted
            </p>
          )}
        </div>
      </div>
    </section>
  );
}