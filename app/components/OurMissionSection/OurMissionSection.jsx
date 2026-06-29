import MissionImageCarousel from "./pictureGrid";
import styles from "./OurMissionSection.module.css";

const missionImages = [
  "https://nciholasegner.s3.us-east-2.amazonaws.com/ygbd/mission-section/image-2.webp",
  "https://nciholasegner.s3.us-east-2.amazonaws.com/ygbd/mission-section/image-3.webp",
  "https://nciholasegner.s3.us-east-2.amazonaws.com/ygbd/mission-section/image-4.webp",
];

export default function OurMissionSection() {
  return (
    <section className={styles.missionSection} aria-labelledby="mission-title">
      <div className={styles.missionInner}>
        <article className={styles.missionCard}>
          <h2 id="mission-title" className={styles.missionTitle}>
            Our Mission
          </h2>

          <div className={styles.missionDivider} aria-hidden="true">
            <span />
          </div>

          <p className={styles.missionLead}>
            <em> Custom garden design for beautiful outdoor living spaces.</em>
          </p>

          <p className={styles.missionText}>
            Our mission is to transform outdoor living spaces into purposeful
            and elegant environments. By combining expert gardenscape design
            with precise project execution, we deliver garden transformation
            solutions that enhance everyday living.
          </p>
        </article>

        <MissionImageCarousel images={missionImages} />
      </div>
    </section>
  );
}
