import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import "./index.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Projects from "./components/pages/Projects";
import Skills from "./components/pages/Skills";
import Contact from "./components/pages/Contact";

const App = () => {
  return (
    <Router>
      <Header />
      {/* <Home /> */}
      {/* <AnimatedRoutes /> */}
      <Header />
      <section id="home" className="min-h-screen bg-primary">
        <Home />
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
