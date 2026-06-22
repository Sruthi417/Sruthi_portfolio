"use client";

import { useRef } from "react";

/* A single full-viewport project card. Cursor logic is per-card so each
   stacked card has its own arrow follower. */
const ProjectCard = ({ project, index = 0 }) => {
  const cardRef = useRef(null);
  const cursorRef = useRef(null);

  const moveCursor = (e) => {
    const card = cardRef.current;
    const cur = cursorRef.current;
    if (!card || !cur) return;
    const r = card.getBoundingClientRect();
    cur.style.transform = `translate(${e.clientX - r.left}px, ${
      e.clientY - r.top
    }px) translate(-50%, -50%)`;
  };
  const showCursor = () =>
    cursorRef.current?.classList.add("project__cursor--on");
  const hideCursor = () =>
    cursorRef.current?.classList.remove("project__cursor--on");
  const growCursor = () =>
    cursorRef.current?.classList.add("project__cursor--active");
  const resetCursor = () =>
    cursorRef.current?.classList.remove("project__cursor--active");

  return (
    <article className="project" style={{ "--i": index }}>
      <div className="project__frame">
        <video
          className="project__bg"
          src="/hero-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

        <img
          className="project__image"
          src={project.image}
          alt={project.title}
          draggable="false"
        />

        <div
          className="project__card"
          ref={cardRef}
          onMouseMove={moveCursor}
          onMouseEnter={showCursor}
          onMouseLeave={hideCursor}
        >
          <span className="project__cursor" ref={cursorRef} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </span>

          <div className="project__meta">
            <span className="project__num">{project.num}</span>
            <span className="project__year">{project.year}</span>
          </div>

          <h3 className="project__title">{project.title}</h3>

          <div className="project__tags">
            {project.tags.map((tag) => (
              <span className="project__tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <p className="project__desc">{project.desc}</p>

          <a
            className="project__cta"
            href="#"
            onMouseEnter={growCursor}
            onMouseLeave={resetCursor}
          >
            <span className="project__cta-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
            <span className="project__cta-label">View Case Study</span>
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
