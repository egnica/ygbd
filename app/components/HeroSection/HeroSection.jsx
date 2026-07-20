import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/ygbd-hero-poster.jpg"
      >
        <source
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/ygbd/ygbd-loop-2.mp4"
          type="video/mp4"
        />
      </video>

      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <div className={styles.brandOval}>
          <h1 id="hero-title" className={styles.heroTitle}>
            <span className={styles.srOnly}>Your Gardens by Design</span>

            <svg
              className={styles.scriptArc}
              viewBox="0 0 1400 560"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <path id="your-gardens-arc" d="M 70 390 Q 700 10 1330 390" />
              </defs>

              <text className={styles.scriptArcText}>
                <textPath
                  href="#your-gardens-arc"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  Your Gardens
                </textPath>
              </text>
            </svg>

            <span className={styles.byDesign}>BY DESIGN</span>
          </h1>
        </div>

        <p className={styles.heroTextTitle}>Your Space, Reimagined in Bloom</p>

        <p className={styles.heroText}>
          Experience expert gardenscape design that transforms your garden into
          a stunning outdoor living space.
        </p>

        <div className={styles.heroActions}>
          <Link href="/contact" className={styles.primaryButton}>
            Request a Consultation
          </Link>

          <Link href="/gallery" className={styles.secondaryButton}>
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
