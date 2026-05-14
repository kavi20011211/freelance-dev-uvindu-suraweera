import { useEffect } from "react";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import Hero from "./sections/Hero";
import ProjectShowCase from "./sections/ProjectShowCase";
import ToolSection from "./sections/ToolSection";

function App() {
  // useEffect(() => {
  //   const handleScroll = () => {
  //     console.log("Current vertical scroll:", window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // Cleanup
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  return (
    <>
      <Hero />
      <ProjectShowCase />
      <AboutSection />
      <ToolSection />
      <ContactSection />
    </>
  );
}

export default App;
