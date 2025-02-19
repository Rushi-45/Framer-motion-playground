import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import "./index.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Projects from "./components/pages/Projects";
import Skills from "./components/pages/Skills";
import Contact from "./components/pages/Contact";
import MainCard from "./components/pages/MainCard";

const App = () => {
  return (
    <Router>
      <Header />
      {/* <AnimatedRoutes /> */}
      <section id="home" className="text-center bg-primary text-secondary">
        <Home />
      </section>
      <section id="main" className="text-center bg-primary text-secondary">
        <MainCard />
      </section>
      <section id="about" className="min-h-screen bg-primary">
        <About />
      </section>
      <section id="projects" className="min-h-screen ">
        <Projects />
      </section>
      <section id="skills" className="min-h-screen ">
        <Skills />
      </section>
      <section id="contact" className="min-h-screen ">
        <Contact />
      </section>
    </Router>
  );
};

export default App;
