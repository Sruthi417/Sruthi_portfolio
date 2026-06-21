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
  // one DOM ref per word so we can update its --fill without re-rendering
  const wordRefs = useRef([]);

  useEffect(() => {
    const reveal = () => {
      const vh = window.innerHeight;
      // words below `start` (lower on screen) are grey; once they rise above
      // `end` they're fully black. Between, they fade word-by-word as you scroll.
      const start = vh * 0.82;
      const end = vh * 0.5;

      for (const el of wordRefs.current) {
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        const fill = Math.min(1, Math.max(0, (start - top) / (start - end)));
        el.style.setProperty("--fill", fill.toFixed(3));
      }
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

        <p className="summary__text">
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
