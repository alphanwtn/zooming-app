"use client";
import React, { useEffect, useState } from "react";
import styles from "./zoom-area.module.css";

function ZoomArea({ children }) {
  const [position, setPosition] = useState(null);

  const updateCursorPosition = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", updateCursorPosition);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return (
    <div className={styles.zoom_area}>
      {children}
      {position && (
        <div
          className={styles.cursor}
          style={{ left: position.x, top: position.y }}
        />
      )}
    </div>
  );
}

export default ZoomArea;
