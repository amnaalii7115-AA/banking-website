"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

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
  const shouldReduceMotion = useReducedMotion();

  const [showResponse, setShowResponse] =
    useState(false);

  const handleExchange = () => {
    setShowResponse(true);

    window.setTimeout(() => {
      setShowResponse(false);
    }, 2500);
  };

  return (
    <motion.div
      className={styles.wrapper}
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
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Monthly income */}

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
        <motion.span
          className={styles.incomeIcon}
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: 90,
                  scale: 1.08,
                }
          }
          transition={{
            duration: 0.3,
          }}
        >
          ＋
        </motion.span>

        <div className={styles.incomeContent}>
          <strong>+$5000.00</strong>

          <span>Monthly Income</span>
        </div>
      </motion.div>

      {/* Main banking card */}

      <motion.div
        className={styles.card}
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
        <motion.h2
          className={styles.cardHeading}
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 15,
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
            duration: 0.5,
            delay: 0.45,
          }}
        >
          Your Transactions
        </motion.h2>

        <div className={styles.transactions}>
          {transactions.map((transaction, index) => (
            <motion.article
              key={transaction.name}
              className={`${styles.transaction} ${
                index === 1
                  ? styles.secondTransaction
                  : index === 2
                    ? styles.thirdTransaction
                    : ""
              }`}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 30,
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
                      x: 5,
                      scale: 1.01,
                    }
              }
            >
              <motion.span
                className={styles.transactionIcon}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rotate: 180,
                      }
                }
                transition={{
                  duration: 0.35,
                }}
              >
                ↔
              </motion.span>

              <div
                className={styles.transactionContent}
              >
                <span>Transaction</span>

                <strong>{transaction.name}</strong>
              </div>

              <strong
                className={styles.transactionAmount}
              >
                {transaction.amount}
              </strong>
            </motion.article>
          ))}
        </div>

        {/* Money exchange */}

        <motion.h2
          className={styles.exchangeHeading}
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 15,
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
            duration: 0.5,
            delay: 0.9,
          }}
        >
          Money Exchange
        </motion.h2>

        <motion.div
          className={styles.exchangeGrid}
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
            delay: 1,
            ease: "easeOut",
          }}
        >
          <motion.div
            className={styles.currencyCard}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -3,
                  }
            }
          >
            <div className={styles.currencyName}>
              <span
                className={`${styles.flag} ${styles.indiaFlag}`}
                aria-label="India"
              />

              <strong>INR</strong>
            </div>

            <span className={styles.countryName}>
              Indian Rupees
            </span>

            <strong className={styles.exchangeAmount}>
              5,000
            </strong>
          </motion.div>

          <motion.div
            className={styles.currencyCard}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -3,
                  }
            }
          >
            <div className={styles.currencyName}>
              <span
                className={`${styles.flag} ${styles.usaFlag}`}
                aria-label="United States"
              />

              <strong>USD</strong>
            </div>

            <span className={styles.countryName}>
              United States Dollar
            </span>

            <strong className={styles.exchangeAmount}>
              12.00
            </strong>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          className={styles.exchangeButton}
          onClick={handleExchange}
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  y: -2,
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
          transition={{
            duration: 0.2,
          }}
        >
          Exchange
        </motion.button>

        {showResponse && (
          <motion.p
            className={styles.response}
            role="status"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: -8,
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
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            ✓ Exchange request submitted
          </motion.p>
        )}
      </motion.div>

      {/* Supported currencies */}

      <motion.div
        className={styles.supported}
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
          delay: 1.1,
        }}
      >
        <span className={styles.supportedLabel}>
          Supported Currency
        </span>

        <div className={styles.currencyList}>
          {["$", "€", "₿", "♦"].map(
            (currency, index) => (
              <motion.span
                key={currency}
                className={styles.currencyIcon}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.15,
                      }
                }
                transition={{
                  duration: 0.2,
                  delay: index * 0.02,
                }}
              >
                {currency}
              </motion.span>
            ),
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}