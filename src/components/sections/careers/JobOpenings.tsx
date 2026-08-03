"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./JobOpenings.module.css";

type Job = {
  id: number;
  title: string;
  location: string;
  department: string;
  description: string;
  requirements: string[];
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Relationship Manager",
    location: "India",
    department: "Retail Banking",
    description:
      "As a Relationship Manager at YourBank, you will be responsible for developing and maintaining relationships with our valued customers. You will understand their financial needs and provide personalized banking solutions that help them achieve their goals.",
    requirements: [
      "Bachelor’s degree in Business, Finance, or a related field",
      "Minimum of 3 years of experience in sales or relationship management",
      "Excellent communication and interpersonal skills",
      "Strong knowledge of banking products and services",
      "Ability to work independently and as part of a team",
    ],
  },
  {
    id: 2,
    title: "Risk Analyst",
    location: "India",
    department: "Risk Management",
    description:
      "As a Risk Analyst at YourBank, you will play a vital role in identifying, assessing, and managing financial and operational risks. You will work closely with different departments to ensure that our banking activities follow internal policies and regulatory requirements.",
    requirements: [
      "Bachelor’s degree in Finance, Economics, or a related field",
      "Minimum of 2 years of experience in risk management or analysis",
      "Strong analytical and problem-solving skills",
      "Knowledge of risk analysis tools and financial regulations",
      "Excellent attention to detail and communication skills",
    ],
  },
  {
    id: 3,
    title: "IT Security Specialist",
    location: "India",
    department: "Information Technology",
    description:
      "As an IT Security Specialist at YourBank, you will safeguard our digital systems and protect sensitive customer information. You will monitor potential threats, maintain security controls, and help strengthen the organization’s overall cybersecurity framework.",
    requirements: [
      "Bachelor’s degree in Computer Science, Information Security, or a related field",
      "Minimum of 3 years of experience in information security",
      "Strong knowledge of network and application security",
      "Experience with security monitoring and incident response",
      "Relevant certifications such as CISSP or CISM are preferred",
    ],
  },
];

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function DepartmentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M8 5V3h8v2M3 10h18M10 13h4" />
    </svg>
  );
}

function RequirementIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v14H4zM8 6V4h8v2" />
      <path d="m8 13 2 2 5-5" />
    </svg>
  );
}

export default function JobOpenings() {
  const [response, setResponse] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleApply = (jobTitle: string) => {
    setResponse(
      `Your application request for ${jobTitle} has been submitted.`,
    );

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setResponse(null);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.section} id="job-openings">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Job Openings</h2>

          <p>
            Explore exciting job opportunities at YourBank, where we
            value talent, innovation, and a passion for customer
            service. Join our team and be part of shaping a brighter
            future in the banking industry.
          </p>
        </header>

        {response && (
          <div className={styles.response} role="status">
            <span>✓</span>
            {response}
          </div>
        )}

        <div className={styles.jobsGrid}>
          {jobs.map((job) => (
            <article className={styles.jobCard} key={job.id}>
              <div className={styles.cardContent}>
                <header className={styles.jobHeader}>
                  <h3>{job.title}</h3>

                  <div className={styles.tags}>
                    <span className={styles.tag}>
                      <LocationIcon />
                      Location: {job.location}
                    </span>

                    <span className={styles.tag}>
                      <DepartmentIcon />
                      Department: {job.department}
                    </span>
                  </div>
                </header>

                <div className={styles.jobSection}>
                  <h4>About This Job</h4>
                  <p>{job.description}</p>
                </div>

                <div className={styles.jobSection}>
                  <h4>Requirements &amp; Qualifications</h4>

                  <ul className={styles.requirements}>
                    {job.requirements.map((requirement) => (
                      <li key={requirement}>
                        <RequirementIcon />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                type="button"
                className={styles.applyButton}
                onClick={() => handleApply(job.title)}
              >
                Apply Now
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}