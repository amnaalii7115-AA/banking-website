"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./PressReleases.module.css";

type PressRelease = {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
  description: string;
};

const pressReleases: PressRelease[] = [
  {
    id: 1,
    image: "/images/press-release-1.png",
    title:
      "YourBank Launches New Rewards Program to Enhance Customer Loyalty and Satisfaction",
    location: "India",
    date: "06/11/2024",
    description:
      "YourBank is pleased to announce the introduction of our new Rewards Program, aimed at rewarding our loyal customers and enhancing their banking experience. The program offers exclusive benefits, discounts, and personalized offers tailored to individual customer preferences. With this initiative, YourBank reaffirms its commitment to delivering exceptional value and building lasting relationships with our valued customers.",
  },
  {
    id: 2,
    image: "/images/press-release-2.png",
    title:
      "YourBank Expands Branch Network with Opening of New Location in Chennai",
    location: "India",
    date: "12/11/2024",
    description:
      "YourBank is excited to announce the grand opening of our newest branch in Chennai. This expansion is a testament to our continued commitment to serving our customers and providing them with convenient access to our comprehensive range of banking services. The new branch will feature state-of-the-art facilities, a team of dedicated professionals, and a personalized approach to banking.",
  },
  {
    id: 3,
    image: "/images/press-release-3.png",
    title:
      "YourBank Partners with Local Nonprofit to Support Financial Education Initiatives",
    location: "India",
    date: "24/12/2024",
    description:
      "YourBank is excited to unveil our partnership with a local nonprofit organization to support financial education initiatives. The program will provide individuals and communities with practical financial knowledge, useful resources, and guidance to help them make confident financial decisions and build a more secure future.",
  },
  {
    id: 4,
    image: "/images/press-release-4.png",
    title:
      "YourBank Launches Sustainable Banking Initiative to Promote Environmental Responsibility",
    location: "India",
    date: "28/12/2024",
    description:
      "YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions. By incorporating sustainable practices into our operations, we aim to contribute to a greener future.",
  },
];

type PressReleaseCardProps = {
  item: PressRelease;
  isSelected: boolean;
  onSelect: (item: PressRelease) => void;
};

function PressReleaseCard({
  item,
  isSelected,
  onSelect,
}: PressReleaseCardProps) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLElement>
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(item);
    }
  };

  return (
    <article
      className={`${styles.card} ${
        isSelected ? styles.selectedCard : ""
      }`}
      role="button"
      tabIndex={0}
      aria-label={`Read ${item.title}`}
      onClick={() => onSelect(item)}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.imageContainer}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 582px"
          className={styles.image}
        />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3>{item.title}</h3>

          <div className={styles.meta}>
            <span>Location: {item.location}</span>

            <time
              dateTime={item.date.split("/").reverse().join("-")}
            >
              Date: {item.date}
            </time>
          </div>
        </div>

        <p className={styles.description}>
          {item.description}
        </p>

        {isSelected && (
          <p className={styles.response} role="status">
            ✓ Press release details will be available soon.
          </p>
        )}
      </div>
    </article>
  );
}

export default function PressReleases() {
  const [selectedId, setSelectedId] = useState<number | null>(
    null
  );

  const timeoutRef = useRef<ReturnType<
    typeof window.setTimeout
  > | null>(null);

  const handleSelect = (item: PressRelease) => {
    setSelectedId(item.id);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }


  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      className={styles.section}
      id="press-releases"
    >
      <div className={styles.header}>
        <h2>Press Releases</h2>

        <p>
          Stay updated with the latest happenings and exciting
          developments at YourBank through our press releases.
        </p>
      </div>

      <div className={styles.grid}>
        {pressReleases.map((item) => (
          <PressReleaseCard
            key={item.id}
            item={item}
            isSelected={selectedId === item.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </section>
  );
}