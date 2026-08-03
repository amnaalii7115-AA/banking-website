import styles from "./ProductCard.module.css";

type ProductIcon = "checking" | "savings" | "loans";

type ProductCardProps = {
  title: string;
  description: string;
  icon: ProductIcon;
  onClick: () => void;
};

function ProductIcon({ type }: { type: ProductIcon }) {
  if (type === "checking") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5V4.5C8 3.67 8.67 3 9.5 3h5c.83 0 1.5.67 1.5 1.5V5" />
        <path d="M4 7h16a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
        <path d="M2 11h20M10 11v2h4v-2" />
      </svg>
    );
  }

  if (type === "savings") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h16M6 7l1 13h10l1-13" />
        <path d="M8 4h8M12 10v6M9.5 13.5 12 16l2.5-2.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="13" rx="2" />
      <circle cx="12" cy="11.5" r="2.5" />
      <path d="M6 8h1M17 15h1M6 20h12" />
    </svg>
  );
}

export default function ProductCard({
  title,
  description,
  icon,
  onClick,
}: ProductCardProps) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className={styles.card}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${title}`}
    >
      <div className={styles.iconContainer}>
        <ProductIcon type={icon} />
      </div>

      <div className={styles.textContainer}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}