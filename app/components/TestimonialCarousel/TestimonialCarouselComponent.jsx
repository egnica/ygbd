"use client";

import { useEffect, useState } from "react";
import { reviews } from "../../lib/reviews";
import styles from "./TestimonialCarousel.module.css";

const STARS = "★★★★★";
const LONG_REVIEW_LENGTH = 360;

function StarRating({ className = "" }) {
  return (
    <div
      className={`${styles.stars} ${className}`}
      aria-label="5 out of 5 stars"
    >
      <span aria-hidden="true">{STARS}</span>
    </div>
  );
}

export default function TestimonialCarouselComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("next");

  const reviewCount = reviews.length;

  const goToPrevious = () => {
    setIsExpanded(false);
    setAnimationDirection("previous");
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? reviewCount - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setIsExpanded(false);
    setAnimationDirection("next");
    setActiveIndex((currentIndex) =>
      currentIndex === reviewCount - 1 ? 0 : currentIndex + 1,
    );
  };

  const goToReview = (index) => {
    if (index === activeIndex) return;

    setIsExpanded(false);
    setAnimationDirection(index > activeIndex ? "next" : "previous");
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isPaused || isExpanded || reviewCount <= 1) return;

    const interval = setInterval(() => {
      setAnimationDirection("next");
      setActiveIndex((currentIndex) =>
        currentIndex === reviewCount - 1 ? 0 : currentIndex + 1,
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused, isExpanded, reviewCount]);

  if (!reviewCount) return null;

  const getReviewAt = (offset) => {
    return reviews[(activeIndex + offset + reviewCount) % reviewCount];
  };

  const activeReview = reviews[activeIndex];
  const previousReview = getReviewAt(-1);
  const nextReview = getReviewAt(1);
  const isLongReview = activeReview.quote.length > LONG_REVIEW_LENGTH;

  return (
    <>
      <div
        className={styles.stage}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <button
          type="button"
          className={`${styles.previewCard} ${styles.previousPreview}`}
          onClick={goToPrevious}
          aria-label={`Show testimonial from ${previousReview.name}`}
        >
          <StarRating className={styles.previewStars} />
          <span>{previousReview.name}</span>
        </button>

        <article
          key={`${activeReview.id}-${animationDirection}`}
          className={`${styles.reviewCard} ${
            animationDirection === "previous"
              ? styles.fromLeft
              : styles.fromRight
          } ${isExpanded ? styles.expandedCard : ""}`}
          aria-live="polite"
        >
          <StarRating />

          <p
            className={`${styles.quote} ${
              isLongReview && !isExpanded ? styles.clampedQuote : ""
            }`}
          >
            “{activeReview.quote}”
          </p>

          {isLongReview && (
            <button
              type="button"
              className={styles.readMoreButton}
              onClick={() => setIsExpanded((currentValue) => !currentValue)}
              aria-expanded={isExpanded}
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}

          <footer className={styles.reviewFooter}>
            <span className={styles.name}>— {activeReview.name}</span>
          </footer>
        </article>

        <button
          type="button"
          className={`${styles.previewCard} ${styles.nextPreview}`}
          onClick={goToNext}
          aria-label={`Show testimonial from ${nextReview.name}`}
        >
          <StarRating className={styles.previewStars} />
          <span>{nextReview.name}</span>
        </button>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navButton}
          onClick={goToPrevious}
          aria-label="Show previous testimonial"
        >
          ‹
        </button>

        <div className={styles.dots} aria-label="Select testimonial">
          {reviews.map((review, index) => (
            <button
              key={review.id}
              type="button"
              className={`${styles.dot} ${
                index === activeIndex ? styles.activeDot : ""
              }`}
              onClick={() => goToReview(index)}
              aria-label={`Show testimonial from ${review.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.navButton}
          onClick={goToNext}
          aria-label="Show next testimonial"
        >
          ›
        </button>
      </div>
    </>
  );
}
