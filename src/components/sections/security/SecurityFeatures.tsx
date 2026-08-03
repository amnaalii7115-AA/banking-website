import styles from "./SecurityFeatures.module.css";

type SecurityIcon =
  | "shield"
  | "encryption"
  | "authentication"
  | "monitoring";

type SecurityFeature = {
  title: string;
  description: string;
  icon: SecurityIcon;
};

const securityFeatures: SecurityFeature[] = [
  {
    title: "Secure Online Banking Platform",
    description:
      "Our online banking platform is built with multiple layers of security to safeguard your information. We use industry-standard encryption protocols to keep your personal and financial data confidential and protected.",
    icon: "shield",
  },
  {
    title: "Advanced Data Encryption",
    description:
      "Your sensitive information is protected using advanced encryption technology. All data transferred between your device and our banking systems is securely encrypted, helping prevent unauthorized access and keeping your information private.",
    icon: "encryption",
  },
  {
    title: "Multi-Factor Authentication",
    description:
      "We add an extra layer of protection through multi-factor authentication. In addition to your password, you may be asked to provide a secure verification code before accessing your account.",
    icon: "authentication",
  },
  {
    title: "Fraud Monitoring",
    description:
      "Our intelligent fraud monitoring systems continuously review account activity for unusual behaviour. If suspicious activity is detected, our security team can respond quickly to help protect your account and financial information.",
    icon: "monitoring",
  },
];

function FeatureIcon({ type }: { type: SecurityIcon }) {
  if (type === "shield") {
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M14 2.8 23 6.4v6.7c0 5.7-3.6 10.4-9 12.2-5.4-1.8-9-6.5-9-12.2V6.4L14 2.8Z" />
        <path d="m9.8 14 2.7 2.7 5.8-6" />
      </svg>
    );
  }

  if (type === "encryption") {
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <rect x="5" y="11.5" width="18" height="13" rx="3" />
        <path d="M9 11.5V8a5 5 0 0 1 10 0v3.5" />
        <circle cx="14" cy="17.5" r="1.5" />
        <path d="M14 19v2.3" />
      </svg>
    );
  }

  if (type === "authentication") {
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <rect x="4" y="4" width="20" height="20" rx="4" />
        <circle cx="14" cy="11" r="3" />
        <path d="M8.5 21c.8-3.2 2.6-5 5.5-5s4.7 1.8 5.5 5" />
        <path d="m19.5 7.5 1.4 1.4 2.4-2.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="M3.5 14s3.8-6 10.5-6 10.5 6 10.5 6-3.8 6-10.5 6-10.5-6-10.5-6Z" />
      <circle cx="14" cy="14" r="3.5" />
      <path d="M14 2.5v2.8M4.5 5.5l2 2M23.5 5.5l-2 2" />
    </svg>
  );
}

function SecurityCard({ item }: { item: SecurityFeature }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconOuter}>
          <div className={styles.iconInner}>
            <FeatureIcon type={item.icon} />
          </div>
        </div>

        <h3>{item.title}</h3>
      </div>

      <p>{item.description}</p>
    </article>
  );
}

export default function SecurityFeatures() {
  return (
    <section className={styles.section} id="security-features">
      <div className={styles.header}>
        <h2>
          How We <span>Protect You</span>
        </h2>

        <p>
          At YourBank, we prioritize the security and confidentiality of
          your financial information. Our advanced security technology
          and strict protection measures ensure that your accounts,
          assets, and transactions remain safeguarded at all times.
        </p>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.backgroundDesign} aria-hidden="true" />

        <div className={styles.grid}>
          {securityFeatures.map((item) => (
            <SecurityCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}