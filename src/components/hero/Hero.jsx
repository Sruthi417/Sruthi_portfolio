"use client";

import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./Hero.scss";

// Playback speed of the sky video — lower = slower, more subtle cloud drift.
// (The asset itself is already ~0.8×; this multiplies on top of that.)
const VIDEO_SPEED = 0.25;

const Hero = () => {
  const videoRef = useRef(null);
  // Drives the still-frame cover below. Starts false so the very first paint
  // is the poster — never a bare <video> that iOS could decorate.
  const [isPlaying, setIsPlaying] = useState(false);

  // Hoist <link rel="preload"> into <head> so the browser starts fetching the
  // sky the moment the HTML streams in, instead of waiting for the CSS (poster
  // background) or the video element to be parsed.
  ReactDOM.preload("/hero-poster.jpg", { as: "image", fetchPriority: "high" });
  ReactDOM.preload("/hero-loop.mp4", { as: "video", type: "video/mp4" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applySpeed = () => {
      video.playbackRate = VIDEO_SPEED;
    };

    // iOS refuses autoplay outright in Low Power Mode (and sometimes on a
    // cold first visit) — there's no way to detect that from JS, and the
    // rejected promise is the only signal. Whenever it refuses, the poster
    // cover stays up and hides the button it draws; this just quietly retries,
    // since the first tap/scroll is a gesture iOS does accept.
    const tryPlay = () => {
      applySpeed();
      video.play()?.catch(() => {
        /* still blocked — the poster stays up, which is the intended look */
      });
    };

    const resume = () => {
      if (video.paused && document.visibilityState === "visible") tryPlay();
    };

    // Uncover the video only once frames are genuinely on screen, and re-cover
    // the instant it stops — a paused <video> is exactly when iOS repaints the
    // button, so the cover has to come back with it.
    const uncover = () => setIsPlaying(true);
    const cover = () => setIsPlaying(false);

    tryPlay();

    // Browsers can reset playbackRate when the source (re)loads, so reapply.
    video.addEventListener("loadedmetadata", applySpeed);
    video.addEventListener("play", applySpeed);
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("playing", uncover);
    video.addEventListener("pause", cover);
    video.addEventListener("ended", cover);
    video.addEventListener("error", cover);

    const passive = { passive: true };
    document.addEventListener("touchstart", resume, passive);
    document.addEventListener("pointerdown", resume, passive);
    document.addEventListener("scroll", resume, passive);
    document.addEventListener("visibilitychange", resume);

    return () => {
      video.removeEventListener("loadedmetadata", applySpeed);
      video.removeEventListener("play", applySpeed);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("playing", uncover);
      video.removeEventListener("pause", cover);
      video.removeEventListener("ended", cover);
      video.removeEventListener("error", cover);
      document.removeEventListener("touchstart", resume);
      document.removeEventListener("pointerdown", resume);
      document.removeEventListener("scroll", resume);
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);

  return (
    <section className="hero">
      {/* z-0 — looping boomerang sky video */}
      <video
        ref={videoRef}
        className="hero__video"
        src="/hero-loop.mp4"
        /* frame 1 of the clip — fills the element until the video can decode */
        poster="/hero-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
      />

      {/* z-0, painted over the video — the still frame that guarantees iOS's
          start-playback button is never visible. Recent iOS ignores
          `display:none` on that shadow-DOM control, so covering it is the only
          approach that actually holds. It sits in front until frames are
          really rolling, and comes straight back if playback ever stops. */}
      <img
        className={`hero__cover${isPlaying ? " hero__cover--lifted" : ""}`}
        src="/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        draggable="false"
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
          <span className="hero__title-main">Fullstack</span>
          <span className="hero__title-script">engineer</span>
        </h1>

        <p className="hero__tagline">
          Building consumer &amp; enterprise products @{" "}
          <a
            href="https://floks.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__company"
          >
            <img
              className="hero__company-logo"
              src="/comp-logo.svg"
              alt=""
              aria-hidden="true"
              draggable="false"
            />
            Floks Minds
          </a>
        </p>
      </div>

      {/* z-3 — bottom meta row */}
    </section>
  );
};

export default Hero;
