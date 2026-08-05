"use client";

import Image from "next/image";

import {
  motion,
  useReducedMotion,
} from "motion/react";

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
  const shouldReduceMotion = useReducedMotion();

  const [exchangeSubmitted, setExchangeSubmitted] =
    useState(false);

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

        <motion.div
          className={styles.heroContent}
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -50,
                }
          }
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  x: 0,
                }
          }
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className={styles.badge}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: -15,
                  }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.6,
              delay: 0.25,
              ease: "easeOut",
            }}
          >
            <span className={styles.checkIcon}>
              ✓
            </span>

            <span>
              No LLC Required, No Credit Check.
            </span>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span>Welcome to YourBank</span>

            <span>
              Empowering Your{" "}
              <strong className={styles.highlight}>
                Financial
              </strong>
            </span>

            <strong className={styles.highlight}>
              Journey
            </strong>
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            At YourBank, our mission is to provide
            comprehensive banking solutions that empower
            individuals and businesses to achieve their
            financial goals. We are committed to delivering
            personalized and innovative services that
            prioritize our customers&apos; needs.
          </motion.p>

          <motion.button
            type="button"
            className={styles.openAccountButton}
            onClick={handleOpenAccount}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -3,
                    scale: 1.04,
                  }
            }
            whileTap={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 0.96,
                  }
            }
            transition={{
              duration: 0.3,
              delay: 0.42,
            }}
          >
            Open Account
          </motion.button>
        </motion.div>

        {/* Right side */}

        <motion.div
          className={styles.bankingArea}
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 50,
                  scale: 0.96,
                }
          }
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }
          }
          transition={{
            duration: 0.9,
            delay: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src="/images/hero-arrows.svg"
            alt=""
            width={300}
            height={275}
            className={styles.arrows}
            aria-hidden="true"
            priority
          />

          <motion.div
            className={styles.income}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -8, 0],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className={styles.incomeIcon}>
              ＋
            </span>

            <div className={styles.incomeText}>
              <strong>+$5000.00</strong>

              <span>Monthly Income</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.bankingCard}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -5,
                    scale: 1.01,
                  }
            }
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <div className={styles.cardTexture} />

            <div className={styles.cardContent}>
              <section
                className={styles.transactionsSection}
              >
                <h2 className={styles.cardHeading}>
                  Your Transactions
                </h2>

                <div className={styles.transactions}>
                  {transactions.map(
                    (transaction, index) => (
                      <motion.article
                        key={transaction.name}
                        className={`${
                          styles.transaction
                        } ${
                          index === 1
                            ? styles.transactionSecond
                            : index === 2
                              ? styles.transactionThird
                              : ""
                        }`}
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: 25,
                              }
                        }
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : {
                                opacity: 1,
                                x: 0,
                              }
                        }
                        transition={{
                          duration: 0.5,
                          delay: 0.55 + index * 0.12,
                          ease: "easeOut",
                        }}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                x: 4,
                              }
                        }
                      >
                        <span
                          className={
                            styles.transactionIcon
                          }
                        >
                          ⇄
                        </span>

                        <div
                          className={
                            styles.transactionText
                          }
                        >
                          <span>Transaction</span>

                          <strong>
                            {transaction.name}
                          </strong>
                        </div>

                        <strong
                          className={
                            styles.transactionAmount
                          }
                        >
                          {transaction.amount}
                        </strong>
                      </motion.article>
                    ),
                  )}
                </div>
              </section>

              <section
                className={styles.exchangeSection}
              >
                <h2 className={styles.cardHeading}>
                  Money Exchange
                </h2>

                <div className={styles.exchangeGrid}>
                  <div className={styles.currency}>
                    <div
                      className={
                        styles.currencyInformation
                      }
                    >
                      <div
                        className={
                          styles.currencyHeading
                        }
                      >
                        <span
                          className={`${styles.flag} ${styles.indiaFlag}`}
                          aria-label="India"
                        />

                        <strong>INR</strong>
                      </div>

                      <span className={styles.country}>
                        Indian Rupees
                      </span>
                    </div>

                    <strong
                      className={styles.currencyAmount}
                    >
                      5,000
                    </strong>
                  </div>

                  <div className={styles.currency}>
                    <div
                      className={
                        styles.currencyInformation
                      }
                    >
                      <div
                        className={
                          styles.currencyHeading
                        }
                      >
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

                    <strong
                      className={styles.currencyAmount}
                    >
                      12.00
                    </strong>
                  </div>
                </div>

                <motion.button
                  type="button"
                  className={styles.exchangeButton}
                  onClick={handleExchange}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.02,
                        }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 0.97,
                        }
                  }
                >
                  {exchangeSubmitted
                    ? "✓ Exchange request submitted"
                    : "Exchange"}
                </motion.button>
              </section>
            </div>
          </motion.div>

          <motion.div
            className={styles.supportedCurrencies}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.6,
              delay: 0.85,
            }}
          >
            <span className={styles.supportedLabel}>
              Supported Currency
            </span>

            <div className={styles.currencyIcons}>
              <span>$</span>
              <span>€</span>
              <span>₿</span>
              <span>♦</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}