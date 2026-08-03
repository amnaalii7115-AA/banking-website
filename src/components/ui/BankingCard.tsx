"use client";

import { useState } from "react";
import styles from "./BankingCard.module.css";

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

export default function BankingCard() {
  const [showResponse, setShowResponse] =
    useState(false);

  const handleExchange = () => {
    setShowResponse(true);

    window.setTimeout(() => {
      setShowResponse(false);
    }, 2500);
  };

  return (
    <div className={styles.wrapper}>
      {/* Monthly income */}

      <div className={styles.income}>
        <span className={styles.incomeIcon}>＋</span>

        <div className={styles.incomeContent}>
          <strong>+$5000.00</strong>
          <span>Monthly Income</span>
        </div>
      </div>

      {/* Main banking card */}

      <div className={styles.card}>
        <h2 className={styles.cardHeading}>
          Your Transactions
        </h2>

        <div className={styles.transactions}>
          {transactions.map((transaction, index) => (
            <article
              key={transaction.name}
              className={`${styles.transaction} ${
                index === 1
                  ? styles.secondTransaction
                  : index === 2
                    ? styles.thirdTransaction
                    : ""
              }`}
            >
              <span className={styles.transactionIcon}>
                ↔
              </span>

              <div className={styles.transactionContent}>
                <span>Transaction</span>

                <strong>
                  {transaction.name}
                </strong>
              </div>

              <strong
                className={styles.transactionAmount}
              >
                {transaction.amount}
              </strong>
            </article>
          ))}
        </div>

        {/* Money exchange */}

        <h2 className={styles.exchangeHeading}>
          Money Exchange
        </h2>

        <div className={styles.exchangeGrid}>
          <div className={styles.currencyCard}>
            <div className={styles.currencyName}>
              <span
                className={`${styles.flag} ${styles.indiaFlag}`}
                aria-label="India"
              ></span>

              <strong>INR</strong>
            </div>

            <span className={styles.countryName}>
              Indian Rupees
            </span>

            <strong className={styles.exchangeAmount}>
              5,000
            </strong>
          </div>

          <div className={styles.currencyCard}>
            <div className={styles.currencyName}>
              <span
                className={`${styles.flag} ${styles.usaFlag}`}
                aria-label="United States"
              ></span>

              <strong>USD</strong>
            </div>

            <span className={styles.countryName}>
              United States Dollar
            </span>

            <strong className={styles.exchangeAmount}>
              12.00
            </strong>
          </div>
        </div>

        <button
          type="button"
          className={styles.exchangeButton}
          onClick={handleExchange}
        >
          Exchange
        </button>

        {showResponse && (
          <p className={styles.response} role="status">
            ✓ Exchange request submitted
          </p>
        )}
      </div>

      {/* Supported currencies */}

      <div className={styles.supported}>
        <span className={styles.supportedLabel}>
          Supported Currency
        </span>

        <div className={styles.currencyList}>
          <span className={styles.currencyIcon}>$</span>
          <span className={styles.currencyIcon}>€</span>
          <span className={styles.currencyIcon}>₿</span>
          <span className={styles.currencyIcon}>♦</span>
        </div>
      </div>
    </div>
  );
}