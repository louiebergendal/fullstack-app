import { useEffect, useState } from 'react'
import { useMountedRef } from '../../hooks/useMountedRef'
import HamsterForm from '../hamster-form/HamsterForm'

/* 
TODO:

ROUTE:		URL:		FÖRKLARING:
Startsida	/			Förklarar hur man använder appen.
Kamp		/battle		Visa två slumpade hamstrar. 
						Låt användaren välja den sötaste. 
						Visa resultatet och initiera nästa match.
Galleri		/gallery	Visa alla hamstrar som finns i databasen. 
						Från galleriet ska man även kunna lägga till nya hamstrar och ta bort gamla.


Om du inte får bilderna att fungera: skapa mappen img i frontend-mappen public och lägg dem där. /public/img
Så länge bilderna är med i repot kommer de att pushas till Heroku, och tas med när appen byggs.
*/

const Galleri = () => {

	const [hamsters, setHamsters] = useState(null)
	const isMounted = useMountedRef()

	useEffect(() => {
		async function get() {
			console.log('Hämtar hamstrar...');
			
			// Kollar så att komponenten är mountad
			if (isMounted.current) {
				setHamsters(await getHamsters())
			}
		}
		get()
	}, [isMounted])

	async function getHamsters() {
		const response = await fetch('/hamsters', { method: 'GET' })
		return await response.json()
	}

	async function removeHamster(hamsterID) {
		await fetch(`/hamsters/${hamsterID}`, { method: 'DELETE' })
		setHamsters(await getHamsters())
	}

	return (
		<div>
			{hamsters /* Om hamsterarna finns så mapas de ut */
				? hamsters.map(hamster => (
					<div key={hamster.id}>
						{hamster.name}
						<button onClick={() => removeHamster(hamster.id)}>Remove</button>
					</div>
				))
				: 'Hämtar hamstrar från API...'
			}
			<HamsterForm />
		</div>
	)
}

export default Galleri


