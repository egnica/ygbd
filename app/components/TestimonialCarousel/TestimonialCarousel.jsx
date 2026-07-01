import TestimonialCarouselComponent from "./TestimonialCarouselComponent";
import styles from "./TestimonialCarousel.module.css";

export default function TestimonialCarousel() {
  return (
    <section className={styles.testimonialSection}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Reviews</p>
          <br />
          <h2 className={styles.title}>Client Reflections</h2>
          <p className={styles.copy}>
            A few kind words from clients who have trusted Your Gardens by
            Design to help bring their outdoor spaces to life.
          </p>
        </div>

        <TestimonialCarouselComponent />
      </div>
    </section>
  );
}
