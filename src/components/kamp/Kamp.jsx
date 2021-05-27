
import { useEffect, useState } from 'react'
import { useMountedRef } from '../../hooks/useMountedRef'

/* 
TODO:
	Visa alla hamstrar som finns i databasen. 
	Från galleriet ska man även kunna lägga till nya hamstrar och ta bort gamla.
		- Hämta all hamsterdata (som i start)
		- Lista datan sorterat efter hamster (med tillhörande bild)
		- Varje hamster ska ha en delete-knapp
		- På sidan ska det finnas en knapp för att lägga till en hamster (formulär)
	Forsla datan upp i global space. Använd Context. Se lektionsfilmen.

ROUTE:		URL:		FÖRKLARING:
Startsida	/			Förklarar hur man använder appen.
Kamp		/battle		Visa två slumpade hamstrar. 
						Låt användaren välja den sötaste. 
						Visa resultatet och initiera nästa match.
Galleri		/gallery	Visa alla hamstrar som finns i databasen. 
						Från galleriet ska man även kunna lägga till nya hamstrar och ta bort gamla.
*/

const Kamp = () => {
	const [hamsterHero, setHamsterHero] = useState(null)
	const [hamsterVillain, setHamsterVillain] = useState(null)
	const [newMatchInitiator, setNewMatchInitiator] = useState(false) // ser till att useEffect körs varje gång någon förlorar

	const isMounted = useMountedRef()
	const defaultString = 'Awaiting champion...'

	useEffect(() => {
		async function get() {

			// Hämtar kombatanter från backend
			const heroHamster = await getRandomHamster()
			const villainHamster = await recursivelyGetVillainousHamster(heroHamster)

			// Kollar så att komponenten är mountad
			if (isMounted.current) {
				setHamsterHero(heroHamster)
				setHamsterVillain(villainHamster)
			}
		}
		get() // Funktionen kallar på sig själv
	},	[isMounted, newMatchInitiator])

	// ======= FUNKTIONS-DEKLARATIONER ======= //
	async function declareWinner(winnerID, looserID) {
		await fetch(`/hamsters/${winnerID}/win`, { method: 'PUT' })
		await fetch(`/hamsters/${looserID}/lose`, { method: 'PUT' })
		setNewMatchInitiator(!newMatchInitiator)
	}	

	async function getRandomHamster() {
		const response = await fetch('/hamsters/random', { method: 'GET' })
		const hamster = await response.json()
		return hamster
	}

	async function recursivelyGetVillainousHamster(heroHamster) {
		let villainHamsterCandidate = await getRandomHamster()
	
		if (heroHamster.id === villainHamsterCandidate.id) {
			await recursivelyGetVillainousHamster(heroHamster);
		} else {
			return villainHamsterCandidate;
		}
	}

	// ======= RETURN ETC ======= //
	return (
		<div>
			<button onClick={()=> declareWinner(hamsterHero.id, hamsterVillain.id)}>{hamsterHero ? hamsterHero.name : defaultString}</button>
			<br />VS<br />
			<button onClick={()=> declareWinner(hamsterVillain.id, hamsterHero.id)}>{hamsterVillain ? hamsterVillain.name : defaultString}</button>
		</div>
	)
}
export default Kamp

