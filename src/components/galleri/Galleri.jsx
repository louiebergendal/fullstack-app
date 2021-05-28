import { useEffect, useState } from 'react'
import { useMountedRef } from '../../hooks/useMountedRef'
import HamsterForm from '../hamster-form/HamsterForm'
import './Galleri.css'

/* 
	TODO:
		Galleri
		Här ska appen visa alla hamstrars namn och bild, i ett CSS grid.

		Man ska kunna ta bort en hamster från galleriet.

		Man ska kunna lägga till en ny hamster via ett formulär. 
		Formuläret ska använda validering.

		Tänk på att inte visa för mycket information direkt. 
		Låt användaren klicka/hovra över en bild för att visa mer information.
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
		<section className='gallery'>
			{hamsters /* Om hamsterarna finns så mapas de ut */
				? hamsters.map(hamster => (

					<div key={hamster.id}>
						<p>{hamster.name}</p>
						<img src={`img/${hamster.imgName}`} alt="hamster" /> {/* om den blir "alt" så vill jag välja bild */}
						<button onClick={() => removeHamster(hamster.id)}>Remove</button>
					</div>

				))
				: 'Hämtar hamstrar från API...'
			}
			<HamsterForm />
		</section>
	)
}

export default Galleri


