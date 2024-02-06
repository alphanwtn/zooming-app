import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { AUTHOR_WEBSITE } from '@/config/author-data';
import classNames from 'classnames';
import styles from './footer.module.css';

export default function Footer({ className }) {
  return (
    <>
      <div className={styles.fake_footer} />
      <footer className={classNames(className, styles.footer)}>
        <Link href={AUTHOR_WEBSITE} target='_blank'>
          Visit the artist page! ↗️
        </Link>
      </footer>
    </>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
};
