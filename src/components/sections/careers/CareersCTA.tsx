"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./CareersCTA.module.css";
import { useRouter } from "next/navigation";

export default function CareersCTA() {
  const router = useRouter();
  const [showResponse, setShowResponse] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

const handleOpenAccount = () => {
  router.push("/open-account");
};

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.section} id="career-cta">
      <div className={styles.cta}>
        <Image
          src="/images/Abstract Design.svg"
          alt=""
          width={202}
          height={192}
          aria-hidden="true"
          className={styles.pattern}
        />

        <div className={styles.texture} aria-hidden="true" />

        <div className={styles.textContainer}>
          <h2>
            Start your Career with{" "}
            <span>YourBank today!</span>
          </h2>

          <p>
            Lorem ipsum dolor sit amet consectetur. Blandit odio
            semper risus pellentesque elit. Pellentesque eget ut
            imperdiet nulla penatibus. Nascetur viverra arcu sed amet
            cursus purus.
          </p>
        </div>

        <div className={styles.actionContainer}>
          <button
            type="button"
            className={styles.openButton}
            onClick={handleOpenAccount}
          >
            Open Account
          </button>

          {showResponse && (
            <p className={styles.response} role="status">
              ✓ Your account request has been submitted
            </p>
          )}
        </div>
      </div>
    </section>
  );
}