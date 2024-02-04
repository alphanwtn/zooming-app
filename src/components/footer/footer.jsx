import React from 'react';
import Link from 'next/link';
import { AUTHOR_WEBSITE } from '@/config/author-data';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <>
      <div className={styles.fake_footer} />
      <footer className={styles.footer}>
        <Link href={AUTHOR_WEBSITE} target='_blank'>
          Visit the artist page! ↗️
        </Link>
      </footer>
    </>
  );
}
