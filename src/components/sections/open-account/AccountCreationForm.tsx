"use client";

import Link from "next/link";
import { useState } from "react";

import UserInformationStep, {
  emptyApplicantInformation,
  type ApplicantInformation,
} from "./UserInformationStep";

import DocumentUploadStep, {
  emptyUploadedDocuments,
  type DocumentField,
  type UploadedDocuments,
} from "./DocumentUploadStep";

import ReviewApplicationStep from "./ReviewApplicationStep";

import styles from "./AccountCreationForm.module.css";

type AccountType = "personal" | "business";

type SubAccountType =
  | "personal-savings"
  | "personal-current"
  | "student"
  | "business-current"
  | "startup"
  | "corporate";

type AccountOption = {
  value: SubAccountType;
  title: string;
  description: string;
  icon: string;
};

type ApplicationResponse = {
  message?: string;
  applicationReference?: string;
};

const steps = [
  "Account Type",
  "Account Details",
  "Information",
  "Documents",
  "Review",
];

const personalAccounts: AccountOption[] = [
  {
    value: "personal-savings",
    title: "Savings Account",
    description:
      "Grow your savings securely with flexible deposits and competitive banking benefits.",
    icon: "💰",
  },
  {
    value: "personal-current",
    title: "Current Account",
    description:
      "Manage everyday payments, transfers and regular personal banking transactions.",
    icon: "💳",
  },
  {
    value: "student",
    title: "Student Account",
    description:
      "A simple banking account created especially for students and their daily needs.",
    icon: "🎓",
  },
];

const businessAccounts: AccountOption[] = [
  {
    value: "business-current",
    title: "Business Current Account",
    description:
      "Manage business payments, expenses and daily company transactions efficiently.",
    icon: "🏢",
  },
  {
    value: "startup",
    title: "Startup Account",
    description:
      "Flexible banking services designed for startups and newly established businesses.",
    icon: "🚀",
  },
  {
    value: "corporate",
    title: "Corporate Account",
    description:
      "Advanced financial management solutions for established companies and organizations.",
    icon: "📊",
  },
];

export default function AccountCreationForm() {
  const [currentStep, setCurrentStep] =
    useState(1);

  const [accountType, setAccountType] =
    useState<AccountType | null>(null);

  const [subAccountType, setSubAccountType] =
    useState<SubAccountType | null>(null);

  const [
    applicantInformation,
    setApplicantInformation,
  ] = useState<ApplicantInformation>(
    emptyApplicantInformation,
  );

  const [
    uploadedDocuments,
    setUploadedDocuments,
  ] = useState<UploadedDocuments>(
    emptyUploadedDocuments,
  );

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const [
    applicationReference,
    setApplicationReference,
  ] = useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  const availableAccounts =
    accountType === "business"
      ? businessAccounts
      : personalAccounts;

  const selectedAccount =
    availableAccounts.find(
      (account) =>
        account.value === subAccountType,
    ) ?? null;

  const handleAccountTypeSelect = (
    type: AccountType,
  ) => {
    setAccountType(type);
    setSubAccountType(null);
    setSubmitError("");

    setUploadedDocuments(
      emptyUploadedDocuments,
    );
  };

  const handleInformationChange = (
    field: keyof ApplicantInformation,
    value: string,
  ) => {
    setApplicantInformation((current) => ({
      ...current,
      [field]: value,
    }));

    setSubmitError("");
  };

  const handleDocumentChange = (
    field: DocumentField,
    file: File | null,
  ) => {
    setUploadedDocuments((current) => ({
      ...current,
      [field]: file,
    }));

    setSubmitError("");
  };

  const handleAccountTypeContinue = () => {
    if (!accountType) {
      return;
    }

    setSubmitError("");
    setCurrentStep(2);
  };

  const handleSubAccountContinue = () => {
    if (!subAccountType) {
      return;
    }

    setSubmitError("");
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (isSubmitting) {
      return;
    }

    setSubmitError("");

    setCurrentStep((current) =>
      Math.max(1, current - 1),
    );
  };

  const handleEditStep = (step: number) => {
    if (isSubmitting) {
      return;
    }

    setSubmitError("");
    setIsSubmitted(false);
    setCurrentStep(step);
  };

  const handleApplicationSubmit =
    async (): Promise<void> => {
      if (
        !accountType ||
        !subAccountType ||
        !selectedAccount
      ) {
        setSubmitError(
          "Please complete all account details before submitting.",
        );

        return;
      }

      const uploadedFiles = Object.values(
        uploadedDocuments,
      ).filter(
        (file): file is File =>
          file instanceof File,
      );

      const totalFileSize =
        uploadedFiles.reduce(
          (total, file) =>
            total + file.size,
          0,
        );

      const maximumTotalFileSize =
        3 * 1024 * 1024;

      if (
        totalFileSize >
        maximumTotalFileSize
      ) {
        setSubmitError(
          "The combined size of all documents must not exceed 3 MB.",
        );

        return;
      }

      setIsSubmitting(true);
      setSubmitError("");

      const formData = new FormData();

      formData.append(
        "applicationData",
        JSON.stringify({
          accountCategory:
            accountType === "business"
              ? "Business Account"
              : "Personal Account",

          selectedAccount:
            selectedAccount.title,

          isBusinessAccount:
            accountType === "business",

          information:
            applicantInformation,
        }),
      );

      (
        Object.entries(
          uploadedDocuments,
        ) as Array<
          [DocumentField, File | null]
        >
      ).forEach(([field, file]) => {
        if (file) {
          formData.append(
            field,
            file,
            file.name,
          );
        }
      });

      try {
        const response = await fetch(
          "/api/account-application",
          {
            method: "POST",
            body: formData,
          },
        );

        const result =
          (await response.json()) as ApplicationResponse;

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Application could not be submitted.",
          );
        }

        const reference =
          result.applicationReference ||
          `YB-${Date.now()
            .toString()
            .slice(-8)}`;

        setApplicationReference(reference);
        setIsSubmitted(true);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Application could not be submitted. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>
            Create Your Account
          </span>

          <h1>
            Start Banking with{" "}
            <span>YourBank</span>
          </h1>

          <p>
            Complete the following steps to
            create your personal or business
            banking account.
          </p>
        </header>

        {/* Progress indicator */}

        {!isSubmitted && (
          <div
            className={styles.steps}
            aria-label="Account creation progress"
          >
            {steps.map((step, index) => {
              const stepNumber = index + 1;

              return (
                <div
                  className={`${
                    styles.step
                  } ${
                    stepNumber === currentStep
                      ? styles.activeStep
                      : ""
                  } ${
                    stepNumber < currentStep
                      ? styles.completedStep
                      : ""
                  }`}
                  key={step}
                >
                  <span>
                    {stepNumber < currentStep
                      ? "✓"
                      : stepNumber}
                  </span>

                  <p>{step}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Step 1: Account type */}

        {currentStep === 1 &&
          !isSubmitted && (
            <div className={styles.formCard}>
              <div
                className={styles.cardHeader}
              >
                <span>Step 1 of 5</span>

                <h2>
                  Select Your Account Type
                </h2>

                <p>
                  Choose the account category
                  that best matches your banking
                  requirements.
                </p>
              </div>

              <div
                className={
                  styles.accountOptions
                }
              >
                <button
                  type="button"
                  className={`${
                    styles.accountOption
                  } ${
                    accountType === "personal"
                      ? styles.selectedOption
                      : ""
                  }`}
                  onClick={() =>
                    handleAccountTypeSelect(
                      "personal",
                    )
                  }
                  aria-pressed={
                    accountType === "personal"
                  }
                >
                  <span
                    className={
                      styles.optionIcon
                    }
                  >
                    👤
                  </span>

                  <span
                    className={
                      styles.optionText
                    }
                  >
                    <strong>
                      Personal Account
                    </strong>

                    <small>
                      For savings, everyday
                      banking and individual
                      financial requirements.
                    </small>
                  </span>

                  <span
                    className={styles.radio}
                  >
                    {accountType ===
                      "personal" && <span />}
                  </span>
                </button>

                <button
                  type="button"
                  className={`${
                    styles.accountOption
                  } ${
                    accountType === "business"
                      ? styles.selectedOption
                      : ""
                  }`}
                  onClick={() =>
                    handleAccountTypeSelect(
                      "business",
                    )
                  }
                  aria-pressed={
                    accountType === "business"
                  }
                >
                  <span
                    className={
                      styles.optionIcon
                    }
                  >
                    💼
                  </span>

                  <span
                    className={
                      styles.optionText
                    }
                  >
                    <strong>
                      Business Account
                    </strong>

                    <small>
                      For companies, startups
                      and professional business
                      banking needs.
                    </small>
                  </span>

                  <span
                    className={styles.radio}
                  >
                    {accountType ===
                      "business" && <span />}
                  </span>
                </button>
              </div>

              <div
                className={styles.actions}
              >
                <button
                  type="button"
                  className={
                    styles.continueButton
                  }
                  onClick={
                    handleAccountTypeContinue
                  }
                  disabled={!accountType}
                >
                  Continue
                  <span aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </div>
          )}

        {/* Step 2: Sub-account type */}

        {currentStep === 2 &&
          !isSubmitted && (
            <div className={styles.formCard}>
              <div
                className={styles.cardHeader}
              >
                <span>Step 2 of 5</span>

                <h2>
                  Select Your{" "}
                  {accountType === "business"
                    ? "Business"
                    : "Personal"}{" "}
                  Account
                </h2>

                <p>
                  Choose the specific account
                  that best matches your
                  requirements.
                </p>
              </div>

              <div
                className={
                  styles.subAccountGrid
                }
              >
                {availableAccounts.map(
                  (account) => {
                    const isSelected =
                      subAccountType ===
                      account.value;

                    return (
                      <button
                        type="button"
                        className={`${
                          styles.subAccountOption
                        } ${
                          isSelected
                            ? styles.selectedOption
                            : ""
                        }`}
                        key={account.value}
                        onClick={() =>
                          setSubAccountType(
                            account.value,
                          )
                        }
                        aria-pressed={
                          isSelected
                        }
                      >
                        <span
                          className={
                            styles.subAccountIcon
                          }
                        >
                          {account.icon}
                        </span>

                        <span
                          className={
                            styles.subAccountText
                          }
                        >
                          <strong>
                            {account.title}
                          </strong>

                          <small>
                            {
                              account.description
                            }
                          </small>
                        </span>

                        <span
                          className={
                            styles.radio
                          }
                        >
                          {isSelected && (
                            <span />
                          )}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>

              <div
                className={
                  styles.navigationActions
                }
              >
                <button
                  type="button"
                  className={
                    styles.backButton
                  }
                  onClick={handleBack}
                >
                  <span aria-hidden="true">
                    ←
                  </span>
                  Back
                </button>

                <button
                  type="button"
                  className={
                    styles.continueButton
                  }
                  onClick={
                    handleSubAccountContinue
                  }
                  disabled={!subAccountType}
                >
                  Continue
                  <span aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </div>
          )}

        {/* Step 3: User information */}

        {currentStep === 3 &&
          !isSubmitted && (
            <UserInformationStep
              isBusinessAccount={
                accountType === "business"
              }
              information={
                applicantInformation
              }
              onChange={
                handleInformationChange
              }
              onBack={handleBack}
              onContinue={() => {
                setSubmitError("");
                setCurrentStep(4);
              }}
            />
          )}

        {/* Step 4: Document upload */}

        {currentStep === 4 &&
          !isSubmitted && (
            <DocumentUploadStep
              isBusinessAccount={
                accountType === "business"
              }
              documents={
                uploadedDocuments
              }
              onDocumentChange={
                handleDocumentChange
              }
              onBack={handleBack}
              onContinue={() => {
                setSubmitError("");
                setCurrentStep(5);
              }}
            />
          )}

        {/* Step 5: Review application */}

        {currentStep === 5 &&
          !isSubmitted && (
            <ReviewApplicationStep
              accountCategory={
                accountType === "business"
                  ? "Business Account"
                  : "Personal Account"
              }
              selectedAccount={
                selectedAccount?.title ??
                "Not selected"
              }
              information={
                applicantInformation
              }
              documents={
                uploadedDocuments
              }
              isBusinessAccount={
                accountType === "business"
              }
              isSubmitting={isSubmitting}
              submitError={submitError}
              onBack={handleBack}
              onEditStep={
                handleEditStep
              }
              onSubmit={
                handleApplicationSubmit
              }
            />
          )}

        {/* Application success screen */}

        {isSubmitted && (
          <div className={styles.formCard}>
            <div
              className={
                styles.successContainer
              }
            >
              <span
                className={
                  styles.successIcon
                }
              >
                ✓
              </span>

              <h2>
                Application Submitted!
              </h2>

              <p>
                Thank you,{" "}
                {
                  applicantInformation.firstName
                }
                . Your account application
                has been received and will be
                reviewed by the YourBank team.
              </p>

              <div
                className={
                  styles.applicationReference
                }
              >
                <span>
                  Application Reference
                </span>

                <strong>
                  {applicationReference}
                </strong>
              </div>

              <Link
                href="/"
                className={
                  styles.homeButton
                }
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}