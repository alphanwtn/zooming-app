'use client';

import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import styles from './zoom-area.module.css';

const ZOOM_AREA_PADDING = 24;

export default function ZoomArea({ imageSrc, imageAlt }) {
  const [cursorPositionAbsolute, setCursorPositionAbsolute] = useState(null);

  const cursorPositionRelativeToImage = useRef(null);
  const imageRef = useRef(null);

  const updateCursorPosition = (e) => {
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
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('touchstart', updateCursorPosition);
    document.addEventListener('touchmove', updateCursorPosition, { passive: false });

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('touchmove', updateCursorPosition);
      document.removeEventListener('touchstart', updateCursorPosition);
    };
  }, []);

  useEffect(() => {
    if (imageRef.current && cursorPositionAbsolute) {
      const rect = imageRef.current.getBoundingClientRect();

      const isOutsideZoomArea =
        cursorPositionAbsolute.x < rect.left - ZOOM_AREA_PADDING ||
        cursorPositionAbsolute.x > rect.right + ZOOM_AREA_PADDING ||
        cursorPositionAbsolute.y < rect.top - ZOOM_AREA_PADDING ||
        cursorPositionAbsolute.y > rect.bottom + ZOOM_AREA_PADDING;

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
    <div className={styles.zoom_area} style={{ padding: ZOOM_AREA_PADDING }}>
      <Image
        ref={imageRef}
        src={imageSrc}
        alt={imageAlt}
        onDragStart={(e) => e.preventDefault()}
        layout='responsive'
        width={400}
        height={400}
        priority
      />
      {cursorPositionRelativeToImage.current && (
        <div
          className={styles.cursor}
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
