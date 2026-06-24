"use client";

import "./about.scss";

const About = () => {
  return (
    <section className="about">
      {/* faint divider with a "+" notch, same as the other sections */}
      <div className="about__rule">
        <span className="about__plus">+</span>
      </div>

      <div className="about__body">
        {/* heading — moves to the top on mobile */}
        <div className="about__heading">
          <span className="about__label">
            <span className="about__diamond">✦</span> ABOUT ME
          </span>

          <h2 className="about__title">a little about myself</h2>
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
