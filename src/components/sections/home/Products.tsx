"use client";

import { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import styles from "./Products.module.css";

type ProductType = "individuals" | "businesses";
type ProductIcon = "checking" | "savings" | "loans";

type Product = {
  title: string;
  description: string;
  icon: ProductIcon;
};

const individualProducts: Product[] = [
  {
    title: "Checking Accounts",
    icon: "checking",
    description:
      "Enjoy easy and convenient access to your funds with our range of checking account options. Benefit from features such as online and mobile banking, debit cards, and free ATM access.",
  },
  {
    title: "Savings Accounts",
    icon: "savings",
    description:
      "Build your savings with our competitive interest rates and flexible savings account options. Whether you’re saving for a specific goal or want to grow your wealth over time, we have the right account for you.",
  },
  {
    title: "Loans and Mortgages",
    icon: "loans",
    description:
      "Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need.",
  },
];

const businessProducts: Product[] = [
  {
    title: "Business Checking",
    icon: "checking",
    description:
      "Manage everyday business payments with a flexible checking account designed for businesses, with digital banking, debit cards, and secure transaction management.",
  },
  {
    title: "Business Savings",
    icon: "savings",
    description:
      "Grow your company’s reserves with competitive business savings options designed to support future investments and unexpected expenses.",
  },
  {
    title: "Business Loans",
    icon: "loans",
    description:
      "Access flexible business financing for equipment, expansion, working capital, and other important business requirements.",
  },
];

export default function Products() {
  const [selectedTab, setSelectedTab] =
    useState<ProductType | null>(null);

  const products =
    selectedTab === "businesses"
      ? businessProducts
      : individualProducts;

  const handleProductClick = (title: string) => {
    window.alert(`${title} details will be available soon.`);
  };

  return (
    <section className={styles.products} id="products">
      <div className={styles.header}>
        <div className={styles.headingContent}>
          <h2>
            Our <span>Products</span>
          </h2>

          <p>
            Discover a range of comprehensive and customizable banking
            products at YourBank, designed to suit your unique financial
            needs and aspirations
          </p>
        </div>

        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Product categories"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedTab === "individuals"}
            className={`${styles.tabButton} ${
              selectedTab === "individuals" ? styles.active : ""
            }`}
            onClick={() => setSelectedTab("individuals")}
          >
            For Individuals
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={selectedTab === "businesses"}
            className={`${styles.tabButton} ${
              selectedTab === "businesses" ? styles.active : ""
            }`}
            onClick={() => setSelectedTab("businesses")}
          >
            For Businesses
          </button>
        </div>
      </div>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.title}
            title={product.title}
            description={product.description}
            icon={product.icon}
            onClick={() => handleProductClick(product.title)}
          />
        ))}
      </div>
    </section>
  );
}