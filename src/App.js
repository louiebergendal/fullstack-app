import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
		<div className="App">
			<header className="App-header">
				<nav>
					<Link to="/"> starting page </Link>
					<Link to="/annan"> annan page </Link>
				</nav>
			</header>
			<main>

				<Switch>
					<Route path="/annan"> I AM ANNAN </Route>
					<Route path="/"> I AM START </Route>
				</Switch>

			</main>
		</div>
		</Router>
	);
}

export default App;
