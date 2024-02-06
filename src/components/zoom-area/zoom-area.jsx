'use client';

import Image from 'next/legacy/image';
import React, { useEffect, useState, useRef } from 'react';
import { ZOOM_SIDE_MARGIN } from '@/config/app-config';
import styles from './zoom-area.module.css';

export default function ZoomArea({ imageSrc, imageAlt }) {
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
    <div className={styles.zoom_area} ref={imageRef}>
      <Image
        className={styles.image}
        src={imageSrc}
        alt={imageAlt}
        onDragStart={(e) => e.preventDefault()}
        layout='responsive'
        width={1}
        height={1}
        priority
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
