'use client';

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ZOOM_SIDE_MARGIN } from '@/config/app-config';
import classNames from 'classnames';
import styles from './zoom-area.module.css';
import ImageWrapper from '../image-wrapper/image-wrapper';

export default function ZoomArea({ className, imageSrc, imageAlt }) {
  const [cursorPositionAbsolute, setCursorPositionAbsolute] = useState(null);

  const cursorPositionRelativeToImage = useRef(null);
  const imageRef = useRef(null);

  const updateCursorAbsPosition = (e) => {
    // disable scroll and refresh
    if (e.type === 'touchmove') {
      e.preventDefault();
    }

    // desktop events
    if (e.clientX && e.clientY) {
      const { clientX, clientY } = e;
      setCursorPositionAbsolute({ x: clientX, y: clientY });
    }

    // mobile events
    if (e.touches) {
      const { touches } = e;
      const { clientX, clientY } = touches[0];
      setCursorPositionAbsolute({ x: clientX, y: clientY });
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', updateCursorAbsPosition);
    document.addEventListener('touchstart', updateCursorAbsPosition);
    document.addEventListener('touchmove', updateCursorAbsPosition, { passive: false });

    return () => {
      document.removeEventListener('mousemove', updateCursorAbsPosition);
      document.removeEventListener('touchmove', updateCursorAbsPosition);
      document.removeEventListener('touchstart', updateCursorAbsPosition);
    };
  }, []);

  useEffect(() => {
    if (imageRef.current && cursorPositionAbsolute) {
      const rect = imageRef.current.getBoundingClientRect();

      const isOutsideZoomArea =
        cursorPositionAbsolute.x < rect.left - ZOOM_SIDE_MARGIN ||
        cursorPositionAbsolute.x > rect.right + ZOOM_SIDE_MARGIN ||
        cursorPositionAbsolute.y < rect.top - ZOOM_SIDE_MARGIN ||
        cursorPositionAbsolute.y > rect.bottom + ZOOM_SIDE_MARGIN;

      if (isOutsideZoomArea) {
        cursorPositionRelativeToImage.current = null;
      } else {
        const relativeImageX = (cursorPositionAbsolute.x - rect.left) / rect.width;
        const relativeImageY = (cursorPositionAbsolute.y - rect.top) / rect.height;

        cursorPositionRelativeToImage.current = {
          x: `${relativeImageX * 100}%`,
          y: `${relativeImageY * 100}%`,
        };
      }
    }
  }, [cursorPositionAbsolute]);

  return (
    <div className={classNames(className, styles.zoom_area)} ref={imageRef}>
      <ImageWrapper
        className={styles.image}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        onDragStart={(e) => e.preventDefault()}
        fill
      />
      {cursorPositionRelativeToImage.current && (
        <div
          className={styles.cursor}
          data-testid='cursor-div'
          style={{
            left: cursorPositionAbsolute.x,
            top: cursorPositionAbsolute.y,
            backgroundImage: `url(${imageSrc})`,
            backgroundPositionX: cursorPositionRelativeToImage.current.x,
            backgroundPositionY: cursorPositionRelativeToImage.current.y,
          }}
        />
      )}
    </div>
  );
}

ZoomArea.propTypes = {
  className: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};
