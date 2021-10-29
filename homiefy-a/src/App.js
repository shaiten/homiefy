import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Profiles from "./components/Profiles";
import Contact from "./components/Contact";

function App() {
	return (
		<Router>
			<div className="App">
				<AuthProvider>
					<Navbar />
					<div className="container">
						<Switch>
							<PrivateRoute exact path="/posts" component={Posts} />
							<PrivateRoute exact path="/profiles" component={Profiles} />
							<Route exact path="/contact" component={Contact} />
						</Switch>
					</div>
				</AuthProvider>
			</div>
		</Router>
	);
}

export default App;
