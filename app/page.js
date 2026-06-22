import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            poster="/images/ygbd-hero-poster.jpg"
          >
            <source
              src="https://placeholdervideo.dev/1920x1080"
              type="video/mp4"
            />
          </video>

          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <Image
              src="/logo.webp"
              alt="Your Gardens by Design"
              width={260}
              height={180}
              className={styles.heroLogo}
              priority
            />

            <h1 className={styles.heroTitle}>Your Gardens by Design</h1>
            <p className={styles.heroTextTitle}>Your Space, Reimagined in Bloom</p>
            <p className={styles.heroText}>
              Experience expert gardenscape design that transforms your garden
              into stunning outdoor living spaces.
            </p>

            <div className={styles.heroActions}>
              <a href="/contact" className={styles.primaryButton}>
                Request a Consultation
              </a>
              <a href="/gallery" className={styles.secondaryButton}>
                View Our Work
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
