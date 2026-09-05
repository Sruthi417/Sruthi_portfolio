"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import "./Skill.scss";

const TITLE = "What I work with";
const WORDS = TITLE.split(" ");

const skills = [
  "/logo1.webp",
  "/logo2.webp",
  "/logo3.webp",
  "/logo4.webp",
  "/logo5.webp",
  "/logo6.webp",
  "/logo7.webp",
  "/logo8.webp",
  "/logo9.webp",
  "/logo10.webp",
  "/logo11.webp",
  "/logo12.webp",
  "/logo13.webp",
];

const Skills = () => {
  const headingRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = headingRef.current;

    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      {
        threshold: 0.4,
      },
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return (
    <section className="skills" id="skills">
      {/* Section divider */}
      <div className="skills__rule">
        <span className="skills__plus">+</span>
      </div>

      <div className="skills__body">

        {/* Heading */}
        <div
          ref={headingRef}
          className={`skills__heading${
            inView ? " skills__heading--in" : ""
          }`}
        >
          <span className="skills__label">
            <span className="skills__diamond">✦</span>
            SKILLS
          </span>

          <h2
            className="skills__title"
            aria-label={TITLE}
          >
            {WORDS.map((word, wi) => (
              <Fragment key={wi}>
                <span
                  className="skills__word"
                  aria-hidden="true"
                >
                  {word.split("").map((ch, ci) => {
                    const letterIndex =
                      WORDS
                        .slice(0, wi)
                        .reduce(
                          (total, currentWord) =>
                            total + currentWord.length,
                          0,
                        ) + ci;

                    return (
                      <span
                        key={ci}
                        className="skills__letter"
                        style={{
                          animationDelay: `${
                            letterIndex * 0.04
                          }s`,
                        }}
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>

                {wi < WORDS.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h2>

          <p className="skills__description">
            Technologies and tools I use to build thoughtful,
            functional web experiences.
          </p>
        </div>

        {/* Character / animation */}
        <div className="skills__character">
          <video
            className="skills__video"
            src="/skill.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Skill logos */}
        <div className="skills__stack">

          {/* First row */}
          <div className="skills__row skills__row--top">
            {skills.slice(0, 7).map((skill, index) => (
              <div
                className="skills__card"
                key={index}
              >
                <div className="skills__logo">
                  <img
                    src={skill}
                    alt=""
                    draggable="false"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Second row */}
          <div className="skills__row skills__row--bottom">
            {skills.slice(7).map((skill, index) => (
              <div
                className="skills__card"
                key={index}
              >
                <div className="skills__logo">
                  <img
                    src={skill}
                    alt=""
                    draggable="false"
                  />
                </div>
      
              </div>
            ))}
          </div>

        </div>
      </div>
     <div className="skills__rule skills__rule--end">
        <span className="skills__plus">+</span>
      </div>

    </section>
  );
};

export default Skills;