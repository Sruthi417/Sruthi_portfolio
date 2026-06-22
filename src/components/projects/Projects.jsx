"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import "./Projects.scss";

const TITLE = "check out some of my work";
const LETTERS = TITLE.split("");

// Same content 5× for now — swap each entry's title/desc/tags/image/year
// when the real projects are ready.
const PROJECTS = [
  {
    num: "01",
    year: "2025",
    title: "The checkout, rebuilt for 5M+ homes",
    tags: ["Payments", "iOS & Android"],
    desc: "A checkout redesign focused on reducing friction, improving payment adoption, and supporting over 1M+ monthly transactions.",
    image: "/project1.png",
  },
  {
    num: "02",
    year: "2025",
    title: "The checkout, rebuilt for 5M+ homes",
    tags: ["Payments", "iOS & Android"],
    desc: "A checkout redesign focused on reducing friction, improving payment adoption, and supporting over 1M+ monthly transactions.",
    image: "/project1.png",
  },
  {
    num: "03",
    year: "2025",
    title: "The checkout, rebuilt for 5M+ homes",
    tags: ["Payments", "iOS & Android"],
    desc: "A checkout redesign focused on reducing friction, improving payment adoption, and supporting over 1M+ monthly transactions.",
    image: "/project1.png",
  },
  {
    num: "04",
    year: "2025",
    title: "The checkout, rebuilt for 5M+ homes",
    tags: ["Payments", "iOS & Android"],
    desc: "A checkout redesign focused on reducing friction, improving payment adoption, and supporting over 1M+ monthly transactions.",
    image: "/project1.png",
  },
  {
    num: "05",
    year: "2025",
    title: "The checkout, rebuilt for 5M+ homes",
    tags: ["Payments", "iOS & Android"],
    desc: "A checkout redesign focused on reducing friction, improving payment adoption, and supporting over 1M+ monthly transactions.",
    image: "/project1.png",
  },
];

const Projects = () => {
  const headerRef = useRef(null);
  const stackRef = useRef(null);
  // `inView` flips true the first time the header scrolls into view
  const [inView, setInView] = useState(false);

  // ---- header reveal ----
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ---- smooth scroll (Lenis) so the cards slide and stack buttery-smooth ----
  useEffect(() => {
    let cancelled = false;
    let lenis;
    let rafId;

    (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;

      // Lenis smooths the NATIVE scroll, so window scroll (navbar + summary)
      // keeps working. The cards stack via CSS `position: sticky`.
      lenis = new Lenis();
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
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

      {/* ---- stacking project cards ---- */}
      <div className="projects__stack" ref={stackRef}>
        {PROJECTS.map((p, i) => (
          <ProjectCard project={p} index={i} key={p.num} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
