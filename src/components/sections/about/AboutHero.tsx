import Image from "next/image";

import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section
      className={styles.section}
      id="about"
    >
      <div className={styles.container}>
        <div
          className={styles.pattern}
          aria-hidden="true"
        />

        <div className={styles.textContainer}>
          <div className={styles.headingContainer}>
            <span className={styles.eyebrow}>
              Welcome to YourBank
            </span>

            <h1>
              Where Banking Meets{" "}
              <span>Excellence!</span>
            </h1>
          </div>

          <p>
            At YourBank, we believe that banking should be
            more than just transactions. It should be an
            experience that empowers individuals and
            businesses to thrive and reach their financial
            goals. As a trusted financial institution, we
            are committed to delivering exceptional banking
            services that go beyond expectations. With a
            focus on innovation, personalized solutions,
            and unwavering integrity, we strive to provide
            the best banking experience for our valued
            customers. Join us on this exciting journey and
            discover a new level of banking excellence.
          </p>
        </div>

        <div className={styles.imageContainer}>
          <Image
            src="/images/about-hero.png"
            alt="YourBank professional team"
            fill
            priority
            sizes="
              (max-width: 600px) 100vw,
              (max-width: 800px) 90vw,
              715px
            "
            className={styles.heroImage}
          />
        </div>
      </div>
    </section>
  );
}