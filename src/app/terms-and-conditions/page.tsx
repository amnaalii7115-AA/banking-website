import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Review the terms and conditions governing access to the YourBank website and digital services.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className={styles.page}>
      <Navbar />

      <header className={styles.hero}>
        <span className={styles.eyebrow}>
          YourBank Legal
        </span>

        <h1>
          Terms and <span>Conditions</span>
        </h1>

        <p>
          These terms explain the rules that apply when accessing
          or using the YourBank website, forms, tools, and digital
          services.
        </p>
      </header>

      <div className={styles.content}>
        <section className={styles.card}>
          <h2>1. Acceptance of Terms</h2>

          <p>
            By accessing or using the YourBank website, you agree
            to follow these Terms and Conditions. If you do not
            agree with these terms, you should stop using the
            website.
          </p>
        </section>

        <section className={styles.card}>
          <h2>2. Website Purpose</h2>

          <p>
            YourBank is a demonstration banking website created
            to present digital banking products, features,
            security information, career opportunities, contact
            facilities, and other related content.
          </p>

          <p>
            Unless expressly stated otherwise, the website does
            not create a real bank account, execute actual
            financial transactions, approve loans, or provide
            regulated financial advice.
          </p>
        </section>

        <section className={styles.card}>
          <h2>3. Eligibility</h2>

          <p>
            You must be at least 18 years old and legally capable
            of entering into an agreement to use any service that
            requires registration or submission of personal
            information.
          </p>

          <p>
            Businesses using the website must be legally
            authorized to act through the person submitting
            information on their behalf.
          </p>
        </section>

        <section className={styles.card}>
          <h2>4. User Information</h2>

          <p>
            You agree to provide accurate and complete information
            when using the contact, login, sign-up, or other
            website forms. You must not submit misleading,
            fraudulent, harmful, or unlawful information.
          </p>
        </section>

        <section className={styles.card}>
          <h2>5. Accounts and Credentials</h2>

          <p>
            Where account-related functionality is available, you
            are responsible for protecting your login credentials
            and preventing unauthorized access. You should not
            share your password or authentication information with
            another person.
          </p>

          <p>
            You should notify YourBank if you believe that your
            information or credentials have been misused.
          </p>
        </section>

        <section className={styles.card}>
          <h2>6. Banking Products</h2>

          <p>
            The website may display information about products and
            services such as:
          </p>

          <ul>
            <li>
              Individual and business checking accounts.
            </li>

            <li>
              Individual and business savings accounts.
            </li>

            <li>Personal and business loans.</li>

            <li>Mortgages and other financial products.</li>

            <li>Online banking and financial tools.</li>
          </ul>

          <p>
            Product descriptions shown on this demonstration
            website are for general information only and do not
            constitute a binding offer, approval, or financial
            advice.
          </p>
        </section>

        <section className={styles.card}>
          <h2>7. Currency Converter</h2>

          <p>
            Currency conversion results are based on information
            obtained through third-party exchange-rate services.
            Rates may be delayed, incomplete, or different from
            rates offered by banks, payment providers, or currency
            exchanges.
          </p>

          <p>
            Conversion results are provided for informational and
            demonstration purposes and should not be relied upon
            for financial decisions or transactions.
          </p>
        </section>

        <section className={styles.card}>
          <h2>8. Contact Form</h2>

          <p>
            When you submit the contact form, you authorize
            YourBank to receive and review the information
            included in your submission and to use your email
            address to respond to your enquiry.
          </p>

          <p>
            You must not use the contact form to send spam,
            malicious content, confidential banking credentials,
            or unlawful material.
          </p>
        </section>

        <section className={styles.card}>
          <h2>9. Acceptable Use</h2>

          <p>You agree not to:</p>

          <ul>
            <li>
              Use the website for fraudulent or illegal activity.
            </li>

            <li>
              Attempt to access systems or information without
              authorization.
            </li>

            <li>
              Introduce viruses, malicious code, or harmful
              material.
            </li>

            <li>
              Interfere with the website&apos;s operation or
              security.
            </li>

            <li>
              Copy or misuse website content, branding, or code.
            </li>

            <li>
              Submit another person&apos;s information without
              authorization.
            </li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>10. Intellectual Property</h2>

          <p>
            The YourBank name, logo, website design, text,
            graphics, code, and other materials are protected by
            applicable intellectual-property laws. You may not
            reproduce, distribute, modify, or commercially use
            website content without prior permission.
          </p>
        </section>

        <section className={styles.card}>
          <h2>11. Third-Party Services</h2>

          <p>
            The website may use or link to services operated by
            third parties, including email delivery, hosting,
            social login, and currency exchange providers.
            YourBank is not responsible for the content,
            availability, security, or practices of those
            services.
          </p>
        </section>

        <section className={styles.card}>
          <h2>12. Availability of the Website</h2>

          <p>
            We aim to keep the website available and functional,
            but we do not guarantee uninterrupted or error-free
            access. The website may be temporarily unavailable due
            to updates, maintenance, technical problems, or events
            outside our control.
          </p>
        </section>

        <section className={styles.card}>
          <h2>13. Disclaimer</h2>

          <p>
            The website and its content are provided on an
            &quot;as is&quot; and &quot;as available&quot; basis.
            Information displayed on the website is for general
            demonstration and informational purposes only.
          </p>

          <p>
            Nothing on the website should be treated as financial,
            legal, investment, tax, or professional advice.
          </p>
        </section>

        <section className={styles.card}>
          <h2>14. Limitation of Liability</h2>

          <p>
            To the maximum extent permitted by law, YourBank will
            not be responsible for indirect, incidental, special,
            or consequential loss resulting from the use of, or
            inability to use, the website or third-party services.
          </p>
        </section>

        <section className={styles.card}>
          <h2>15. Suspension or Termination</h2>

          <p>
            Access to the website may be restricted or terminated
            where a user breaches these terms, attempts to
            compromise website security, or uses the website for
            harmful or unlawful purposes.
          </p>
        </section>

        <section className={styles.card}>
          <h2>16. Changes to These Terms</h2>

          <p>
            We may update these Terms and Conditions when website
            features, services, or legal requirements change.
            Updated terms will become effective when they are
            published on this page.
          </p>
        </section>

        <section className={styles.card}>
          <h2>17. Governing Law</h2>

          <p>
            These terms are governed by the applicable laws of the
            jurisdiction in which YourBank operates. A production
            financial service should replace this section with its
            registered jurisdiction and applicable regulatory
            details.
          </p>
        </section>

        <section className={styles.card}>
          <h2>18. Contact Us</h2>

          <p>
            If you have any questions about these Terms and
            Conditions, contact us at:
          </p>

          <ul>
            <li>
              Support:{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@yourbank.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                support@yourbank.com
              </a>
            </li>

            <li>
              General enquiries:{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@yourbank.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                hello@yourbank.com
              </a>
            </li>
          </ul>
        </section>
      </div>

      <Footer />
    </main>
  );
}