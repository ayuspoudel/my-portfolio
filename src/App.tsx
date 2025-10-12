import Navbar from "./components/Navbar";
import SidebarSocial from "./components/SidebarSocial";
import SidebarEmail from "./components/SidebarEmail";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Automation from "./components/Automation";

function App() {
  return (
    <>
      <Navbar />
      <SidebarSocial />
      <SidebarEmail />

      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="automation">
          <Automation />
        </section>
      </main>
    </>
  );
}

export default App;
