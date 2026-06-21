"use client";

import { useEffect, useRef } from "react";
import "./Hero.scss";

// Playback speed of the sky video — lower = slower, more subtle cloud drift.
// (The asset itself is already ~0.8×; this multiplies on top of that.)
const VIDEO_SPEED = 0.25;

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applySpeed = () => {
      video.playbackRate = VIDEO_SPEED;
    };

    applySpeed();
    // Browsers can reset playbackRate when the source (re)loads, so reapply.
    video.addEventListener("loadedmetadata", applySpeed);
    video.addEventListener("play", applySpeed);

    return () => {
      video.removeEventListener("loadedmetadata", applySpeed);
      video.removeEventListener("play", applySpeed);
    };
  }, []);

  return (
    <section className="hero">
      {/* z-0 — looping boomerang sky video */}
      <video
        ref={videoRef}
        className="hero__video"
        src="/hero-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* z-1 — figure sitting on the wall, anchored bottom-right */}
      <img
        className="hero__figure"
        src="/herome.png"
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      {/* z-2 — white fog fading the wall into white at the bottom */}
      <div className="hero__fog" />

      {/* z-3 — foreground copy */}
      <div className="hero__content">
        <p className="hero__greeting">
          <span className="hero__wave" aria-hidden="true">
            👋
          </span>{" "}
          Hey, I&apos;m <strong>Sruthi</strong>
        </p>

        <h1 className="hero__title">
          <span className="hero__title-main">product</span>
          <span className="hero__title-script">engineer</span>
        </h1>

        <p className="hero__tagline">
          Building consumer &amp; enterprise products @{" "}
          <span className="hero__company">
            <span className="hero__company-logo" aria-hidden="true" />
            mygate
          </span>
        </p>
      </div>

      {/* z-3 — bottom meta row */}
   
    </section>
  );
};

export default Hero;
