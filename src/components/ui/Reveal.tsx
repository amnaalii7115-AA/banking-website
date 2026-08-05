"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import type { ReactNode } from "react";

import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
};

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const hiddenPosition = {
    up: {
      opacity: 0,
      y: 40,
    },

    left: {
      opacity: 0,
      x: -40,
    },

    right: {
      opacity: 0,
      x: 40,
    },
  };

  return (
    <motion.div
      className={styles.reveal}
      initial={
        shouldReduceMotion
          ? false
          : hiddenPosition[direction]
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              x: 0,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.08,
        margin: "0px 0px -50px",
      }}
      transition={{
        duration: 0.7,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}