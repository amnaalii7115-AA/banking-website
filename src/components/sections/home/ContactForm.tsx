"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./ContactForm.module.css";

type SubmitState =
  | "idle"
  | "submitting"
  | "success"
  | "error";

type LocationDetails = {
  permission: string;
  latitude: number | null;
  longitude: number | null;
};

const getLocation = (
  locationConsent: boolean,
): Promise<LocationDetails> => {
  if (!locationConsent) {
    return Promise.resolve({
      permission: "Not requested",
      latitude: null,
      longitude: null,
    });
  }

  if (!navigator.geolocation) {
    return Promise.resolve({
      permission: "Not supported",
      latitude: null,
      longitude: null,
    });
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          permission: "Granted",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        const errorMessages: Record<
          number,
          string
        > = {
          1: "Permission denied",
          2: "Location unavailable",
          3: "Location request timed out",
        };

        resolve({
          permission:
            errorMessages[error.code] ??
            "Location unavailable",
          latitude: null,
          longitude: null,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 7000,
        maximumAge: 300000,
      },
    );
  });
};

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [submitState, setSubmitState] =
    useState<SubmitState>("idle");

  const [responseMessage, setResponseMessage] =
    useState("");

  useEffect(() => {
    if (!responseMessage) {
      return;
    }

    const messageTimer = window.setTimeout(() => {
      setResponseMessage("");
      setSubmitState("idle");
    }, 4000);

    return () => {
      window.clearTimeout(messageTimer);
    };
  }, [responseMessage]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setSubmitState("submitting");
    setResponseMessage("");

    const formData = new FormData(
      event.currentTarget,
    );

    const locationConsent =
      formData.get("locationConsent") === "on";

    try {
      const location =
        await getLocation(locationConsent);

      const contactData = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
        botcheck: formData.get("botcheck"),

        privacyConsent:
          formData.get("privacyConsent") ===
          "on",

        location,
      };

      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(contactData),
      });

      const result = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Message could not be sent.",
        );
      }

      setSubmitState("success");

      setResponseMessage(
        "Your message has been sent successfully.",
      );

      formRef.current?.reset();
    } catch (error) {
      setSubmitState("error");

      setResponseMessage(
        error instanceof Error
          ? error.message
          : "Message could not be sent. Please try again.",
      );
    }
  };

  return (
    <section
      className={styles.section}
      id="contact"
    >
      <div className={styles.container}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>
            Contact YourBank
          </span>

          <h2>
            Let&apos;s start a{" "}
            <span>conversation</span>
          </h2>

          <p>
            Have a question about an account, service, or
            business solution? Send us a message and our
            team will get back to you.
          </p>

          <a href="mailto:hello@yourbank.com">
            hello@yourbank.com
          </a>
        </div>

        <form
          ref={formRef}
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <div className={styles.fieldRow}>
            <label>
              <span>Name</span>

              <input
                name="name"
                type="text"
                placeholder="Your name"
                minLength={2}
                maxLength={100}
                autoComplete="name"
                required
              />
            </label>

            <label>
              <span>Email</span>

              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                maxLength={254}
                autoComplete="email"
                required
              />
            </label>
          </div>

          <label>
            <span>Subject</span>

            <input
              name="subject"
              type="text"
              placeholder="How can we help?"
              minLength={3}
              maxLength={150}
              required
            />
          </label>

          <label>
            <span>Message</span>

            <textarea
              name="message"
              rows={5}
              placeholder="Write your message here..."
              minLength={10}
              maxLength={3000}
              required
            />
          </label>

          <div className={styles.consentArea}>
            <label className={styles.consentLabel}>
              <input
                type="checkbox"
                name="privacyConsent"
                required
              />

              <span>
                I agree that basic device and connection
                details may be included with my message for
                security and support purposes.
              </span>
            </label>

            <label className={styles.consentLabel}>
              <input
                type="checkbox"
                name="locationConsent"
              />

              <span>
                Share my precise location with this message
                (optional).
              </span>
            </label>
          </div>

          {/* Spam protection */}

          <label className={styles.honeypot}>
            <span>Leave this field empty</span>

            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

          <div className={styles.formFooter}>
            <button
              type="submit"
              disabled={submitState === "submitting"}
            >
              {submitState === "submitting"
                ? "Sending..."
                : "Send Message"}
            </button>

            {responseMessage && (
              <p
                className={
                  submitState === "success"
                    ? styles.success
                    : styles.error
                }
                role="status"
                aria-live="polite"
              >
                {responseMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}