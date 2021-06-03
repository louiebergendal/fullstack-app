import './Start.css'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
/* 
TODO:
	Nu når jag hamsterdatan på ett rimligt sätt.
	Jag använder start som trashcan i början.
	
	Forsla datan upp i global space. Använd Context. Se lektionsfilmen.


ROUTE:		URL:		FÖRKLARING:
Startsida	/			Förklarar hur man använder appen.
Tävla		/battle		Visa två slumpade hamstrar. Låt användaren välja den sötaste. Visa resultatet och initiera nästa match.
Galleri		/gallery	Visa alla hamstrar som finns i databasen. Från galleriet ska man även kunna lägga till nya hamstrar och ta bort gamla.

*/
const Start = () => {

	return (
		<div className='wrapper'>
			<section className='start'>
				<h2> </h2>
				<h1>Hamsterduellen</h1>
				<p>
					Vissa hamstrar får mat och kärlek, andra inte.<br/><br/>
					Klicka på den hamster som är sötast!<br/>
				</p>

				<Link to="/battle"> Nu kör vi! </Link>
			</section>

			<div className='filler'></div>
		</div>
	)
}

export default Start