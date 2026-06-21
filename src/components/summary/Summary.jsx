"use client";

import { useEffect, useRef } from "react";
import "./Summary.scss";

// One sentence — wraps naturally, no manual <br> breaks.
const TEXT =
  "I turn messy, real-world problems into products people actually understand — interfaces that feel obvious, systems that scale, and details that quietly do the work.";

// This word gets the blue brush-script accent.
const ACCENT = "understand";

const WORDS = TEXT.split(" ");

const Summary = () => {
  const textRef = useRef(null);
  // one DOM ref per word so we can update its --fill without re-rendering
  const wordRefs = useRef([]);

  useEffect(() => {
    const reveal = () => {
      const el = textRef.current;
      if (!el) return;

      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      // overall reveal progress as the paragraph scrolls up the viewport:
      // starts when its top hits 80% vh, completes by the time it hits 20% vh
      const start = vh * 0.9;
      const end = vh * 0.2;
      const progress = Math.min(1, Math.max(0, (start - top) / (start - end)));

      // map progress onto the word list so they light up one at a time, in
      // reading order (+ a small tail so the last word lands before the end)
      const lit = progress * (WORDS.length + 2);

      wordRefs.current.forEach((w, i) => {
        if (!w) return;
        const fill = Math.min(1, Math.max(0, lit - i));
        w.style.setProperty("--fill", fill.toFixed(3));
      });
    };

    reveal(); // sync on mount
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    return () => {
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", reveal);
    };
  }, []);

  return (
    <section className="summary">
      <div className="summary__rule">
        <span className="summary__plus">+</span>
      </div>

      <div className="summary__body">
        <span className="summary__label">
          <span className="summary__diamond">✦</span> WHAT I DO
        </span>

        <p className="summary__text" ref={textRef}>
          {WORDS.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className={`summary__word${
                word === ACCENT ? " summary__word--accent" : ""
              }`}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default Summary;
