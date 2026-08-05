"use client";

import { useState } from "react";
import styles from "./Features.module.css";

type FeatureCategory =
  | "Online Banking"
  | "Financial Tools"
  | "Customer Support";

type Feature = {
  title: string;
  description: string;
};

const features: Record<FeatureCategory, Feature[]> = {
  "Online Banking": [
    {
      title: "24/7 Account Access",
      description:
        "Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform. Check balances, transfer funds, and pay bills with ease.",
    },
    {
      title: "Mobile Banking App",
      description:
        "Stay connected to your finances on the go with our user-friendly mobile banking app. Easily manage your accounts, deposit checks, and make payments from your smartphone or tablet.",
    },
    {
      title: "Secure Transactions",
      description:
        "Rest assured knowing that your transactions are protected by industry-leading security measures. We employ encryption and multi-factor authentication to safeguard your financial information.",
    },
    {
      title: "Bill Pay and Transfers",
      description:
        "Save time and avoid late fees with our convenient bill pay service. Set up recurring payments or make one-time transfers between your accounts with just a few clicks.",
    },
  ],

  "Financial Tools": [
    {
      title: "Budget Management",
      description:
        "Create personalized budgets, track your spending, and understand where your money goes with our simple financial management tools.",
    },
    {
      title: "Savings Goals",
      description:
        "Set clear savings goals and monitor your progress while receiving useful insights designed to help you stay on track.",
    },
    {
      title: "Financial Calculators",
      description:
        "Use our financial calculators to estimate loan payments, savings growth, mortgage costs, and other important financial decisions.",
    },
    {
      title: "Spending Insights",
      description:
        "View useful spending insights and account summaries that make it easier to understand and manage your finances.",
    },
  ],

  "Customer Support": [
    {
      title: "24/7 Customer Support",
      description:
        "Receive help whenever you need it through our dedicated customer support team, available to assist with your banking questions.",
    },
    {
      title: "Live Chat Assistance",
      description:
        "Connect with a banking specialist through live chat and receive quick assistance without needing to visit a branch.",
    },
    {
      title: "Help Center",
      description:
        "Explore answers to common banking questions and find helpful information through our easy-to-use online help center.",
    },
    {
      title: "Secure Messaging",
      description:
        "Contact our support team securely from your account and keep your important banking conversations protected.",
    },
  ],
};

const categories = Object.keys(features) as FeatureCategory[];

export default function Features() {
  const [activeCategory, setActiveCategory] =
    useState<FeatureCategory>("Online Banking");

  const handleFeatureClick = (title: string) => {
    window.alert(`${title} selected`);
  };

  return (
    <section className={styles.features} id="features">
      <header className={styles.sectionHeader}>
        <h2>
          Our <span>Features</span>
        </h2>

        <p>
          Experience a host of powerful features at YourBank, including
          seamless online banking, secure transactions, and personalized
          financial insights, all designed to enhance your banking experience
        </p>
      </header>

      <div className={styles.featuresLayout}>
        <aside
          className={styles.categoryPanel}
          aria-label="Feature categories"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                type="button"
                key={category}
                className={`${styles.categoryButton} ${
                  isActive ? styles.activeCategory : ""
                }`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
              >
                {category}
              </button>
            );
          })}
        </aside>

        <div className={styles.featureGrid}>
          {features[activeCategory].map((feature) => (
            <article
              className={styles.featureCard}
              key={feature.title}
            >
              <div className={styles.cardHeader}>
                <h3>{feature.title}</h3>

                <button
                  type="button"
                  className={styles.arrowButton}
                  aria-label={`Open ${feature.title}`}
                  onClick={() => handleFeatureClick(feature.title)}
                >
                  ↗
                </button>
              </div>

              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}