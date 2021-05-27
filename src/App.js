import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Start from './components/start/Start'
import Kamp from './components/kamp/Kamp'
import Galleri from './components/galleri/Galleri'

/*
	FUNDERINGAR:
	
	Det känns som att jag inte använder det tänkta systemet.
	Jag vill anväda db.collections från frontend.

	skillnaden
	Hu använder man db.collection-metoden?
		när är den tänkt att användas?
	
	
	Varför förstår fetch url:en /hamsters?

	massPost:
	async function postHamster(hamster) {
		db.collection('hamsters').add(hamster)
	}

	fetch:
	async function getHamsters() {
		const response = await fetch('/hamsters', { method: 'GET' })
		return await response.json() /
	}





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
					<Link to="/"> starting page </Link>
					<Link to="/kamp"> kamp page </Link>
					<Link to="/galleri"> Galleri page </Link>
				</nav>
			</header>
			<main>

				<Switch>
					<Route path="/kamp"> {<Kamp />} </Route>
					<Route path="/galleri"> {<Galleri />} </Route>
					<Route path="/"> {<Start />} </Route>
				</Switch>

			</main>
		</div>
		</Router>
	);
}

export default App;
