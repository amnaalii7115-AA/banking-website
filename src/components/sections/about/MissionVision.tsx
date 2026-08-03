import Image from "next/image";
import styles from "./MissionVision.module.css";

const sections = [
  {
    title: "Mission",
    description:
      "At YourBank, our mission is to empower our customers to achieve financial success. We are dedicated to delivering innovative banking solutions that cater to their unique needs. Through personalized services, expert guidance, and cutting-edge technology, we aim to build strong, lasting relationships with our customers. Our mission is to be their trusted partner, helping them navigate their financial journey and realize their dreams.",
    image: "/images/mission.png",
    alt: "Coins with growing plant representing YourBank mission",
    reverse: false,
  },
  {
    title: "Vision",
    description:
      "Our vision at YourBank is to redefine banking by creating a seamless and personalized experience for our customers. We envision a future where banking is accessible, transparent, and tailored to individual preferences. Through continuous innovation and collaboration, we strive to be at the forefront of the industry, setting new standards for customer-centric banking. Our vision is to be the preferred financial institution, known for our unwavering commitment to excellence, trust, and customer satisfaction.",
    image: "/images/vision.png",
    alt: "Digital eye representing YourBank vision",
    reverse: true,
  },
];

export default function MissionVision() {
  return (
    <section className={styles.section} id="mission-vision">
      <header className={styles.sectionHeader}>
        <h2>Mission &amp; Vision</h2>

        <p>
          We envision being a leading force in the industry, driven by
          innovation, integrity, and inclusivity, creating a brighter financial
          future for individuals and businesses while maintaining a strong
          commitment to customer satisfaction and community development.
        </p>
      </header>

      <div className={styles.content}>
        {sections.map((item) => (
          <article
            key={item.title}
            className={`${styles.row} ${
              item.reverse ? styles.reverseRow : ""
            }`}
          >
            <div className={styles.imageContainer}>
              <div className={styles.pattern} aria-hidden="true" />

              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 425px"
                  className={styles.image}
                />
              </div>
            </div>

            <div className={styles.textContainer}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}