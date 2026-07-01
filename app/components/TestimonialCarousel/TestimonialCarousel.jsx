"use client";

import { useState } from "react";
import { reviews } from "../../lib/reviews";
import styles from "./TestimonialCarousel.module.css";

const STARS = "★★★★★";

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

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!reviews.length) return null;

  const getReviewAt = (offset) => {
    return reviews[(activeIndex + offset + reviews.length) % reviews.length];
  };

  const activeReview = reviews[activeIndex];
  const previousReview = getReviewAt(-1);
  const nextReview = getReviewAt(1);

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? reviews.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === reviews.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <section className={styles.testimonialSection}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>reviews</p>
          <br/>
          <h2 className={styles.title}>Client Reflections</h2>
          <p className={styles.copy}>
            A few kind words from clients who have trusted Your Gardens by
            Design to help bring their outdoor spaces to life.
          </p>
        </div>

        <div className={styles.stage}>
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
            key={activeReview.id}
            className={styles.reviewCard}
            aria-live="polite"
          >
            <StarRating />

            <p className={styles.quote}>“{activeReview.quote}”</p>

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
                onClick={() => setActiveIndex(index)}
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
      </div>
    </section>
  );
}
