import Link from 'next/link';
import React from 'react';
import { IMAGES_AUTHOR } from '@/config/author-data';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <h1>The Zooming App</h1>
      </Link>
      <span className={styles.subtitle}>
        Pictures of
        {` ${IMAGES_AUTHOR}`}
      </span>
    </header>
  );
}
