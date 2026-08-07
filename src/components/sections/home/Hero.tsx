"use client";

import Image from "next/image";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

import styles from "./Hero.module.css";
import { useRouter } from "next/navigation";

type ExchangeRates = Record<string, number>;

type ExchangeRatesResponse = {
  base: string;
  rates: ExchangeRates;
  updatedAt: string;
  message?: string;
};

type KnownCurrencyInformation = {
  symbol: string;
  name: string;
  image: string | null;
  imageAlt: string;
};

const knownCurrencies: Record<
  string,
  KnownCurrencyInformation
> = {
  INR: {
    symbol: "₹",
    name: "Indian Rupees",
    image: null,
    imageAlt: "India flag",
  },
  USD: {
    symbol: "$",
    name: "United States Dollar",
    image: null,
    imageAlt: "United States flag",
  },
  EUR: {
    symbol: "€",
    name: "Euro",
    image: "/images/europe-flag.svg",
    imageAlt: "European Union flag",
  },
  BTC: {
    symbol: "₿",
    name: "Bitcoin",
    image: "/images/bitcoin.png",
    imageAlt: "Bitcoin",
  },
  ETH: {
    symbol: "♦",
    name: "Ethereum",
    image: "/images/ethereum.png",
    imageAlt: "Ethereum",
  },
  GBP: {
    symbol: "£",
    name: "British Pound",
    image: null,
    imageAlt: "British Pound",
  },
  PKR: {
    symbol: "₨",
    name: "Pakistani Rupee",
    image: null,
    imageAlt: "Pakistani Rupee",
  },
  AED: {
    symbol: "د.إ",
    name: "UAE Dirham",
    image: null,
    imageAlt: "UAE Dirham",
  },
  SAR: {
    symbol: "﷼",
    name: "Saudi Riyal",
    image: null,
    imageAlt: "Saudi Riyal",
  },
  CAD: {
    symbol: "C$",
    name: "Canadian Dollar",
    image: null,
    imageAlt: "Canadian Dollar",
  },
  AUD: {
    symbol: "A$",
    name: "Australian Dollar",
    image: null,
    imageAlt: "Australian Dollar",
  },
  JPY: {
    symbol: "¥",
    name: "Japanese Yen",
    image: null,
    imageAlt: "Japanese Yen",
  },
  CNY: {
    symbol: "¥",
    name: "Chinese Yuan",
    image: null,
    imageAlt: "Chinese Yuan",
  },
};

const commonTargetCurrencies = [
  "USD",
  "EUR",
  "BTC",
  "ETH",
];

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

function getCurrencyName(currencyCode: string) {
  const knownCurrency =
    knownCurrencies[currencyCode];

  if (knownCurrency) {
    return knownCurrency.name;
  }

  try {
    const displayNames = new Intl.DisplayNames(
      ["en"],
      {
        type: "currency",
      },
    );

    const generatedName =
      displayNames.of(currencyCode);

    if (
      generatedName &&
      generatedName !== currencyCode
    ) {
      return generatedName;
    }
  } catch {
    return currencyCode;
  }

  return currencyCode;
}
function getCurrencySymbol(currencyCode: string) {
  const currencySymbols: Record<string, string> = {
    INR: "₹",
    PKR: "Rs",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
    KRW: "₩",
    RUB: "₽",
    AED: "د",
    SAR: "﷼",
    BTC: "₿",
    ETH: "Ξ",
  };

  return (
    currencySymbols[currencyCode] ??
    currencyCode.slice(0, 2)
  );
}

function formatConvertedAmount(
  amount: number,
  currencyCode: string,
) {
  if (!Number.isFinite(amount)) {
    return "0.00";
  }

  const isCrypto =
    currencyCode === "BTC" ||
    currencyCode === "ETH" ||
    currencyCode.length > 3;

  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: isCrypto ? 8 : 4,
  });
}

function CurrencyBadge({
  currencyCode,
}: {
  currencyCode: string;
}) {
  return (
    <span
      className={styles.genericCurrencyBadge}
      aria-hidden="true"
    >
      {getCurrencySymbol(currencyCode)}
    </span>
  );
}
export default function Hero() {
  const router = useRouter();

  const shouldReduceMotion = useReducedMotion();

  const [sourceCurrency, setSourceCurrency] =
    useState("INR");

  const [targetCurrency, setTargetCurrency] =
    useState("USD");

  const [sourceSearch, setSourceSearch] =
    useState("INR");

  const [targetSearch, setTargetSearch] =
    useState("USD");

  const [sourceAmount, setSourceAmount] =
    useState("5000");

  const [exchangeRates, setExchangeRates] =
    useState<ExchangeRates | null>(null);

  const [isLoadingRates, setIsLoadingRates] =
    useState(true);

  const [rateError, setRateError] = useState("");

  const [selectionError, setSelectionError] =
    useState("");

  const [exchangeSubmitted, setExchangeSubmitted] =
    useState(false);

  const availableCurrencyCodes = useMemo(() => {
    if (!exchangeRates) {
      return Object.keys(knownCurrencies).sort();
    }

    return Object.keys(exchangeRates).sort(
      (firstCurrency, secondCurrency) =>
        firstCurrency.localeCompare(
          secondCurrency,
        ),
    );
  }, [exchangeRates]);

  const sourceRate =
    exchangeRates?.[sourceCurrency] ?? null;

  const targetRate =
    exchangeRates?.[targetCurrency] ?? null;

  const numericSourceAmount =
    Number.parseFloat(sourceAmount) || 0;

  const convertedAmount =
    sourceRate !== null && targetRate !== null
      ? numericSourceAmount *
        (targetRate / sourceRate)
      : null;

  useEffect(() => {
    const controller = new AbortController();

    const fetchExchangeRates = async () => {
      try {
        setIsLoadingRates(true);
        setRateError("");

        const response = await fetch(
          "/api/exchange-rates",
          {
            signal: controller.signal,
          },
        );

        const result =
          (await response.json()) as ExchangeRatesResponse;

        if (!response.ok) {
          throw new Error(
            result.message ??
              "Unable to fetch live exchange rates.",
          );
        }

        setExchangeRates(result.rates);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        setExchangeRates(null);

        setRateError(
          error instanceof Error
            ? error.message
            : "Live exchange rates are unavailable.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingRates(false);
        }
      }
    };

    fetchExchangeRates();

    return () => {
      controller.abort();
    };
  }, []);

  const selectSourceCurrency = (
    value: string,
  ) => {
    const currencyCode = value
      .trim()
      .toUpperCase();

    if (!currencyCode) {
      setSourceSearch(sourceCurrency);
      return;
    }

    if (!exchangeRates?.[currencyCode]) {
      setSelectionError(
        `${currencyCode} is not available.`,
      );

      setSourceSearch(sourceCurrency);
      return;
    }

    setSourceCurrency(currencyCode);
    setSourceSearch(currencyCode);
    setSelectionError("");
    setExchangeSubmitted(false);
  };

  const selectTargetCurrency = (
    value: string,
  ) => {
    const currencyCode = value
      .trim()
      .toUpperCase();

    if (!currencyCode) {
      setTargetSearch(targetCurrency);
      return;
    }

    if (!exchangeRates?.[currencyCode]) {
      setSelectionError(
        `${currencyCode} is not available.`,
      );

      setTargetSearch(targetCurrency);
      return;
    }

    setTargetCurrency(currencyCode);
    setTargetSearch(currencyCode);
    setSelectionError("");
    setExchangeSubmitted(false);
  };

 const handleOpenAccount = () => {
  router.push("/open-account");
};

  const handleExchange = () => {
    if (
      isLoadingRates ||
      rateError ||
      convertedAmount === null ||
      numericSourceAmount <= 0
    ) {
      return;
    }

    setExchangeSubmitted(true);

    window.setTimeout(() => {
      setExchangeSubmitted(false);
    }, 2500);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        {/* Left content */}

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
          >
            Open Account
          </motion.button>
        </motion.div>

        {/* Banking area */}

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
          >
            <div className={styles.cardTexture} />

            <div className={styles.cardContent}>
              {/* Transactions */}

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
                        }}
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

              {/* Currency converter */}

              <section
                className={styles.exchangeSection}
              >
                <h2 className={styles.cardHeading}>
                  Money Exchange
                </h2>

                <div className={styles.exchangeGrid}>
                  {/* Source */}

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
                        <CurrencyBadge
                          currencyCode={sourceCurrency}
                        />

                        <input
                          type="text"
                          list="currency-options"
                          value={sourceSearch}
                          onChange={(event) => {
                            const value =
                              event.target.value.toUpperCase();

                            setSourceSearch(value);

                            if (
                              exchangeRates?.[value]
                            ) {
                              selectSourceCurrency(
                                value,
                              );
                            }
                          }}
                          onKeyDown={(event) => {
                            if (
                              event.key === "Enter"
                            ) {
                              event.preventDefault();

                              selectSourceCurrency(
                                sourceSearch,
                              );
                            }
                          }}
                          onBlur={() =>
                            selectSourceCurrency(
                              sourceSearch,
                            )
                          }
                          className={
                            styles.currencySearchInput
                          }
                          placeholder="Currency"
                          aria-label="Search source currency"
                          autoComplete="off"
                        />
                      </div>

                      <span className={styles.country}>
                        {getCurrencyName(
                          sourceCurrency,
                        )}
                      </span>
                    </div>

                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={sourceAmount}
                      onChange={(event) => {
                        setSourceAmount(
                          event.target.value,
                        );

                        setExchangeSubmitted(false);
                      }}
                      className={
                        styles.currencyAmountInput
                      }
                      aria-label={`Amount in ${sourceCurrency}`}
                    />
                  </div>

                  {/* Target */}

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
                        <CurrencyBadge
                          currencyCode={targetCurrency}
                        />

                        <input
                          type="text"
                          list="currency-options"
                          value={targetSearch}
                          onChange={(event) => {
                            const value =
                              event.target.value.toUpperCase();

                            setTargetSearch(value);

                            if (
                              exchangeRates?.[value]
                            ) {
                              selectTargetCurrency(
                                value,
                              );
                            }
                          }}
                          onKeyDown={(event) => {
                            if (
                              event.key === "Enter"
                            ) {
                              event.preventDefault();

                              selectTargetCurrency(
                                targetSearch,
                              );
                            }
                          }}
                          onBlur={() =>
                            selectTargetCurrency(
                              targetSearch,
                            )
                          }
                          className={
                            styles.currencySearchInput
                          }
                          placeholder="Currency"
                          aria-label="Search target currency"
                          autoComplete="off"
                        />
                      </div>

                      <span className={styles.country}>
                        {getCurrencyName(
                          targetCurrency,
                        )}
                      </span>
                    </div>

                    <strong
                      className={styles.currencyAmount}
                    >
                      {isLoadingRates
                        ? "Loading..."
                        : rateError
                          ? "Unavailable"
                          : convertedAmount !== null
                            ? formatConvertedAmount(
                                convertedAmount,
                                targetCurrency,
                              )
                            : "0.00"}
                    </strong>
                  </div>
                </div>

                <datalist id="currency-options">
                  {availableCurrencyCodes.map(
                    (currencyCode) => (
                      <option
                        key={currencyCode}
                        value={currencyCode}
                      >
                        {getCurrencyName(
                          currencyCode,
                        )}
                      </option>
                    ),
                  )}
                </datalist>

                {selectionError && (
                  <span
                    className={
                      styles.currencySelectionError
                    }
                    role="status"
                  >
                    {selectionError}
                  </span>
                )}

                <motion.button
                  type="button"
                  className={styles.exchangeButton}
                  onClick={handleExchange}
                  disabled={
                    isLoadingRates ||
                    Boolean(rateError) ||
                    convertedAmount === null ||
                    numericSourceAmount <= 0
                  }
                >
                  {isLoadingRates
                    ? "Fetching live rates..."
                    : rateError
                      ? "Live rates unavailable"
                      : exchangeSubmitted
                        ? "✓ Exchange request submitted"
                        : `Exchange ${sourceCurrency} to ${targetCurrency}`}
                </motion.button>
              </section>
            </div>
          </motion.div>

          {/* Common target currencies */}

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
              Popular Currency
            </span>

            <div
              className={styles.currencyIcons}
              role="group"
              aria-label="Popular currencies"
            >
              {commonTargetCurrencies.map(
                (currencyCode) => (
                  <button
                    type="button"
                    key={currencyCode}
                    className={`${
                      styles.currencyButton
                    } ${
                      targetCurrency === currencyCode
                        ? styles.activeCurrencyButton
                        : ""
                    }`}
                    onClick={() => {
                      setTargetCurrency(
                        currencyCode,
                      );

                      setTargetSearch(
                        currencyCode,
                      );

                      setSelectionError("");
                      setExchangeSubmitted(false);
                    }}
                    aria-label={`Convert to ${getCurrencyName(
                      currencyCode,
                    )}`}
                    aria-pressed={
                      targetCurrency === currencyCode
                    }
                  >
                    {getCurrencySymbol(
                      currencyCode,
                    )}
                  </button>
                ),
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}