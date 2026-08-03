import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

type LogoProps = {
  href?: string;
};

export default function Logo({ href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={styles.logo}
      aria-label="YourBank home"
    >
      <Image
        src="/images/icon.png"
        alt=""
        width={34}
        height={34}
        className={styles.logoIcon}
        priority
      />

      <span className={styles.logoText}>
        YourBanK
      </span>
    </Link>
  );
}