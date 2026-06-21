"use client";

import { useEffect, useState } from "react";
import "./Navbar.scss";

const Navbar = () => {
  // `compact` = we've scrolled past the hero into the next section.
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // shrink once most of the first (hero) section has scrolled away
      setCompact(window.scrollY > window.innerHeight * 0.7);
    };

    onScroll(); // sync on mount (e.g. refresh while scrolled)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${compact ? " navbar--compact" : ""}`}>
      <div className="navbar__pill">
        <span className="navbar__brand">SRUTHI</span>

        <ul className="navbar__links">
          <li>
            <a href="#">Work</a>
          </li>
          <li>
            <a href="#">About</a>
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
