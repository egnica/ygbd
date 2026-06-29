"use client";

import { useRef, useState } from "react";
import styles from "./FeaturedVideoSection.module.css";

export default function FeaturedVideoPlayer({ video, chapters }) {
  const videoRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const handleChapterClick = async (chapter, index) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = chapter.start;
    setActiveChapter(index);

    try {
      await videoRef.current.play();
    } catch {
      // Browser may block autoplay until user interacts with the video controls.
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const currentTime = videoRef.current.currentTime;

    const currentChapterIndex = chapters.reduce(
      (activeIndex, chapter, index) => {
        return currentTime >= chapter.start ? index : activeIndex;
      },
      0,
    );

    setActiveChapter(currentChapterIndex);
  };
  const handleVideoEnded = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setActiveChapter(0);
  };

  return (
    <div className={styles.videoExperience}>
      <div className={styles.videoFrame}>
        <video
          onEnded={handleVideoEnded}
          ref={videoRef}
          className={styles.video}
          controls
          preload="metadata"
          poster={video.poster}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={styles.chapterPanel} aria-label="Video story chapters">
        <p className={styles.chapterPanelTitle}>Watch by chapter</p>

        <div className={styles.chapterList}>
          {chapters.map((chapter, index) => (
            <button
              key={chapter.title}
              type="button"
              className={`${styles.chapterCard} ${
                activeChapter === index ? styles.activeChapter : ""
              }`}
              onClick={() => handleChapterClick(chapter, index)}
              aria-label={`Play video chapter: ${chapter.title}. ${chapter.description}`}
              aria-pressed={activeChapter === index}
            >
              <span className={styles.chapterTitle}>{chapter.title}</span>
              <span className={styles.chapterHoverText}>
                {chapter.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
