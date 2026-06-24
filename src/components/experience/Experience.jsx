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

      {/* ---- experience card (no timeline — slanted card alone) ---- */}
      <div className="experience__cards">
        <article className="exp-card">
          {/* role header: logo · title/company · location */}
          <div className="exp-card__head">
            <img
              className="exp-card__logo"
              src="/comp-logo.svg"
              alt="Mygate logo"
              draggable="false"
            />

            <div className="exp-card__role">
              <h3 className="exp-card__title">Product Designer</h3>
              <p className="exp-card__company">Mygate</p>
            </div>

            <span className="exp-card__location">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
                />
              </svg>
              Bengaluru, KA
            </span>
          </div>

          {/* responsibilities */}
          <ul className="exp-card__points">
            <li>
              Own <strong>end to end product design</strong> across Resident
              App, ERP, Payments, Helpdesk, and Smart Devices.
            </li>
            <li>
              Led the design and launch of <strong>QuickPass</strong>, now used
              across 500+ societies with 28,000+ downloads.
            </li>
            <li>
              Redesigned the <strong>Helpdesk ecosystem</strong> and contributed
              to large scale payments and access control experiences.
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Experience;
