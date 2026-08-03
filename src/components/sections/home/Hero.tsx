"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Hero.module.css";

const transactions = [
  {
    name: "Joel Kenley",
    amount: "-$68.00",
  },
  {
    name: "Mark Smith",
    amount: "-$68.00",
  },
  {
    name: "Lenen Roy",
    amount: "-$68.00",
  },
];

export default function Hero() {
  const [exchangeSubmitted, setExchangeSubmitted] = useState(false);

  const handleOpenAccount = () => {
    window.alert("Open Account request received!");
  };

  const handleExchange = () => {
    setExchangeSubmitted(true);

    window.setTimeout(() => {
      setExchangeSubmitted(false);
    }, 2500);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        {/* Left side */}

        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.checkIcon}>✓</span>
            <span>No LLC Required, No Credit Check.</span>
          </div>

          <h1 className={styles.title}>
            <span>Welcome to YourBank</span>

            <span>
              Empowering Your{" "}
              <strong className={styles.highlight}>Financial</strong>
            </span>

            <strong className={styles.highlight}>Journey</strong>
          </h1>

          <p className={styles.description}>
            At YourBank, our mission is to provide comprehensive banking
            solutions that empower individuals and businesses to achieve their
            financial goals. We are committed to delivering personalized and
            innovative services that prioritize our customers&apos; needs.
          </p>

          <button
            type="button"
            className={styles.openAccountButton}
            onClick={handleOpenAccount}
          >
            Open Account
          </button>
        </div>

        {/* Right side */}

        <div className={styles.bankingArea}>
          <Image
            src="/images/hero-arrows.svg"
            alt=""
            width={300}
            height={275}
            className={styles.arrows}
            aria-hidden="true"
            priority
          />

          <div className={styles.income}>
            <span className={styles.incomeIcon}>＋</span>

            <div className={styles.incomeText}>
              <strong>+$5000.00</strong>
              <span>Monthly Income</span>
            </div>
          </div>

          <div className={styles.bankingCard}>
            <div className={styles.cardTexture} />

            <div className={styles.cardContent}>
              <section className={styles.transactionsSection}>
                <h2 className={styles.cardHeading}>Your Transactions</h2>

                <div className={styles.transactions}>
                  {transactions.map((transaction, index) => (
                    <article
                      key={transaction.name}
                      className={`${styles.transaction} ${
                        index === 1
                          ? styles.transactionSecond
                          : index === 2
                            ? styles.transactionThird
                            : ""
                      }`}
                    >
                      <span className={styles.transactionIcon}>⇄</span>

                      <div className={styles.transactionText}>
                        <span>Transaction</span>
                        <strong>{transaction.name}</strong>
                      </div>

                      <strong className={styles.transactionAmount}>
                        {transaction.amount}
                      </strong>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.exchangeSection}>
                <h2 className={styles.cardHeading}>Money Exchange</h2>

                <div className={styles.exchangeGrid}>
                  <div className={styles.currency}>
                    <div className={styles.currencyInformation}>
                      <div className={styles.currencyHeading}>
                        <span
                          className={`${styles.flag} ${styles.indiaFlag}`}
                          aria-label="India"
                        />
                        <strong>INR</strong>
                      </div>

                      <span className={styles.country}>Indian Rupees</span>
                    </div>

                    <strong className={styles.currencyAmount}>5,000</strong>
                  </div>

                  <div className={styles.currency}>
                    <div className={styles.currencyInformation}>
                      <div className={styles.currencyHeading}>
                        <span
                          className={`${styles.flag} ${styles.usaFlag}`}
                          aria-label="United States"
                        />
                        <strong>USD</strong>
                      </div>

                      <span className={styles.country}>
                        United States Dollar
                      </span>
                    </div>

                    <strong className={styles.currencyAmount}>12.00</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.exchangeButton}
                  onClick={handleExchange}
                >
                  {exchangeSubmitted
                    ? "✓ Exchange request submitted"
                    : "Exchange"}
                </button>
              </section>
            </div>
          </div>

          <div className={styles.supportedCurrencies}>
            <span className={styles.supportedLabel}>
              Supported Currency
            </span>

            <div className={styles.currencyIcons}>
              <span>$</span>
              <span>€</span>
              <span>₿</span>
              <span>♦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}