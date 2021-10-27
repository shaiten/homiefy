import "./App.css";

import { BrowserRouter as Router, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Navbar />
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/posts" component={Posts} />
            </Switch>
          </div>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
