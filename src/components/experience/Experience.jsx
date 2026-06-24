"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import "./Experience.scss";

const TITLE = "the journey so far";
const WORDS = TITLE.split(" ");

const Experience = () => {
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
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="experience">
      {/* faint divider with a "+" notch, same as the other sections */}
      <div className="experience__rule">
        <span className="experience__plus">+</span>
      </div>

      {/* ---- centred header (matches the projects section) ---- */}
      <header
        ref={headerRef}
        className={`experience__header${
          inView ? " experience__header--in" : ""
        }`}
      >
        <span className="experience__label">
          <span className="experience__diamond">✦</span> EXPERIENCE
        </span>

        <h2 className="experience__title" aria-label={TITLE}>
          {(() => {
            // Group letters per word so a word never breaks mid-letter — only
            // the spaces between words are line-break points. `n` is a running
            // index across all letters for the reveal stagger.
            let n = 0;
            return WORDS.map((word, wi) => (
              <Fragment key={wi}>
                <span className="experience__word" aria-hidden="true">
                  {word.split("").map((ch, ci) => (
                    <span
                      key={ci}
                      className="experience__letter"
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

        <p className="experience__subtitle">
          From healthcare SaaS to insurance to community tech — four roles
          across two years, and counting.
        </p>
      </header>
    </section>
  );
};

export default Experience;
