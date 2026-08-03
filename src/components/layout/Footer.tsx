import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Security", href: "/security" },
];

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M4 7L12 13L20 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.2 3.5L10 8L7.8 10C9.2 13 11.5 15.3 14.5 16.7L16.5 14.5L21 17.3C21.2 17.5 21.3 17.8 21.2 18.1C20.7 19.9 19.1 21.1 17.2 21.1C9.4 20.7 3.3 14.6 3 6.8C3 4.9 4.2 3.3 6 2.8C6.5 2.7 6.9 2.9 7.2 3.5Z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21S19 14.9 19 9A7 7 0 1 0 5 9C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 8H17V4H14C10.7 4 9 6 9 9V11H6V15H9V22H13V15H16L17 11H13V9C13 8.3 13.3 8 14 8Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 7.1V7.7C20.8 14 16 21.2 7.3 21.2C4.6 21.2 2.1 20.4 0 19.1H1.1C3.3 19.1 5.3 18.3 6.9 17.1C4.8 17.1 3.1 15.7 2.5 13.8C2.8 13.9 3.1 13.9 3.4 13.9C3.8 13.9 4.2 13.8 4.6 13.7C2.4 13.3 0.8 11.4 0.8 9V8.9C1.4 9.3 2.2 9.5 2.9 9.5C1.6 8.6 0.8 7.1 0.8 5.5C0.8 4.6 1 3.8 1.4 3.2C3.8 6.1 7.3 8 11.2 8.2C11.1 7.8 11.1 7.5 11.1 7.1C11.1 4.5 13.2 2.3 15.8 2.3C17.2 2.3 18.4 2.9 19.3 3.9C20.4 3.7 21.4 3.3 22.3 2.8C21.9 3.9 21.2 4.8 20.2 5.4C21.2 5.3 22.1 5 22.9 4.7C22.3 5.7 21.6 6.5 20.8 7.1Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.2 8.5H1.4V22H5.2V8.5ZM3.3 2A2.3 2.3 0 1 0 3.3 6.6A2.3 2.3 0 0 0 3.3 2ZM22.6 14.2C22.6 10.1 20.4 8.2 17.5 8.2C15.1 8.2 14.1 9.5 13.5 10.4V8.5H9.7V22H13.5V15.3C13.5 13.5 13.8 11.8 16.1 11.8C18.3 11.8 18.4 13.9 18.4 15.4V22H22.2L22.6 14.2Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.topContainer}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="Go to YourBank home page"
          >
            <Image
              src="/images/icon.png"
              alt="YourBank logo"
              width={34}
              height={34}
              className={styles.logoIcon}
            />

            <span>YourBank</span>
          </Link>

          <nav
            className={styles.navigation}
            aria-label="Footer navigation"
          >
            {navigationLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.divider} />

        <address className={styles.contactContainer}>
        <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@yourbank.com"
  target="_blank"
  rel="noopener noreferrer"
  className={styles.contactLink}
  aria-label="Send email to hello@yourbank.com using Gmail"
>
  <EmailIcon />
  <span>hello@yourbank.com</span>
</a>

          <a
            href="tel:+9191813232309"
            className={styles.contactLink}
            aria-label="Call YourBank"
          >
            <PhoneIcon />
            <span>+91 91813 23 2309</span>
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=YourBank"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
            aria-label="Open YourBank location in Google Maps"
          >
            <LocationIcon />
            <span>Somewhere in the World</span>
          </a>
        </address>

        <div className={styles.divider} />

        <div className={styles.bottomContainer}>
          <div className={styles.socialButtons}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialButton}
              aria-label="YourBank on Facebook"
            >
              <FacebookIcon />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialButton}
              aria-label="YourBank on Twitter"
            >
              <TwitterIcon />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialButton}
              aria-label="YourBank on LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>

          <p className={styles.copyright}>
            YourBank All Rights Reserved
          </p>

          <div className={styles.legalLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>

            <span
              className={styles.legalDivider}
              aria-hidden="true"
            />

            <Link href="/terms-of-service">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}