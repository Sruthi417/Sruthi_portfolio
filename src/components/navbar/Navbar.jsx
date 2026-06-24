"use client";

import { useEffect, useRef, useState } from "react";
import "./Navbar.scss";

const Navbar = () => {
  // `compact` = collapsed to "SRUTHI •••". Hover re-expands it (handled in CSS).
  const [compact, setCompact] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      // scrolling down (past a little buffer) collapses; scrolling up expands
      if (y > lastY.current && y > 80) {
        setCompact(true);
      } else if (y < lastY.current) {
        setCompact(false);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${compact ? " navbar--compact" : ""}`}>
      <div className="navbar__pill">
        <span className="navbar__brand">SRUTHI</span>

        <ul className="navbar__links">
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#">Resume</a>
          </li>
        </ul>

        {/* shown only in compact mode; hover swaps it back for the links */}
        <span className="navbar__dots" aria-hidden="true">
          •••
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
