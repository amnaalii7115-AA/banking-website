"use client";

import {
  FormEvent,
  useState,
} from "react";

import type { ApplicantInformation } from "./UserInformationStep";
import type { UploadedDocuments } from "./DocumentUploadStep";

import styles from "./ReviewApplicationStep.module.css";

type ReviewApplicationStepProps = {
  accountCategory: string;
  selectedAccount: string;
  information: ApplicantInformation;
  documents: UploadedDocuments;
  isBusinessAccount: boolean;
  isSubmitting: boolean;
  submitError: string;
  onBack: () => void;
  onEditStep: (step: number) => void;
  onSubmit: () => Promise<void>;
};

const businessTypeLabels: Record<string, string> = {
  "sole-proprietorship": "Sole Proprietorship",
  partnership: "Partnership",
  "private-limited": "Private Limited Company",
  "public-limited": "Public Limited Company",
  "non-profit": "Non-profit Organization",
};

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className={styles.reviewRow}>
      <span>{label}</span>

      <strong>{value || "Not provided"}</strong>
    </div>
  );
}

export default function ReviewApplicationStep({
  accountCategory,
  selectedAccount,
  information,
  documents,
  isBusinessAccount,
  isSubmitting,
  submitError,
  onBack,
  onEditStep,
  onSubmit,
}: ReviewApplicationStepProps) {
  const [hasAgreed, setHasAgreed] =
    useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!hasAgreed || isSubmitting) {
      return;
    }

    await onSubmit();
  };

  const uploadedDocuments = [
    {
      label: "Identity Document",
      file: documents.identityDocument,
    },
    {
      label: "Address Proof",
      file: documents.addressProof,
    },
    {
      label: "Income Proof",
      file: documents.incomeProof,
    },
    {
      label: "Business Registration",
      file: documents.businessDocument,
    },
    {
      label: "Tax Document",
      file: documents.taxDocument,
    },
  ].filter(
    (
      document,
    ): document is {
      label: string;
      file: File;
    } => document.file !== null,
  );

  return (
    <div className={styles.formCard}>
      <header className={styles.cardHeader}>
        <span>Step 5 of 5</span>

        <h2>Review Your Application</h2>

        <p>
          Please check your information carefully before
          submitting your account application.
        </p>
      </header>

      <form
        className={styles.reviewForm}
        onSubmit={handleSubmit}
      >
        {/* Account details */}

        <section className={styles.reviewSection}>
          <div className={styles.sectionHeader}>
            <div>
              <span>01</span>
              <h3>Account Details</h3>
            </div>

            <button
              type="button"
              onClick={() => onEditStep(1)}
              disabled={isSubmitting}
            >
              Edit
            </button>
          </div>

          <div className={styles.reviewGrid}>
            <ReviewRow
              label="Account Category"
              value={accountCategory}
            />

            <ReviewRow
              label="Selected Account"
              value={selectedAccount}
            />
          </div>
        </section>

        {/* Personal information */}

        <section className={styles.reviewSection}>
          <div className={styles.sectionHeader}>
            <div>
              <span>02</span>
              <h3>Personal Information</h3>
            </div>

            <button
              type="button"
              onClick={() => onEditStep(3)}
              disabled={isSubmitting}
            >
              Edit
            </button>
          </div>

          <div className={styles.reviewGrid}>
            <ReviewRow
              label="Full Name"
              value={`${information.firstName} ${information.lastName}`.trim()}
            />

            <ReviewRow
              label="Email Address"
              value={information.email}
            />

            <ReviewRow
              label="Phone Number"
              value={information.phone}
            />

            <ReviewRow
              label="Date of Birth"
              value={information.dateOfBirth}
            />

            <ReviewRow
              label="Nationality"
              value={information.nationality}
            />

            <ReviewRow
              label="CNIC or Passport"
              value={information.identityNumber}
            />

            <ReviewRow
              label="City"
              value={information.city}
            />

            <ReviewRow
              label="Postal Code"
              value={information.postalCode}
            />

            <div className={styles.fullWidthRow}>
              <ReviewRow
                label="Complete Address"
                value={information.address}
              />
            </div>
          </div>
        </section>

        {/* Business information */}

        {isBusinessAccount && (
          <section className={styles.reviewSection}>
            <div className={styles.sectionHeader}>
              <div>
                <span>03</span>
                <h3>Business Information</h3>
              </div>

              <button
                type="button"
                onClick={() => onEditStep(3)}
                disabled={isSubmitting}
              >
                Edit
              </button>
            </div>

            <div className={styles.reviewGrid}>
              <ReviewRow
                label="Business Name"
                value={information.businessName}
              />

              <ReviewRow
                label="Registration Number"
                value={information.registrationNumber}
              />

              <ReviewRow
                label="Business Type"
                value={
                  businessTypeLabels[
                    information.businessType
                  ] || information.businessType
                }
              />
            </div>
          </section>
        )}

        {/* Uploaded documents */}

        <section className={styles.reviewSection}>
          <div className={styles.sectionHeader}>
            <div>
              <span>
                {isBusinessAccount ? "04" : "03"}
              </span>

              <h3>Uploaded Documents</h3>
            </div>

            <button
              type="button"
              onClick={() => onEditStep(4)}
              disabled={isSubmitting}
            >
              Edit
            </button>
          </div>

          <div className={styles.documentList}>
            {uploadedDocuments.map((document) => (
              <div
                className={styles.documentItem}
                key={document.label}
              >
                <span className={styles.fileIcon}>
                  ✓
                </span>

                <div>
                  <strong>{document.label}</strong>
                  <small>{document.file.name}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Confirmation */}

        <label className={styles.confirmation}>
          <input
            type="checkbox"
            checked={hasAgreed}
            disabled={isSubmitting}
            onChange={(event) =>
              setHasAgreed(event.target.checked)
            }
          />

          <span>
            I confirm that the information and documents
            provided in this application are accurate and
            complete.
          </span>
        </label>

        {submitError && (
          <p
            className={styles.submitError}
            role="alert"
            aria-live="polite"
          >
            {submitError}
          </p>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.backButton}
            onClick={onBack}
            disabled={isSubmitting}
          >
            <span aria-hidden="true">←</span>
            Back
          </button>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!hasAgreed || isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Application"}

            <span aria-hidden="true">
              {isSubmitting ? "…" : "✓"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}