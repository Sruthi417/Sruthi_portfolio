import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      {/* z-0 — looping boomerang sky video */}
      <video
        className="hero__video"
        src="/hero-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* z-1 — figure sitting on the wall, anchored bottom-right */}
      <img
        className="hero__figure"
        src="/herome.png"
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      {/* z-2 — white fog fading the wall into white at the bottom */}
      <div className="hero__fog" />
    </section>
  );
};

export default Hero;
