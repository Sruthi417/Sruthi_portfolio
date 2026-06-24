"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import "./about.scss";

const TITLE = "a little about myself";
const WORDS = TITLE.split(" ");

const About = () => {
  const headingRef = useRef(null);
  // `inView` flips true the first time the heading scrolls into view
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
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="about" id="about">
      {/* faint divider with a "+" notch, same as the other sections */}
      <div className="about__rule">
        <span className="about__plus">+</span>
      </div>

      <div className="about__body">
        {/* heading — moves to the top on mobile */}
        <div
          ref={headingRef}
          className={`about__heading${inView ? " about__heading--in" : ""}`}
        >
          <span className="about__label">
            <span className="about__diamond">✦</span> ABOUT ME
          </span>

          <h2 className="about__title" aria-label={TITLE}>
            {(() => {
              // group letters per word so a word never breaks mid-letter;
              // `n` is a running index across all letters for the stagger.
              let n = 0;
              return WORDS.map((word, wi) => (
                <Fragment key={wi}>
                  <span className="about__word" aria-hidden="true">
                    {word.split("").map((ch, ci) => (
                      <span
                        key={ci}
                        className="about__letter"
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
        </div>

        {/* tilted polaroid photo */}
        <div className="about__photo">
          <div className="about__polaroid">
            <img
              className="about__img"
              src="/aboutMe.png"
              alt="Portrait of Sruthi"
              draggable="false"
            />
          </div>
        </div>

        {/* body copy + signature */}
        <div className="about__detail">
          <p className="about__text">
            My journey into design started long before product design. I began
            with graphic design at a young age, spending years experimenting with
            Photoshop, branding projects, and freelance work. During college, I
            worked part-time designing websites, emails, and social media
            campaigns, which helped me build a strong foundation across different
            areas of design.
          </p>

          <p className="about__text">
            Today, I work on consumer and enterprise products, where I enjoy
            turning complex workflows into experiences that feel simple and
            intuitive. I&apos;m particularly drawn to problems that sit at the
            intersection of user needs, business goals, and technical constraints.
          </p>

          <span className="about__signature">Sruthi.</span>
        </div>
      </div>
    </section>
  );
};

export default About;
