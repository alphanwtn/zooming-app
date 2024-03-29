import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { IMAGES_AUTHOR } from '@/config/author-data';
import classNames from 'classnames';
import styles from './header.module.css';

export default function Header({ className }) {
  return (
    <header className={classNames(className, styles.header)}>
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

Header.propTypes = {
  className: PropTypes.string,
};
