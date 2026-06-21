import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";

const Portfolio = () => {
  return (
    <div>
      <Navbar />
      <Hero />

      {/* placeholder next section — lets the navbar shrink on scroll.
          Replace with the real Work/About sections later. */}
      <section
        style={{
          minHeight: "100vh",
          background: "#ffffff",
        }}
      />
    </div>
  );
};

export default Portfolio;
