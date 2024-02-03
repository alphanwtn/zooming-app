"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import styles from "./zoom-area.module.css";

function ZoomArea({ imageSrc }) {
  const [cursorPositionAbsolute, setCursorPositionAbsolute] = useState(null);
  const cursorPositionRelativeToImage = useRef(null);
  const imageRef = useRef(null);

  const updateCursorPosition = (e) => {
    setCursorPositionAbsolute({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", updateCursorPosition);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  useEffect(() => {
    // RECALCULER APRES RESIZE
    if (imageRef.current && cursorPositionAbsolute) {
      const rect = imageRef.current.getBoundingClientRect();

      const relativeImageX = (cursorPositionAbsolute.x - rect.left) / rect.width;
      const relativeImageY = (cursorPositionAbsolute.y - rect.top) / rect.height;

      cursorPositionRelativeToImage.current = {
        x: relativeImageX * 100 + "%",
        y: relativeImageY * 100 + "%",
      };
    }
  }, [cursorPositionAbsolute]);

  return (
    <div className={styles.zoom_area}>
      <Image
        className={styles.image}
        ref={imageRef}
        src={imageSrc}
        alt="alt text to be defined"
        layout="responsive"
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

export default ZoomArea;
