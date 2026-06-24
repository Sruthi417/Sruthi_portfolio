"use client";

import { useState } from "react";
import "./Footer.scss";

// the word that swaps in the headline: rises in, holds, rises out, next.
const ROTATING = ["create", "design", "build"];

// TODO: swap these for the real handles/address
const EMAIL = "sruthi@example.com";
const LINKEDIN_URL = "https://www.linkedin.com/";
const GITHUB_URL = "https://github.com/";

const Footer = () => {
  // index of the word currently shown in the rotator
  const [word, setWord] = useState(0);

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* headline with the rotating verb */}
        <h2 className="footer__title">
          <span className="footer__title-line">
            lets{" "}
            <span className="footer__rotator">
              <span
                key={word}
                className="footer__word"
                onAnimationEnd={() =>
                  setWord((i) => (i + 1) % ROTATING.length)
                }
              >
                {ROTATING[word]}
              </span>
            </span>
          </span>
          <span className="footer__title-line">incredible work together.</span>
        </h2>

        {/* contact row */}
        <div className="footer__contact">
          <div className="footer__col">
            <span className="footer__col-label">Email</span>
            <a className="footer__email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>

          <div className="footer__col">
            <span className="footer__col-label">Social</span>
            <div className="footer__socials">
              <a
                className="footer__social"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9V9Z"
                  />
                </svg>
              </a>

              <a
                className="footer__social"
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
                  />
                </svg>
              </a>

              <a
                className="footer__social"
                href={`mailto:${EMAIL}`}
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.01L4.4 7h15.2L12 12.01ZM4 8.24V17h16V8.24l-8 5.26-8-5.26Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__foot">
          <p className="footer__copy">© 2026 Sruthi</p>
        </div>
      </div>

      {/* giant background watermark name */}
      <span className="footer__watermark" aria-hidden="true">
        SRUTHI
      </span>
    </footer>
  );
};

export default Footer;
