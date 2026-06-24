import styles from "./FeaturedVideoSection.module.css";

const featuredVideo = {
  title: "A Garden Should be a Reflection of You",
  videoUrl:
    "https://nciholasegner.s3.us-east-2.amazonaws.com/video/your-gardens.mp4",
  poster:
    "https://nciholasegner.s3.us-east-2.amazonaws.com/ygbd/ygbd-main-logo-pic.webp",
};

export default function FeaturedVideoSection() {
  return (
    <section
      className={styles.featuredVideoSection}
      aria-labelledby="featured-video-title"
    >
      <div className={styles.videoInner}>
        <div className={styles.videoIntro}>
          <p className={styles.eyebrow}>Featured Video</p>

          <h2 id="featured-video-title" className={styles.videoTitle}>
            {featuredVideo.title}
          </h2>

          <p className={styles.videoLead}>
            Hear how Sandra and Bette approach garden design, installation, and
            ongoing care through a process built around each client’s space,
            style, and everyday life.
          </p>
        </div>

        <div className={styles.videoFrame}>
          <video
            className={styles.video}
            controls
            preload="metadata"
            poster={featuredVideo.poster}
          >
            <source src={featuredVideo.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className={styles.videoHighlights}>
          <article className={styles.highlightCard}>
            <h3>Designed Around You</h3>
            <p>
              The garden is not a reflection of us. It is a reflection of you.
            </p>
          </article>

          <article className={styles.highlightCard}>
            <h3>Gardenscape Design</h3>
            <p>
              A garden-focused approach to design, planting, installation, and
              maintenance.
            </p>
          </article>

          <article className={styles.highlightCard}>
            <h3>A Thoughtful Partnership</h3>
            <p>
              Creative vision, plant knowledge, containers, shade gardening,
              planning, and project care.
            </p>
          </article>
        </div>

        <details className={styles.transcriptDetails}>
          <summary>Read the video transcript</summary>

          <div className={styles.transcriptContent}>
            <p>
              The beauty of the garden and all that it brings to us. We want to
              bring that to you. We can design it for you, install it for you,
              maintain it for you, whatever works for you.
            </p>

            <p>
              The garden is not a reflection of us. It is a reflection of you,
              because we really get to know you and understand what you want the
              garden to do for you.
            </p>

            <p>
              We are not a landscape company. We call ourselves a gardenscape
              because it is basically gardens.
            </p>

            <p>
              Our skills complement each other. Sandy brings design skill and
              deep perennial knowledge. Bette brings expertise in containers,
              shade gardening, business, administration, and project management.
            </p>

            <p>
              We bring love and joy and admiration into our work, and we have
              fun every day. Gardens give us hope and something to look forward
              to each year.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
