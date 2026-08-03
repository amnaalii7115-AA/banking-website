"use client";

import styles from "./Benefits.module.css";

type Benefit = {
  title: string;
  description: string;
  icon: "compensation" | "wellness" | "retirement" | "balance";
};

const benefits: Benefit[] = [
  {
    title: "Competitive Compensation",
    description:
      "We provide a competitive salary package that recognizes the skills and experience of our employees. Your contribution is valued and rewarded through performance-based incentives and growth opportunities.",
    icon: "compensation",
  },
  {
    title: "Health and Wellness",
    description:
      "We prioritize the health and well-being of our employees by providing comprehensive medical support, wellness programs, and resources that encourage a healthy and balanced lifestyle.",
    icon: "wellness",
  },
  {
    title: "Retirement Planning",
    description:
      "YourBank is committed to helping employees plan for their future. We offer retirement savings options and financial guidance designed to support long-term financial security.",
    icon: "retirement",
  },
  {
    title: "Work-Life Balance",
    description:
      "We understand the importance of maintaining a healthy balance between work and personal life. Our supportive environment and flexible policies help employees manage both successfully.",
    icon: "balance",
  },
];

function BenefitIcon({ type }: { type: Benefit["icon"] }) {
  if (type === "compensation") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h16v11H4z" />
        <path d="M8 7V5h8v2M8 12h8M12 10v4" />
      </svg>
    );
  }

  if (type === "wellness") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />
        <path d="M8 13h2l1-3 2 6 1-3h2" />
      </svg>
    );
  }

  if (type === "retirement") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 8h16v11H4zM7 8V5h10v3" />
        <path d="M9 13h6M12 10v6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="M8 3v6M16 3v6M4 10h16" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

export default function Benefits() {
  const handleBenefitClick = (title: string) => {
    window.alert(`${title} information selected`);
  };

  return (
    <section className={styles.section} id="benefits">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>
            Our <span>Benefits</span>
          </h2>

          <p>
            At YourBank, we value our employees and are dedicated to their
            well-being and success. We offer a comprehensive range of
            benefits designed to support both personal and professional
            growth.
          </p>
        </header>

        <div className={styles.grid}>
          {benefits.map((benefit) => (
            <article
              className={styles.card}
              key={benefit.title}
              role="button"
              tabIndex={0}
              onClick={() => handleBenefitClick(benefit.title)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleBenefitClick(benefit.title);
                }
              }}
            >
              <div className={styles.cardHeading}>
                <div className={styles.iconOuter}>
                  <div className={styles.iconInner}>
                    <BenefitIcon type={benefit.icon} />
                  </div>
                </div>

                <h3>{benefit.title}</h3>
              </div>

              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}