import Image from "next/image";
import styles from "./CareersHero.module.css";

export default function CareersHero() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Image
          src="/images/Abstract Design.svg"
          alt=""
          width={334}
          height={317}
          aria-hidden="true"
          className={styles.pattern}
        />

        <div className={styles.textContainer}>
          <h1>
            Welcome to <span>YourBank</span> Careers!
          </h1>

          <p>
            Join our team and embark on a rewarding journey in the
            banking industry. At YourBank, we are committed to fostering
            a culture of excellence and providing opportunities for
            professional growth. With a focus on innovation, customer
            service, and integrity, we strive to make a positive impact
            in the lives of our customers and communities. Join us today
            and be a part of our mission to shape the future of banking.
          </p>
        </div>

        <div className={styles.imageContainer}>
          <Image
            src="/images/careers-hero.png"
            alt="YourBank employees having a professional meeting"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 715px"
            className={styles.heroImage}
          />

          <div
            className={styles.imageOverlay}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}