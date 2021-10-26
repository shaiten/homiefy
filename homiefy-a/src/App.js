import React from 'react'
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Posts from "./components/Posts";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className=".container-fluid justify-content-cente">
          <Route exact path="/home" component={Posts} />
        </div>
      </div>
    </Router>
  );
}

export default App;
