/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import { ribbonGardenImages } from "@/app/lib/gardenImages";
import styles from "./GardenGalleryShowcase.module.css";

const getWrappedIndex = (index, length) => {
  return ((index % length) + length) % length;
};

const getImageAlt = (image, index) => {
  return (
    image.alt ||
    image.title ||
    `Your Gardens by Design garden image ${index + 1}`
  );
};

export default function GardenGalleryShowcase() {
  const images = ribbonGardenImages;

  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const modalOpen = modalIndex !== null;
  const activeModalImage = modalOpen ? images[modalIndex] : null;

  const visibleImages = useMemo(() => {
    if (!images.length) return [];

    return [-2, -1, 0, 1, 2].map((offset) => {
      const index = getWrappedIndex(activeIndex + offset, images.length);

      return {
        ...images[index],
        index,
        offset,
      };
    });
  }, [activeIndex, images]);

  useEffect(() => {
    if (!images.length || isPaused || modalOpen) return;

    const interval = setInterval(() => {
      setActiveIndex((currentIndex) =>
        getWrappedIndex(currentIndex + 1, images.length),
      );
    }, 5600);

    return () => clearInterval(interval);
  }, [images.length, isPaused, modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setModalIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        setModalIndex((currentIndex) => {
          if (currentIndex === null) return currentIndex;

          const nextIndex = getWrappedIndex(currentIndex - 1, images.length);
          setActiveIndex(nextIndex);
          return nextIndex;
        });
      }

      if (event.key === "ArrowRight") {
        setModalIndex((currentIndex) => {
          if (currentIndex === null) return currentIndex;

          const nextIndex = getWrappedIndex(currentIndex + 1, images.length);
          setActiveIndex(nextIndex);
          return nextIndex;
        });
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen, images.length]);

  const goToPreviousImage = () => {
    setActiveIndex((currentIndex) =>
      getWrappedIndex(currentIndex - 1, images.length),
    );
  };

  const goToNextImage = () => {
    setActiveIndex((currentIndex) =>
      getWrappedIndex(currentIndex + 1, images.length),
    );
  };

  const goToPreviousModalImage = () => {
    setModalIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;

      const nextIndex = getWrappedIndex(currentIndex - 1, images.length);
      setActiveIndex(nextIndex);
      return nextIndex;
    });
  };

  const goToNextModalImage = () => {
    setModalIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;

      const nextIndex = getWrappedIndex(currentIndex + 1, images.length);
      setActiveIndex(nextIndex);
      return nextIndex;
    });
  };

  const handleGalleryImageClick = (image) => {
    if (image.offset === 0) {
      setModalIndex(image.index);
      return;
    }

    if (image.offset === -1 || image.offset === 1) {
      setActiveIndex(image.index);
    }
  };

  if (!images.length) return null;

  return (
    <section className={styles.section} aria-labelledby="garden-gallery-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Photo Gallery</p>
        <br />
        <h2 id="garden-gallery-title" className={styles.title}>
          From the Garden
        </h2>

        <p className={styles.copy}>
          A closer look at the color, texture, and outdoor spaces Your Gardens
          by Design helps bring to life.
        </p>
      </div>

      <div
        className={styles.viewer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          className={`${styles.navButton} ${styles.previousNav}`}
          type="button"
          onClick={goToPreviousImage}
          aria-label="Show previous garden image"
        >
          ‹
        </button>

        <div className={styles.stage}>
          {visibleImages.map((image) => {
            const positionClass =
              image.offset === -2
                ? styles.previousExit
                : image.offset === -1
                  ? styles.previous
                  : image.offset === 0
                    ? styles.center
                    : image.offset === 1
                      ? styles.next
                      : styles.nextExit;

            const isHiddenPosition = Math.abs(image.offset) === 2;

            return (
              <button
                key={image.id}
                className={`${styles.galleryImage} ${positionClass}`}
                type="button"
                onClick={() => handleGalleryImageClick(image)}
                aria-hidden={isHiddenPosition}
                tabIndex={isHiddenPosition ? -1 : 0}
                aria-label={
                  image.offset === 0
                    ? `Open ${getImageAlt(image, image.index)}`
                    : `Feature ${getImageAlt(image, image.index)}`
                }
              >
                <img
                  src={image.src}
                  alt={getImageAlt(image, image.index)}
                  className={styles.image}
                  draggable="false"
                />
              </button>
            );
          })}
        </div>

        <button
          className={`${styles.navButton} ${styles.nextNav}`}
          type="button"
          onClick={goToNextImage}
          aria-label="Show next garden image"
        >
          ›
        </button>
      </div>

      {modalOpen && activeModalImage && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Expanded garden image"
          onClick={() => setModalIndex(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              type="button"
              onClick={() => setModalIndex(null)}
              aria-label="Close image preview"
            >
              ×
            </button>

            <button
              className={`${styles.modalArrow} ${styles.previousButton}`}
              type="button"
              onClick={goToPreviousModalImage}
              aria-label="View previous image"
            >
              ‹
            </button>

            <figure className={styles.modalFigure}>
              <div className={styles.modalImageFrame}>
                <img
                  src={activeModalImage.src}
                  alt={getImageAlt(activeModalImage, modalIndex)}
                  className={styles.modalImage}
                  draggable="false"
                />
              </div>

              {activeModalImage.title && (
                <figcaption className={styles.modalCaption}>
                  {activeModalImage.title}
                </figcaption>
              )}
            </figure>

            <button
              className={`${styles.modalArrow} ${styles.nextButton}`}
              type="button"
              onClick={goToNextModalImage}
              aria-label="View next image"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
