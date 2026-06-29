import FeaturedVideoPlayer from "./FeaturedVideoPlayer";
import styles from "./FeaturedVideoSection.module.css";
import {
  featuredVideo,
  videoChapters,
  transcriptSummary,
} from "./featuredVideoData";

export default function FeaturedVideoSection() {
  return (
    <section
      id="featured-video"
      className={styles.featuredVideoSection}
      aria-labelledby="featured-video-title"
    >
      <div className={styles.videoInner}>
        <div className={styles.videoIntro}>
          <p className={styles.eyebrow}>{featuredVideo.eyebrow}</p>

          <h2 id="featured-video-title" className={styles.videoTitle}>
            {featuredVideo.title}
          </h2>

          <p className={styles.videoLead}>{featuredVideo.description}</p>
        </div>

        <FeaturedVideoPlayer video={featuredVideo} chapters={videoChapters} />
      </div>
    </section>
  );
}
