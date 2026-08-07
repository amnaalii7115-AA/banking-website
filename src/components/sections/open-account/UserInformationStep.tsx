"use client";

import {
  FormEvent,
  useState,
} from "react";

import styles from "./UserInformationStep.module.css";

export type ApplicantInformation = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  identityNumber: string;
  address: string;
  city: string;
  postalCode: string;
  businessName: string;
  registrationNumber: string;
  businessType: string;
};

type UserInformationStepProps = {
  isBusinessAccount: boolean;
  information: ApplicantInformation;
  onChange: (
    field: keyof ApplicantInformation,
    value: string,
  ) => void;
  onBack: () => void;
  onContinue: () => void;
};

export const emptyApplicantInformation: ApplicantInformation = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  nationality: "",
  identityNumber: "",
  address: "",
  city: "",
  postalCode: "",
  businessName: "",
  registrationNumber: "",
  businessType: "",
};

const namePattern =
  /^[A-Za-z][A-Za-z\s.'-]{1,49}$/;

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const phoneCharactersPattern =
  /^\+?[0-9\s()-]+$/;

const cnicPattern =
  /^\d{5}-?\d{7}-?\d$/;

const passportPattern =
  /^[A-Za-z0-9]{6,12}$/;

const postalCodePattern =
  /^[A-Za-z0-9][A-Za-z0-9\s-]{2,11}$/;

const businessRegistrationPattern =
  /^[A-Za-z0-9][A-Za-z0-9/.\s-]{2,49}$/;

function calculateAge(dateOfBirth: string) {
  const birthDate = new Date(
    `${dateOfBirth}T00:00:00`,
  );

  const today = new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function getMaximumBirthDate() {
  const date = new Date();

  date.setFullYear(date.getFullYear() - 18);

  return date.toISOString().split("T")[0];
}

export default function UserInformationStep({
  isBusinessAccount,
  information,
  onChange,
  onBack,
  onContinue,
}: UserInformationStepProps) {
  const [validationMessage, setValidationMessage] =
    useState("");

  const updateField = (
    field: keyof ApplicantInformation,
    value: string,
  ) => {
    setValidationMessage("");
    onChange(field, value);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setValidationMessage("");

    const firstName =
      information.firstName.trim();

    const lastName =
      information.lastName.trim();

    const email = information.email.trim();

    const phone = information.phone.trim();

    const nationality =
      information.nationality.trim();

    const identityNumber =
      information.identityNumber
        .trim()
        .replace(/\s/g, "");

    const address = information.address.trim();

    const city = information.city.trim();

    const postalCode =
      information.postalCode.trim();

    if (!namePattern.test(firstName)) {
      setValidationMessage(
        "Please enter a valid first name using letters only.",
      );

      return;
    }

    if (!namePattern.test(lastName)) {
      setValidationMessage(
        "Please enter a valid last name using letters only.",
      );

      return;
    }

    if (!emailPattern.test(email)) {
      setValidationMessage(
        "Please enter a valid email address.",
      );

      return;
    }

    if (!phoneCharactersPattern.test(phone)) {
      setValidationMessage(
        "Phone number can only contain digits, spaces, brackets, hyphens and an optional + sign.",
      );

      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");

    if (
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      setValidationMessage(
        "Phone number must contain between 7 and 15 digits.",
      );

      return;
    }

    

    if (!namePattern.test(nationality)) {
      setValidationMessage(
        "Please enter a valid nationality.",
      );

      return;
    }

    const hasValidIdentity =
      cnicPattern.test(identityNumber) ||
      passportPattern.test(identityNumber);

    if (!hasValidIdentity) {
      setValidationMessage(
        "Enter a valid CNIC such as 35202-1234567-1, or a 6–12 character passport number.",
      );

      return;
    }

    if (
      address.length < 10 ||
      address.length > 300
    ) {
      setValidationMessage(
        "Complete address must contain between 10 and 300 characters.",
      );

      return;
    }

    if (!namePattern.test(city)) {
      setValidationMessage(
        "Please enter a valid city name.",
      );

      return;
    }

    if (!postalCodePattern.test(postalCode)) {
      setValidationMessage(
        "Please enter a valid postal code.",
      );

      return;
    }

    if (isBusinessAccount) {
      const businessName =
        information.businessName.trim();

      const registrationNumber =
        information.registrationNumber.trim();

      if (
        businessName.length < 2 ||
        businessName.length > 120
      ) {
        setValidationMessage(
          "Business name must contain between 2 and 120 characters.",
        );

        return;
      }

      if (
        !businessRegistrationPattern.test(
          registrationNumber,
        )
      ) {
        setValidationMessage(
          "Please enter a valid business registration number.",
        );

        return;
      }

      if (!information.businessType) {
        setValidationMessage(
          "Please select your business type.",
        );

        return;
      }
    }

    onContinue();
  };

  return (
    <div className={styles.formCard}>
      <header className={styles.cardHeader}>
        <span>Step 3 of 5</span>

        <h2>
          {isBusinessAccount
            ? "Applicant and Business Information"
            : "Personal Information"}
        </h2>

        <p>
          Please enter accurate information. These details
          will be used to review your account application.
        </p>
      </header>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset className={styles.fieldset}>
          <legend>Personal Details</legend>

          <div className={styles.fieldGrid}>
            <label className={styles.field}>
              <span>First Name</span>

              <input
                type="text"
                value={information.firstName}
                onChange={(event) =>
                  updateField(
                    "firstName",
                    event.target.value,
                  )
                }
                placeholder="Enter first name"
                minLength={2}
                maxLength={50}
                autoComplete="given-name"
                required
              />
            </label>

            <label className={styles.field}>
              <span>Last Name</span>

              <input
                type="text"
                value={information.lastName}
                onChange={(event) =>
                  updateField(
                    "lastName",
                    event.target.value,
                  )
                }
                placeholder="Enter last name"
                minLength={2}
                maxLength={50}
                autoComplete="family-name"
                required
              />
            </label>

            <label className={styles.field}>
              <span>Email Address</span>

              <input
                type="email"
                value={information.email}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value,
                  )
                }
                placeholder="you@example.com"
                maxLength={254}
                autoComplete="email"
                inputMode="email"
                required
              />
            </label>

            <label className={styles.field}>
              <span>Phone Number</span>

              <input
                type="tel"
                value={information.phone}
                onChange={(event) =>
                  updateField(
                    "phone",
                    event.target.value,
                  )
                }
                placeholder="+92 300 1234567"
                minLength={7}
                maxLength={25}
                autoComplete="tel"
                inputMode="tel"
                required
              />

              <small>
                Enter 7–15 digits, including country code
                where applicable.
              </small>
            </label>
<label className={styles.field}>
  <span>Date of Birth</span>

  <input
    type="date"
    value={information.dateOfBirth}
    onChange={(event) =>
      updateField(
        "dateOfBirth",
        event.target.value,
      )
    }
    autoComplete="bday"
    required
  />

  <small>
    Applicant must be at least 18 years old.
  </small>
</label>

            <label className={styles.field}>
              <span>Nationality</span>

              <input
                type="text"
                value={information.nationality}
                onChange={(event) =>
                  updateField(
                    "nationality",
                    event.target.value,
                  )
                }
                placeholder="Enter nationality"
                minLength={2}
                maxLength={50}
                autoComplete="country-name"
                required
              />
            </label>

            <label
              className={`${styles.field} ${styles.fullWidth}`}
            >
              <span>CNIC or Passport Number</span>

              <input
                type="text"
                value={information.identityNumber}
                onChange={(event) =>
                  updateField(
                    "identityNumber",
                    event.target.value,
                  )
                }
                placeholder="35202-1234567-1 or passport number"
                minLength={6}
                maxLength={15}
                autoCapitalize="characters"
                required
              />

              <small>
                Enter a 13-digit CNIC or a 6–12 character
                passport number.
              </small>
            </label>
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Residential Address</legend>

          <div className={styles.fieldGrid}>
            <label
              className={`${styles.field} ${styles.fullWidth}`}
            >
              <span>Complete Address</span>

              <textarea
                value={information.address}
                onChange={(event) =>
                  updateField(
                    "address",
                    event.target.value,
                  )
                }
                placeholder="House number, street and area"
                rows={3}
                minLength={10}
                maxLength={300}
                autoComplete="street-address"
                required
              />
            </label>

            <label className={styles.field}>
              <span>City</span>

              <input
                type="text"
                value={information.city}
                onChange={(event) =>
                  updateField(
                    "city",
                    event.target.value,
                  )
                }
                placeholder="Enter city"
                minLength={2}
                maxLength={50}
                autoComplete="address-level2"
                required
              />
            </label>

            <label className={styles.field}>
              <span>Postal Code</span>

              <input
                type="text"
                value={information.postalCode}
                onChange={(event) =>
                  updateField(
                    "postalCode",
                    event.target.value,
                  )
                }
                placeholder="Enter postal code"
                minLength={3}
                maxLength={12}
                autoComplete="postal-code"
                required
              />
            </label>
          </div>
        </fieldset>

        {isBusinessAccount && (
          <fieldset className={styles.fieldset}>
            <legend>Business Details</legend>

            <div className={styles.fieldGrid}>
              <label className={styles.field}>
                <span>Business Name</span>

                <input
                  type="text"
                  value={information.businessName}
                  onChange={(event) =>
                    updateField(
                      "businessName",
                      event.target.value,
                    )
                  }
                  placeholder="Enter registered business name"
                  minLength={2}
                  maxLength={120}
                  autoComplete="organization"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>Registration Number</span>

                <input
                  type="text"
                  value={
                    information.registrationNumber
                  }
                  onChange={(event) =>
                    updateField(
                      "registrationNumber",
                      event.target.value,
                    )
                  }
                  placeholder="Enter registration number"
                  minLength={3}
                  maxLength={50}
                  required
                />
              </label>

              <label
                className={`${styles.field} ${styles.fullWidth}`}
              >
                <span>Business Type</span>

                <select
                  value={information.businessType}
                  onChange={(event) =>
                    updateField(
                      "businessType",
                      event.target.value,
                    )
                  }
                  required
                >
                  <option value="">
                    Select business type
                  </option>

                  <option value="sole-proprietorship">
                    Sole Proprietorship
                  </option>

                  <option value="partnership">
                    Partnership
                  </option>

                  <option value="private-limited">
                    Private Limited Company
                  </option>

                  <option value="public-limited">
                    Public Limited Company
                  </option>

                  <option value="non-profit">
                    Non-profit Organization
                  </option>
                </select>
              </label>
            </div>
          </fieldset>
        )}

        {validationMessage && (
          <p
            className={styles.validationMessage}
            role="alert"
            aria-live="polite"
          >
            {validationMessage}
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
            Continue
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </div>
  );
}