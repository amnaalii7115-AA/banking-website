"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./UseCases.module.css";

type IconName =
  | "finance"
  | "saving"
  | "home"
  | "education"
  | "startup"
  | "cash"
  | "expansion"
  | "payment";

type CardItem = {
  title: string;
  icon: IconName;
};

type StatItem = {
  value: string;
  label: string;
};

const individualCards: CardItem[] = [
  {
    title: "Managing Personal Finances",
    icon: "finance",
  },
  {
    title: "Saving for the Future",
    icon: "saving",
  },
  {
    title: "Homeownership",
    icon: "home",
  },
  {
    title: "Education Funding",
    icon: "education",
  },
];

const businessCards: CardItem[] = [
  {
    title: "Startups and Entrepreneurs",
    icon: "startup",
  },
  {
    title: "Cash Flow Management",
    icon: "cash",
  },
  {
    title: "Business Expansion",
    icon: "expansion",
  },
  {
    title: "Payment Solutions",
    icon: "payment",
  },
];

const individualStats: StatItem[] = [
  {
    value: "78%",
    label: "Secure Retirement Planning",
  },
  {
    value: "63%",
    label: "Manageable Debt Consolidation",
  },
  {
    value: "91%",
    label: "Reducing financial burdens",
  },
];

const businessStats: StatItem[] = [
  {
    value: "65%",
    label: "Cash Flow Management",
  },
  {
    value: "70%",
    label: "Drive Business Expansion",
  },
  {
    value: "45%",
    label: "Streamline payroll processing",
  },
];

function UseCaseIcon({ name }: { name: IconName }) {
  if (name === "finance") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="3" />
        <path d="M12 2v3M12 11v3M9 8h6" />
        <path d="M5 14c1.8 3.8 4.1 5.8 7 6.5 2.9-.7 5.2-2.7 7-6.5" />
        <path d="m6.5 12-2.5 3 3.5.5M17.5 12l2.5 3-3.5.5" />
      </svg>
    );
  }

  if (name === "saving") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 17c2-5.5 4.7-8 8-8s6 2.5 8 8" />
        <path d="M7 17c1.4-3.5 3-5 5-5s3.6 1.5 5 5" />
        <path d="M12 9V5M9.5 7.5 12 4l2.5 3.5" />
      </svg>
    );
  }

  if (name === "home") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3 10 9-7 9 7" />
        <path d="M5 10h14v10H5z" />
        <path d="M8 12v6M12 12v6M16 12v6M3 20h18" />
      </svg>
    );
  }

  if (name === "education") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5c3 0 5 1 8 3v12c-3-2-5-3-8-3V5Z" />
        <path d="M20 5c-3 0-5 1-8 3v12c3-2 5-3 8-3V5Z" />
      </svg>
    );
  }

  if (name === "startup") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 21V5h10v16M15 10h4v11" />
        <path d="M8 8h2M12 8h1M8 12h2M12 12h1M8 16h2M12 16h1" />
        <path d="M3 21h18" />
      </svg>
    );
  }

  if (name === "cash") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="13" rx="2" />
        <circle cx="12" cy="11.5" r="2.5" />
        <path d="M6 8h1M17 15h1M6 20h12" />
      </svg>
    );
  }

  if (name === "expansion") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 5v12h12" />
        <path d="m8 14 3-3 2 2 5-6" />
        <path d="M14 7h4v4M3 20h16" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v10" />
      <path d="M14.5 9.5c0-1-1-1.8-2.5-1.8s-2.5.8-2.5 1.8 1 1.7 2.5 1.7 2.5.8 2.5 1.8-1 1.8-2.5 1.8-2.5-.8-2.5-1.8" />
    </svg>
  );
}

function UseCaseCard({ item }: { item: CardItem }) {
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setMessage(`${item.title} selected`);

    window.setTimeout(() => {
      setMessage("");
    }, 1500);
  };

  return (
    <button
      type="button"
      className={styles.useCaseCard}
      onClick={handleClick}
      aria-label={`View ${item.title}`}
    >
      <span className={styles.iconOuter}>
        <span className={styles.iconInner}>
          <UseCaseIcon name={item.icon} />
        </span>
      </span>

      <span className={styles.cardTitle}>{item.title}</span>

      {message && (
        <span className={styles.cardResponse} role="status">
          {message}
        </span>
      )}
    </button>
  );
}

function CardsPanel({
  cards,
  patternSide,
}: {
  cards: CardItem[];
  patternSide: "left" | "right";
}) {
  return (
    <div className={styles.cardsPanel}>
      <Image
        src="/images/Abstract Design.svg"
        alt=""
        width={224}
        height={213}
        aria-hidden="true"
        className={`${styles.pattern} ${
          patternSide === "left"
            ? styles.patternLeft
            : styles.patternRight
        }`}
      />

      <div className={styles.cardsGrid}>
        {cards.map((item) => (
          <UseCaseCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

function DetailsPanel({
  title,
  description,
  stats,
}: {
  title: string;
  description: string;
  stats: StatItem[];
}) {
  const [showResponse, setShowResponse] = useState(false);

  const handleLearnMore = () => {
    setShowResponse(true);

    window.setTimeout(() => {
      setShowResponse(false);
    }, 2500);
  };

  return (
    <div className={styles.detailsPanel}>
      <div className={styles.detailsText}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className={styles.statistics}>
        {stats.map((stat) => (
          <div className={styles.statistic} key={stat.value}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.buttonArea}>
        <button
          type="button"
          className={styles.learnMore}
          onClick={handleLearnMore}
        >
          Learn More
        </button>

        {showResponse && (
          <span className={styles.learnResponse} role="status">
            More information will be available soon.
          </span>
        )}
      </div>
    </div>
  );
}

export default function UseCases() {
  return (
    <section className={styles.useCases} id="use-cases">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2>Use Cases</h2>

          <p>
            At YourBank, we cater to the diverse needs of individuals
            and businesses alike, offering a wide range of financial
            solutions.
          </p>
        </header>

        <div className={styles.content}>
          <div className={styles.row}>
            <CardsPanel
              cards={individualCards}
              patternSide="left"
            />

            <DetailsPanel
              title="For Individuals"
              description="For individuals, our mortgage services pave the way to homeownership, and our flexible personal loans provide vital support during various life milestones. We also prioritize retirement planning, ensuring a financially secure future for our customers."
              stats={individualStats}
            />
          </div>

          <div className={`${styles.row} ${styles.businessRow}`}>
            <DetailsPanel
              title="For Business"
              description="For businesses, we empower growth with working capital solutions that optimize cash flow, and our tailored financing options fuel business expansion. Whatever your financial aspirations, YourBank is committed to providing the right tools and support to achieve them."
              stats={businessStats}
            />

            <CardsPanel
              cards={businessCards}
              patternSide="right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}