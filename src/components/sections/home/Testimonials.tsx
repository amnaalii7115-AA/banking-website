"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Testimonials.module.css";

type TestimonialCategory = "individuals" | "businesses";

type Testimonial = {
  name: string;
  text: string;
};

type SlideDirection = "next" | "previous";
type AnimationPhase = "idle" | "exit" | "enter";

const testimonialData: Record<TestimonialCategory, Testimonial[]> = {
  individuals: [
    {
      name: "Sarah T",
      text: "YourBank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances easier and more convenient.",
    },
    {
      name: "John D",
      text: "I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance has been invaluable.",
    },
    {
      name: "Emily G",
      text: "I love the convenience of YourBank's mobile banking app. It allows me to stay on top of my finances and make transactions on the go. The app is user-friendly and secure.",
    },
    {
      name: "Michael R",
      text: "YourBank helped me plan for my future with simple savings tools and reliable financial support. Their team has always been friendly, professional, and helpful.",
    },
  ],

  businesses: [
    {
      name: "Rachel M",
      text: "YourBank's business banking services have helped us manage payroll, vendor payments, and daily transactions from one convenient and secure platform.",
    },
    {
      name: "David K",
      text: "The business dashboard and approval tools have saved our finance team valuable time. YourBank is an excellent financial partner for growing companies.",
    },
    {
      name: "Priya S",
      text: "Real-time transaction reporting and flexible banking tools have made managing our company's finances much easier and more efficient.",
    },
    {
      name: "Thomas W",
      text: "YourBank made the business loan process clear and straightforward. Their support helped us secure funding and expand our operations successfully.",
    },
  ],
};

function QuoteIcon() {
  return (
    <span className={styles.quoteIcon} aria-hidden="true">
      “
    </span>
  );
}

export default function Testimonials() {
  const [activeCategory, setActiveCategory] =
    useState<TestimonialCategory>("individuals");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedTestimonial, setSelectedTestimonial] =
    useState<string | null>(null);

  const [direction, setDirection] =
    useState<SlideDirection>("next");

  const [animationPhase, setAnimationPhase] =
    useState<AnimationPhase>("idle");

  const transitionTimer = useRef<number | null>(null);

  const testimonials = testimonialData[activeCategory];

  const visibleTestimonials = Array.from(
    { length: 3 },
    (_, index) =>
      testimonials[
        (currentIndex + index) % testimonials.length
      ],
  );

  useEffect(() => {
    return () => {
      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current);
      }
    };
  }, []);

  const runTransition = (
    updateTestimonials: () => void,
    slideDirection: SlideDirection,
  ) => {
    if (animationPhase !== "idle") {
      return;
    }

    setDirection(slideDirection);
    setAnimationPhase("exit");

    transitionTimer.current = window.setTimeout(() => {
      updateTestimonials();
      setAnimationPhase("enter");
    }, 220);
  };

  const handlePrevious = () => {
    runTransition(() => {
      setSelectedTestimonial(null);

      setCurrentIndex((previousIndex) =>
        previousIndex === 0
          ? testimonials.length - 1
          : previousIndex - 1,
      );
    }, "previous");
  };

  const handleNext = () => {
    runTransition(() => {
      setSelectedTestimonial(null);

      setCurrentIndex(
        (previousIndex) =>
          (previousIndex + 1) % testimonials.length,
      );
    }, "next");
  };

  const handleCardSelect = (
    position: number,
    testimonialName: string,
  ) => {
    if (animationPhase !== "idle") {
      return;
    }

    if (position === 1) {
      setSelectedTestimonial(testimonialName);
      return;
    }

    const slideDirection: SlideDirection =
      position === 0 ? "previous" : "next";

    runTransition(() => {
      setCurrentIndex((previousIndex) => {
        const change = position - 1;

        return (
          previousIndex +
          change +
          testimonials.length
        ) % testimonials.length;
      });

      setSelectedTestimonial(testimonialName);
    }, slideDirection);
  };

  const handleCategoryChange = (
    category: TestimonialCategory,
  ) => {
    if (category === activeCategory) {
      return;
    }

    runTransition(() => {
      setActiveCategory(category);
      setCurrentIndex(0);
      setSelectedTestimonial(null);
    }, "next");
  };

  const handleAnimationEnd = () => {
    if (animationPhase === "enter") {
      setAnimationPhase("idle");
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <section
      className={styles.testimonials}
      id="testimonials"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2>
              Our <span>Testimonials</span>
            </h2>

            <p>
              Discover how YourBank has transformed lives with
              innovative digital solutions and personalized
              customer service. See why our clients trust us for a
              secure and prosperous financial journey.
            </p>
          </div>

          <div
            className={styles.tabs}
            role="group"
            aria-label="Testimonial categories"
          >
            <button
              type="button"
              className={`${styles.tabButton} ${
                activeCategory === "individuals"
                  ? styles.activeTab
                  : ""
              }`}
              onClick={() =>
                handleCategoryChange("individuals")
              }
            >
              For Individuals
            </button>

            <button
              type="button"
              className={`${styles.tabButton} ${
                activeCategory === "businesses"
                  ? styles.activeTab
                  : ""
              }`}
              onClick={() =>
                handleCategoryChange("businesses")
              }
            >
              For Businesses
            </button>
          </div>
        </div>

        <div className={styles.slider}>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={handlePrevious}
            aria-label="Show previous testimonial"
          >
            <svg viewBox="0 0 28 28" aria-hidden="true">
              <path d="M17 20L11 14L17 8" />
            </svg>
          </button>

          <div className={styles.cardsContainer}>
            <div
              className={styles.leftFade}
              aria-hidden="true"
            />

            <div
              className={styles.rightFade}
              aria-hidden="true"
            />

            <div
              className={`${styles.cardsTrack} ${
                animationPhase === "exit"
                  ? direction === "next"
                    ? styles.exitToLeft
                    : styles.exitToRight
                  : ""
              } ${
                animationPhase === "enter"
                  ? direction === "next"
                    ? styles.enterFromRight
                    : styles.enterFromLeft
                  : ""
              }`}
              onAnimationEnd={handleAnimationEnd}
            >
              {visibleTestimonials.map(
                (testimonial, index) => {
                  const isCenterCard = index === 1;

                  const isSelected =
                    selectedTestimonial === testimonial.name;

                  return (
                    <article
                      className={`${styles.card} ${
                        isCenterCard
                          ? styles.mobileCard
                          : ""
                      } ${
                        isSelected
                          ? styles.selectedCard
                          : ""
                      }`}
                      key={`${activeCategory}-${currentIndex}-${testimonial.name}`}
                      onClick={() =>
                        handleCardSelect(
                          index,
                          testimonial.name,
                        )
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();

                          handleCardSelect(
                            index,
                            testimonial.name,
                          );
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      aria-label={`Select testimonial from ${testimonial.name}`}
                    >
                      <div className={styles.quoteRow}>
                        <span className={styles.line} />
                        <QuoteIcon />
                        <span className={styles.line} />
                      </div>

                      <p className={styles.cardText}>
                        {testimonial.text}
                      </p>

                      <div className={styles.customerIdentity}>
                        <span
                          className={styles.avatar}
                          aria-hidden="true"
                        >
                          {getInitials(testimonial.name)}
                        </span>

                        <span className={styles.customerName}>
                          {testimonial.name}
                        </span>
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          </div>

          <button
            type="button"
            className={styles.arrowButton}
            onClick={handleNext}
            aria-label="Show next testimonial"
          >
            <svg viewBox="0 0 28 28" aria-hidden="true">
              <path d="M11 8L17 14L11 20" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}