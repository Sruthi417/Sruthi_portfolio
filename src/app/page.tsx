import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import Summary from "../components/summary/Summary";
import About from "../components/about/about";
import Projects from "../components/projects/Projects";
import Experience from "../components/experience/Experience";


const Portfolio = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Summary />
      
      <Projects />
      <About/>
      <Experience />
    </div>
  );
};

export default Portfolio;
