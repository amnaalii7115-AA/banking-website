import styles from "./Values.module.css";

const values = [
  {
    title: "Integrity",
    description:
      "We conduct ourselves with utmost honesty, transparency, and ethical behavior. We believe in doing what is right for our customers, colleagues, and stakeholders, even when no one is watching.",
  },
  {
    title: "Customer Centricity",
    description:
      "Our customers are at the heart of everything we do. We are dedicated to understanding their needs, providing personalized solutions, and delivering exceptional service that exceeds expectations.",
  },
  {
    title: "Collaboration",
    description:
      "We foster a collaborative and inclusive work environment, where teamwork and diverse perspectives are valued. By working together, we achieve greater results and drive innovation in the financial industry.",
  },
  {
    title: "Innovation",
    description:
      "We embrace change and constantly seek innovative solutions to meet the evolving needs of our customers. We encourage our employees to think creatively, challenge conventions, and explore new ideas to drive the future of banking.",
  },
];

export default function Values() {
  return (
    <section className={styles.section} id="values">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>
            Our <span>Values</span>
          </h2>

          <p>
            At YourBank, our values form the foundation of our
            organization and guide our actions. We believe in upholding
            the highest standards of integrity, delivering exceptional
            service, and embracing innovation. These values define who
            we are and shape the way we work together.
          </p>
        </header>

        <div className={styles.valuesGrid}>
          {values.map((value) => (
            <article className={styles.valueCard} key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}