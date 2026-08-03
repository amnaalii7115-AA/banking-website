import Image from "next/image";
import styles from "./SecurityHero.module.css";

export default function SecurityHero() {
  return (
    <section className={styles.section} id="security">
      <div className={styles.container}>
        <div className={styles.pattern} aria-hidden="true" />

       <div className={styles.imageContainer}>
  <Image
    src="/images/security-hero.png"
    alt="Secure online banking"
    fill
    priority
    sizes="(max-width: 900px) 100vw, 715px"
    className={styles.heroImage}
  />

  <div className={styles.imageOverlay} aria-hidden="true" />
</div>
        <div className={styles.textContainer}>
          <h1>
            Your Security is Our
            <span> Top Priority</span>
          </h1>

          <p>
            At YourBank, we understand the importance of keeping your
            financial information secure. We employ robust security
            measures and advanced technologies to protect your personal
            and financial data. Rest assured that when you bank with us,
            your security is our utmost priority.
          </p>
        </div>
      </div>
    </section>
  );
}