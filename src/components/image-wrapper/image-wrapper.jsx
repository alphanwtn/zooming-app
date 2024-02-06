'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import styles from './image-wrapper.module.css';

export default function ImageWrapper({
  className,
  width,
  height,
  imageSrc,
  imageAlt,
  priority,
  fill,
  onDragStart,
}) {
  const [isLoading, setIsLoading] = useState(true);

  function handleOnLoad() {
    setIsLoading(false);
  }

  return (
    <div className={styles.image_wrapper}>
      {isLoading && (
        <Image
          className={styles.loader}
          src='/loader.gif'
          width={40}
          height={40}
          alt='loader'
          priority
        />
      )}
      <Image
        className={className}
        src={imageSrc}
        width={width}
        height={height}
        alt={imageAlt}
        onLoad={handleOnLoad}
        priority={priority}
        fill={fill}
        onDragStart={onDragStart}
      />
    </div>
  );
}

ImageWrapper.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  priority: PropTypes.bool,
  fill: PropTypes.bool,
  onDragStart: PropTypes.func,
};
