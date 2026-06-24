// components/OurMissionSection/pictureGrid.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./OurMissionSection.module.css";

const AUTO_DELAY = 6000;

export default function MissionImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const imageCount = images.length;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageCount);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };

  useEffect(() => {
    if (isPaused || imageCount <= 1) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % imageCount);
    }, AUTO_DELAY);

    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, imageCount]);

  if (!images?.length) return null;

  return (
    <div
      className={styles.carouselWrap}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className={styles.carouselFrame}>
        {images.map((src, index) => (
          <div
            key={src}
            className={`${styles.carouselFadeImage} ${
              index === currentIndex ? styles.activeImage : ""
            }`}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={src}
              alt={
                index === currentIndex
                  ? "Beautiful garden design and outdoor living space"
                  : ""
              }
              fill
              sizes="(max-width: 900px) 100vw, 650px"
              className={styles.carouselImage}
              priority={index === 0}
            />
          </div>
        ))}

        <button
          type="button"
          className={`${styles.carouselButton} ${styles.previousButton}`}
          onClick={goToPrevious}
          aria-label="Previous garden image"
        >
          ‹
        </button>

        <button
          type="button"
          className={`${styles.carouselButton} ${styles.nextButton}`}
          onClick={goToNext}
          aria-label="Next garden image"
        >
          ›
        </button>

        <button
          type="button"
          className={styles.pauseButton}
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? "Play image rotation" : "Pause image rotation"}
        >
          <span aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</span>
        </button>
      </div>
    </div>
  );
}
