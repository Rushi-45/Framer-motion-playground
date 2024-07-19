import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Header from "./components/common/Header";
import "./index.css";
import ParallaxEffect from "./components/common/ParallaxEffect";

const App = () => {
  return (
    <Router>
      <Header />
      <ParallaxEffect />
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
