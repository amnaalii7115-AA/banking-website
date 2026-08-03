"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "How do I open an account with YourBank?",
    answer:
      "Opening an account with YourBank is easy. Simply visit our website and click on the “Open an Account” button. Follow the prompts, provide the required information, and complete the application process. If you have any questions or need assistance, our customer support team is available to help.",
  },
  {
    question: "What documents do I need to provide to apply for a loan?",
    answer:
      "The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification documents, proof of income, and information about the collateral, if applicable. Our loan officers will guide you through the specific requirements.",
  },
  {
    question: "How can I access my accounts online?",
    answer:
      "Accessing your accounts online is simple and secure. Visit our website and click on the “Login” button. Enter your username and password to access your accounts. If you have not registered for online banking, follow the registration process to create your online account.",
  },
  {
    question: "Are my transactions and personal information secure?",
    answer:
      "At YourBank, we prioritize the security of your transactions and personal information. We employ industry-leading encryption and multi-factor authentication to ensure that your data is protected. We also regularly update our security measures to stay ahead of emerging threats.",
  },
  {
    question: "How do I reset my online banking password?",
    answer:
      "Select the “Forgot Password” option on the login page and follow the verification steps. After confirming your identity, you will be able to create a new secure password for your online banking account.",
  },
  {
    question: "How can I contact YourBank customer support?",
    answer:
      "You can contact our customer support team through phone, email, secure online messaging, or live chat. Our representatives are available to help with account questions, transactions, security concerns, and other banking services.",
  },
];

export default function FAQ() {
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? faqItems : faqItems.slice(0, 4);

  return (
    <section className={styles.faqSection} id="faq">
      <header className={styles.sectionHeader}>
        <h2>
          <span>Frequently</span> Asked Questions
        </h2>

        <p>
          Still you have any questions? Contact our Team via
          support@yourbank.com
        </p>
      </header>

      <div className={styles.faqContent}>
        <div
          className={`${styles.itemsContainer} ${
            showAll ? styles.expanded : styles.collapsed
          }`}
        >
          {visibleItems.map((item) => (
            <article className={styles.faqItem} key={item.question}>
              <h3>{item.question}</h3>

              <div className={styles.divider} />

              <p>{item.answer}</p>
            </article>
          ))}

          {!showAll && (
            <div className={styles.fadeOverlay} aria-hidden="true" />
          )}
        </div>

        <button
          type="button"
          className={styles.loadButton}
          onClick={() => setShowAll((currentValue) => !currentValue)}
          aria-expanded={showAll}
        >
          <span>{showAll ? "Show Less" : "Load All FAQ’s"}</span>

          <svg
            viewBox="0 0 18 18"
            aria-hidden="true"
            className={showAll ? styles.arrowUp : ""}
          >
            <path d="m4 7 5 5 5-5" />
          </svg>
        </button>
      </div>
    </section>
  );
}