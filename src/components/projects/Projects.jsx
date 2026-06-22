"use client";

import { useEffect, useRef, useState } from "react";
import "./Projects.scss";

const TITLE = "check out some of my work";
const LETTERS = TITLE.split("");

const Projects = () => {
  const headerRef = useRef(null);
  // `inView` flips true the first time the header scrolls into view
  const [inView, setInView] = useState(false);

  const cardRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect(); // play once
        }
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ---- custom cursor: the arrow circle follows the mouse inside the card ---- */
  const moveCursor = (e) => {
    const card = cardRef.current;
    const cur = cursorRef.current;
    if (!card || !cur) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    cur.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  };
  const showCursor = () =>
    cursorRef.current?.classList.add("project__cursor--on");
  const hideCursor = () =>
    cursorRef.current?.classList.remove("project__cursor--on");
  // grows over the "View Case Study" button (second reference)
  const growCursor = () =>
    cursorRef.current?.classList.add("project__cursor--active");
  const resetCursor = () =>
    cursorRef.current?.classList.remove("project__cursor--active");

  return (
    <section className="projects">
      {/* faint divider with a "+" notch, same as the summary section */}
      <div className="projects__rule">
        <span className="projects__plus">+</span>
      </div>

      {/* ---- centred header (matches the reference) ---- */}
      <header
        ref={headerRef}
        className={`projects__header${inView ? " projects__header--in" : ""}`}
      >
        <span className="projects__label">
          <span className="projects__diamond">✦</span> SELECTED WORK
        </span>

        {/* split into letters so they can reveal left-to-right; aria-label
            keeps the title readable for screen readers */}
        <h2 className="projects__title" aria-label={TITLE}>
          {LETTERS.map((ch, i) => (
            <span
              key={i}
              className={`projects__letter${
                ch === " " ? " projects__letter--space" : ""
              }`}
              style={{ animationDelay: `${i * 0.04}s` }}
              aria-hidden="true"
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </h2>

        <p className="projects__subtitle">
          A few products I&apos;ve helped shape, and the thinking behind them.
        </p>
      </header>

      {/* ---- project 01 — full-viewport video showcase ---- */}
      <article className="project">
        <div className="project__frame">
          {/* background loop video */}
          <video
            className="project__bg"
            src="/hero-loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />

          {/* phone mockup, anchored to the screen edge */}
          <img
            className="project__image"
            src="/project1.png"
            alt="Checkout payment screen on a phone"
            draggable="false"
          />

          {/* glass squircle card */}
          <div
            className="project__card"
            ref={cardRef}
            onMouseMove={moveCursor}
            onMouseEnter={showCursor}
            onMouseLeave={hideCursor}
          >
            {/* the arrow that trails the pointer inside the card */}
            <span className="project__cursor" ref={cursorRef} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </span>

            <div className="project__meta">
              <span className="project__num">01</span>
              <span className="project__year">2025</span>
            </div>

            <h3 className="project__title">The checkout, rebuilt for 5M+ homes</h3>

            <div className="project__tags">
              <span className="project__tag">Payments</span>
              <span className="project__tag">iOS &amp; Android</span>
            </div>

            <p className="project__desc">
              A checkout redesign focused on reducing friction, improving payment
              adoption, and supporting over 1M+ monthly transactions.
            </p>

            <a
              className="project__cta"
              href="#"
              onMouseEnter={growCursor}
              onMouseLeave={resetCursor}
            >
              <span className="project__cta-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </span>
              <span className="project__cta-label">View Case Study</span>
            </a>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Projects;
