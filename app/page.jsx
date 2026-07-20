import Image from "next/image";
import styles from "./page.module.css";
import OurMission from "./components/OurMissionSection/OurMissionSection";
import FeaturedVideoSection from "./components/FeaturedVideo/FeaturedVideoSection";
import GardenGalleryRibbon from "./components/GardenGalleryShowcase/GardenGalleryShowcase";
import TestimonialCarousel from "./components/TestimonialCarousel/TestimonialCarousel";
import ContactForm from "./components/ContactForm/ContactForm";
import NavBar from "./components/NavBar/NavBar";
import HeroSection from "./components/HeroSection/HeroSection";

export default function Home() {
  return (
    <div className={styles.page}>
      <NavBar showLogo={false} />
      <main className={styles.main}>
        <HeroSection />
        {/* <section className={styles.hero}>
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
            <Image
              src="/logo.webp"
              alt="Your Gardens by Design"
              width={260}
              height={180}
              className={styles.heroLogo}
              priority
            />

            <h1 className={styles.heroTitle}>Your Gardens by Design</h1>
            <br />
            <p className={styles.heroTextTitle}>
              Your Space, Reimagined in Bloom
            </p>
            <br />
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
        </section> */}
        <FeaturedVideoSection />
        <OurMission />

        <div className={styles.gardenDivider} />

        <GardenGalleryRibbon />
        <div className={styles.testimonialBridge}>
          <TestimonialCarousel />
        </div>
        <ContactForm />
      </main>
    </div>
  );
}
