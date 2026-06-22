import "./Projects.scss";

const Projects = () => {
  return (
    <section className="projects">
      {/* faint divider with a "+" notch, same as the summary section */}
      <div className="projects__rule">
        <span className="projects__plus">+</span>
      </div>

      {/* ---- centred header (matches the reference) ---- */}
      <header className="projects__header">
        <span className="projects__label">
          <span className="projects__diamond">✦</span> SELECTED WORK
        </span>

        <h2 className="projects__title">check out some of my work</h2>

        <p className="projects__subtitle">
          A few products I&apos;ve helped shape, and the thinking behind them.
        </p>
      </header>

      {/* TODO: project cards/grid go here */}
    </section>
  );
};

export default Projects;
