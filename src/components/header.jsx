import Link from 'next/link';
import React from 'react';
import { GALLERY_AUTHOR } from '@/config/metadata';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <h1>The Zooming App</h1>
      </Link>
      <span>
        <i>
          Pictures of
          {GALLERY_AUTHOR}
        </i>
      </span>
    </header>
  );
}
