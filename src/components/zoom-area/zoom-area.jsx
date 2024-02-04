'use client';

import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import styles from './zoom-area.module.css';

export default function ZoomArea({ imageSrc, imageAlt }) {
  const [cursorPositionAbsolute, setCursorPositionAbsolute] = useState(null);

  const cursorPositionRelativeToImage = useRef(null);
  const imageRef = useRef(null);

  const updateCursorPosition = (e) => {
    // disable scroll
    if (e.type === 'touchmove') {
      e.preventDefault();
    }

    // desktop "mousemove"
    if (e.clientX && e.clientY) {
      setCursorPositionAbsolute({ x: e.clientX, y: e.clientY });
    }

    // mobile "touchmove" "touchstart"
    if (e.touches) {
      const { touches } = e;

      const posX = touches[0].clientX;
      const posY = touches[0].clientY;

      setCursorPositionAbsolute({ x: posX, y: posY });
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

      const relativeImageX = (cursorPositionAbsolute.x - rect.left) / rect.width;
      const relativeImageY = (cursorPositionAbsolute.y - rect.top) / rect.height;

      cursorPositionRelativeToImage.current = {
        x: `${relativeImageX * 100}%`,
        y: `${relativeImageY * 100}%`,
      };
    }
  }, [cursorPositionAbsolute]);

  return (
    <div className={styles.zoom_area}>
      <Image
        ref={imageRef}
        src={imageSrc}
        alt={imageAlt}
        layout='responsive'
        width={400}
        height={400}
        priority
      />
      {cursorPositionAbsolute && cursorPositionRelativeToImage.current && (
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
