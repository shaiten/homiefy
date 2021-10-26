import React from 'react'
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className=".container-fluid justify-content-cente">
          <Route exact path="/home" component={Home} />
        </div>
      </div>
    </Router>
  );
}

export default App;
