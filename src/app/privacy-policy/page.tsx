import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how YourBank collects, uses, protects, and manages personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <Navbar />

      <header className={styles.hero}>
        <span className={styles.eyebrow}>
          YourBank Legal
        </span>

        <h1>
          Privacy <span>Policy</span>
        </h1>

        <p>
          This policy explains how YourBank collects, uses,
          protects, and manages information when visitors use
          our website and digital services.
        </p>

       
      </header>

      <div className={styles.content}>
        <section className={styles.card}>
          <h2>1. Information We Collect</h2>

          <p>
            We may collect information that you provide directly
            when you use our contact form, sign-up form, login
            interface, or other website features.
          </p>

          <h3>Information provided by you</h3>

          <ul>
            <li>Name and email address.</li>
            <li>Contact form subject and message.</li>
            <li>
              Account registration information entered through
              website forms.
            </li>
          </ul>

          <h3>Information collected automatically</h3>

          <ul>
            <li>IP address and approximate location.</li>
            <li>Device type and device information.</li>
            <li>Browser type and operating system.</li>
            <li>
              Website interaction and technical request data.
            </li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>2. How We Use Your Information</h2>

          <p>We may use collected information to:</p>

          <ul>
            <li>Respond to contact form enquiries.</li>
            <li>
              Operate and improve the website and its features.
            </li>
            <li>
              Detect technical problems, fraud, spam, or misuse.
            </li>
            <li>
              Improve website security and user experience.
            </li>
            <li>
              Provide relevant banking product information.
            </li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>3. Contact Form and Email Service</h2>

          <p>
            When you submit the YourBank contact form, the
            information you provide is processed and delivered
            through our email service provider, Resend. The email
            received by YourBank may include your name, email,
            subject, message, IP address, approximate location,
            device type, device details, and browser information.
          </p>

          <p>
            This information is used to review and respond to your
            enquiry and to help protect the website against misuse.
          </p>
        </section>

        <section className={styles.card}>
          <h2>4. How We Share Information</h2>

          <p>
            YourBank does not sell your personal information. We
            may share limited information with service providers
            that help us operate the website, including hosting,
            email delivery, analytics, security, and live currency
            exchange services.
          </p>

          <p>
            Information may also be disclosed where required by
            law or where necessary to protect the website, its
            users, or our legal rights.
          </p>
        </section>

        <section className={styles.card}>
          <h2>5. Data Security</h2>

          <p>
            We use reasonable technical and organizational
            safeguards to protect information against unauthorized
            access, alteration, disclosure, or loss. However, no
            internet transmission or electronic storage system can
            be guaranteed to be completely secure.
          </p>

          <p>
            Users are responsible for keeping their passwords and
            account credentials private.
          </p>
        </section>

        <section className={styles.card}>
          <h2>6. Data Retention</h2>

          <p>
            We retain personal information only for as long as
            reasonably necessary to respond to enquiries, maintain
            website security, comply with legal obligations, and
            resolve disputes. Information that is no longer
            required may be securely deleted or anonymized.
          </p>
        </section>

        <section className={styles.card}>
          <h2>7. Cookies and Local Storage</h2>

          <p>
            YourBank may use cookies or browser storage to remember
            preferences and improve website functionality. For
            example, the selected light or dark theme may be stored
            in your browser&apos;s local storage.
          </p>

          <p>
            You can clear or restrict browser storage through your
            browser settings, although this may affect certain
            website preferences.
          </p>
        </section>

        <section className={styles.card}>
          <h2>8. Live Currency Exchange Data</h2>

          <p>
            The website may retrieve exchange-rate information from
            third-party API providers. These providers may process
            technical request information according to their own
            privacy policies. YourBank does not control the privacy
            practices of third-party services.
          </p>
        </section>

        <section className={styles.card}>
          <h2>9. Your Rights</h2>

          <p>
            Depending on the laws applicable to you, you may have
            the right to request access to, correction of, or
            deletion of your personal information. You may also
            have the right to object to or restrict certain uses of
            your data.
          </p>

          <p>
            You can submit a request by contacting us using the
            email addresses provided below.
          </p>
        </section>

        <section className={styles.card}>
          <h2>10. Children&apos;s Privacy</h2>

          <p>
            This website is not intended for children under the age
            of 18. We do not knowingly collect personal information
            from children. If such information is identified, we
            will take reasonable steps to remove it.
          </p>
        </section>

        <section className={styles.card}>
          <h2>11. Third-Party Links</h2>

          <p>
            YourBank may include links to third-party websites or
            services. We are not responsible for their content,
            security, availability, or privacy practices. Users
            should review the privacy policy of any external
            service they visit.
          </p>
        </section>

        <section className={styles.card}>
          <h2>12. Changes to This Policy</h2>

          <p>
            We may update this Privacy Policy when our website,
            services, or legal requirements change. The latest
            revision date will be displayed at the top of this
            page.
          </p>
        </section>

       <section className={styles.card}>
  <h2>13. Contact Us</h2>

  <p>
    For questions about this Privacy Policy or your
    information, contact us at:
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