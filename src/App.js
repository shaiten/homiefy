import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Market from "./components/Market"
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Route exact path="/home" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/market" component={Market} />
        </div>
      </div>
    </Router>
  );
}

export default App;
