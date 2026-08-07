"use client";

import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

import styles from "./DocumentUploadStep.module.css";

export type UploadedDocuments = {
  identityDocument: File | null;
  addressProof: File | null;
  incomeProof: File | null;
  businessDocument: File | null;
  taxDocument: File | null;
};

export type DocumentField =
  keyof UploadedDocuments;

export const emptyUploadedDocuments: UploadedDocuments = {
  identityDocument: null,
  addressProof: null,
  incomeProof: null,
  businessDocument: null,
  taxDocument: null,
};

type DocumentUploadStepProps = {
  isBusinessAccount: boolean;
  documents: UploadedDocuments;
  onDocumentChange: (
    field: DocumentField,
    file: File | null,
  ) => void;
  onBack: () => void;
  onContinue: () => void;
};

type DocumentInputProps = {
  field: DocumentField;
  title: string;
  description: string;
  required?: boolean;
  file: File | null;
  onChange: (
    field: DocumentField,
    file: File | null,
  ) => void;
};

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} bytes`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function DocumentInput({
  field,
  title,
  description,
  required = false,
  file,
  onChange,
}: DocumentInputProps) {
  const [previewUrl, setPreviewUrl] = useState("");
  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setErrorMessage("");

    const selectedFile =
      event.target.files?.[0] ?? null;

    if (!selectedFile) {
      onChange(field, null);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage(
        "Please upload a JPG, PNG, WEBP or PDF file.",
      );

      event.target.value = "";
      return;
    }

    const maximumSize = 5 * 1024 * 1024;

    if (selectedFile.size > maximumSize) {
      setErrorMessage(
        "The selected file must be smaller than 5 MB.",
      );

      event.target.value = "";
      return;
    }

    onChange(field, selectedFile);
  };

  return (
    <article
      className={`${styles.documentCard} ${
        file ? styles.uploadedCard : ""
      }`}
    >
      <div className={styles.documentHeader}>
        <span className={styles.documentIcon}>
          {file ? "✓" : "↑"}
        </span>

        <div className={styles.documentTitle}>
          <h3>
            {title}

            {required && (
              <span
                className={styles.required}
                aria-label="required"
              >
                *
              </span>
            )}
          </h3>

          <p>{description}</p>
        </div>
      </div>

      {!file && (
        <label className={styles.uploadArea}>
          <input
            key={`${field}-empty`}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.pdf"
            onChange={handleFileChange}
            required={required}
          />

          <span className={styles.uploadSymbol}>
            ＋
          </span>

          <strong>Choose Document</strong>

          <small>
            JPG, PNG, WEBP or PDF — maximum 5 MB
          </small>
        </label>
      )}

      {file && (
        <div className={styles.filePreview}>
          {previewUrl ? (
            <div className={styles.previewImage}>
              <Image
                src={previewUrl}
                alt={`Preview of ${title}`}
                fill
                unoptimized
                sizes="130px"
              />
            </div>
          ) : (
            <div className={styles.pdfPreview}>
              PDF
            </div>
          )}

          <div className={styles.fileInformation}>
            <strong>{file.name}</strong>

            <span>{formatFileSize(file.size)}</span>

            <span>Ready to upload</span>
          </div>

          <button
            type="button"
            className={styles.removeButton}
            onClick={() => onChange(field, null)}
            aria-label={`Remove ${title}`}
          >
            Remove
          </button>
        </div>
      )}

      {errorMessage && (
        <p className={styles.error} role="alert">
          {errorMessage}
        </p>
      )}
    </article>
  );
}

export default function DocumentUploadStep({
  isBusinessAccount,
  documents,
  onDocumentChange,
  onBack,
  onContinue,
}: DocumentUploadStepProps) {
  const [formMessage, setFormMessage] =
    useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setFormMessage("");

    if (
      !documents.identityDocument ||
      !documents.addressProof
    ) {
      setFormMessage(
        "Please upload all required documents.",
      );

      return;
    }

    if (
      isBusinessAccount &&
      !documents.businessDocument
    ) {
      setFormMessage(
        "Please upload your business registration document.",
      );

      return;
    }

    onContinue();
  };

  return (
    <div className={styles.formCard}>
      <header className={styles.cardHeader}>
        <span>Step 4 of 5</span>

        <h2>Upload Your Documents</h2>

        <p>
          Upload clear and readable documents. Files marked
          with an asterisk are required.
        </p>
      </header>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <div className={styles.documentGrid}>
          <DocumentInput
            field="identityDocument"
            title="Identity Document"
            description="Upload the front side of your CNIC or passport."
            required
            file={documents.identityDocument}
            onChange={onDocumentChange}
          />

          <DocumentInput
            field="addressProof"
            title="Address Proof"
            description="Upload a utility bill or another address document."
            required
            file={documents.addressProof}
            onChange={onDocumentChange}
          />

          <DocumentInput
            field="incomeProof"
            title="Income Proof"
            description="Upload a salary slip, bank statement or income document."
            file={documents.incomeProof}
            onChange={onDocumentChange}
          />

          {isBusinessAccount && (
            <>
              <DocumentInput
                field="businessDocument"
                title="Business Registration"
                description="Upload your business registration certificate."
                required
                file={documents.businessDocument}
                onChange={onDocumentChange}
              />

              <DocumentInput
                field="taxDocument"
                title="Tax Document"
                description="Upload your NTN or relevant tax document."
                file={documents.taxDocument}
                onChange={onDocumentChange}
              />
            </>
          )}
        </div>

        {formMessage && (
          <p
            className={styles.formError}
            role="alert"
          >
            {formMessage}
          </p>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.backButton}
            onClick={onBack}
          >
            <span aria-hidden="true">←</span>
            Back
          </button>

          <button
            type="submit"
            className={styles.continueButton}
          >
            Review Application
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </div>
  );
}