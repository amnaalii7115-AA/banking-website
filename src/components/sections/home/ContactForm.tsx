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

    const formData = new FormData(event.currentTarget);

    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      botcheck: formData.get("botcheck"),
    };

    try {
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
          result.message || "Message could not be sent.",
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

          {/* Hidden spam protection field */}

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