"use client";

import { useEffect, useRef, useState } from "react";
import "./Projects.scss";

const TITLE = "check out some of my work";
const LETTERS = TITLE.split("");

const Projects = () => {
  const headerRef = useRef(null);
  // `inView` flips true the first time the header scrolls into view
  const [inView, setInView] = useState(false);

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
              {ch === " " ? " " : ch}
            </span>
          ))}
        </h2>

        <p className="projects__subtitle">
          A few products I&apos;ve helped shape, and the thinking behind them.
        </p>
      </header>

      {/* TODO: project cards/grid go here */}
    </section>
  );
};

export default Projects;
