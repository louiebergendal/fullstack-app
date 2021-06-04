import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Start from './components/start/Start'
import Kamp from './components/kamp/Kamp'
import Galleri from './components/gallery/Gallery'

/*
	TODO:
		- Den gula varningen (recursivelyGetVillainousHamster)
		- Router i "start" skapar en gul varning, trots att den används
		- Har jag missat något annat?
	SETUP:
		- Stå i projektmappen	
			"npm run build"
			"node backend/server.js" - backend
			"npm run start" - frontend
*/

function App() {
	return (
		<Router>
		<div className="App">
			<header className="App-header">
				<nav>
					<Link to="/"> starting </Link>
					<Link to="/battle"> kamp </Link>
					<Link to="/gallery"> galleri </Link>
				</nav>
			</header>
			<main>
				<Switch>
					<Route path="/gallery"> {<Galleri />} </Route>
					<Route path="/battle"> {<Kamp />} </Route>
					<Route path="/"> {<Start />} </Route>
				</Switch>
			</main>
		</div>
		</Router>
	);
}

export default App;
