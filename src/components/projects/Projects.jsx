"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import "./Projects.scss";

const TITLE = "check out some of my work";
const WORDS = TITLE.split(" ");

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

  // ---- smooth scroll (Lenis) + receding-deck depth (GSAP ScrollTrigger) ----
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const [{ gsap }, { ScrollTrigger }, Lenis] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis").then((m) => m.default),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      // Lenis smooths the NATIVE scroll (navbar + summary keep working).
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      // Cards pin/stack via CSS sticky. As the NEXT card rises over a card,
      // scrub that card's frame smaller (origin: top) so it stays pinned at the
      // top, peeks ABOVE the new card, and insets from the sides — a real deck
      // building up, with each new card resting OUTSIDE the previous one.
      //
      // The recede is PROGRESSIVE: the deepest card (i=0) shrinks most, and each
      // newer card shrinks a little less — so a card always has LESS inline
      // padding than the one behind it (the fanned deck in reference #2).
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray(".project");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          const frame = card.querySelector(".project__frame");
          // 0.90, 0.925, 0.95, 0.975 … → uniform 0.025 step up to the full
          // front card (scale 1), so each card sits wider than the one behind.
          const scaleTo = 0.9 + i * 0.025;
          gsap.fromTo(
            frame,
            { scale: 1 },
            {
              scale: scaleTo,
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top bottom", // next card just enters from below
                // finish receding when the next card reaches its pinned stop
                // (its sticky offset), not the very top of the viewport
                end: "top top",
                scrub: true,
              },
            }
          );
        });
      }, stackRef);

      ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        ctx.revert();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section className="projects" id="work">
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
          {(() => {
            // Group letters per word so a word never breaks mid-letter — only
            // the (breakable) spaces between words are line-break points. `n`
            // is a running index across all letters for the reveal stagger.
            let n = 0;
            return WORDS.map((word, wi) => (
              <Fragment key={wi}>
                <span className="projects__word" aria-hidden="true">
                  {word.split("").map((ch, ci) => (
                    <span
                      key={ci}
                      className="projects__letter"
                      style={{ animationDelay: `${n++ * 0.04}s` }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
                {wi < WORDS.length - 1 ? " " : null}
              </Fragment>
            ));
          })()}
        </h2>

        <p className="projects__subtitle">
          {/* A few products I&apos;ve helped shape, and the thinking behind them. */}
          A few projects I&apos;ve built and contributed to, with the thinking behind them.
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
