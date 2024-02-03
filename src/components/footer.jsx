import React from "react";
import styles from "./footer.module.css";
import { AUTHOR_WEBSITE } from "@/config/metadata";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href={AUTHOR_WEBSITE} target="_blank">
        Visit the artist page! ↗️
      </Link>
    </footer>
  );
}
