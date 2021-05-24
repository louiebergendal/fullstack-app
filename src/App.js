import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

/*
	TO DO:
		- Kolla alla filmerna (1 - 4 på skrivbordet)
			x film 1 - basic app med frontend-routing
			- film 2 - kopiera backend (23:26)
			- film 3
			- film 4

	PÅMÅNDAG:
		- Fixa globalspace


	SETUP:
		- Stå i projektmappen	
			"npm run build"
			"node backend/server.js" - backend
			"npm run start" - frontend


	BAJS:
		- Jag pushade till Heroku, innan jag lagt till en private key.
		- Jag hittar ingen private key.
		- Hur skaffar jag en private key?
		- Jag testade med den gamla
*/

function App() {
	return (
		<Router>
		<div className="App">
			<header className="App-header">
				<nav>
					<Link to="/"> starting page </Link>
					<Link to="/annan"> annan page </Link>
					<Link to="/hamsters"> annan page </Link>
				</nav>
			</header>
			<main>

				<Switch>
					<Route path="/annan"> I AM ANNAN </Route>
					<Route path="/"> I AM START </Route>
					<Route path="/hamsters"> I AM START </Route>
				</Switch>

			</main>
		</div>
		</Router>
	);
}

export default App;
