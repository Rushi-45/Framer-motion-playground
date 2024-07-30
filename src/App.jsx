import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Header from "./components/common/Header";
import "./index.css";
import Home from "./components/pages/Home";

const App = () => {
  return (
    <Router>
      <Header />
      {/* <Home /> */}
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
