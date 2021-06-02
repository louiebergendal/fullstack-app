import { useEffect, useState } from 'react'
import { useMountedRef } from '../../hooks/useMountedRef'
/* import { Link } from 'react-router-dom'; */
import HamsterCard from '../hamster-card/HamsterCard'
import HamsterForm from '../hamster-form/HamsterForm'
import InfoBox from '../info-box/InfoBox'
import './Gallery.css'

/* 
	TODO:
		Galleri
		Här ska appen visa alla hamstrars namn och bild, i ett CSS grid.

		Man ska kunna ta bort en hamster från galleriet.

		Man ska kunna lägga till en ny hamster via ett formulär. 
		Formuläret ska använda validering.

		Tänk på att inte visa för mycket information direkt. 
		Låt användaren klicka/hovra över en bild för att visa mer information.



	Route till hamster/id
		Komponent som laddas vid den routen
			logga hela hamster-objektet onMount


			ELLER:
				Gör som i galleri, men hämta bara en hamster
				Vilken hamster? Kan jag skicka med id?


*/

const Gallery = () => {
	const [selectedHamster, setSelectedHamster] = useState(null)
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

	// Hämta hamstrar från databas
	async function getHamsters() {
		const response = await fetch('/hamsters', { method: 'GET' })
		return await response.json()
	}

	// Ta bort hamster
	async function removeHamster(hamsterID) {
		await fetch(`/hamsters/${hamsterID}`, { method: 'DELETE' })
		setHamsters(await getHamsters())
	}

	// Ska öppna popup? eller egen route?
	function checkInfo(hamster) {
		setSelectedHamster(hamster)
	}



	return (
		<div>
			{selectedHamster ? 
				/* Om en hamster är klickad så visas info-rutan */
				<InfoBox hamster={selectedHamster}/>
				: 
				/* Annars visas galleriet */
				<section className='gallery'>
					{hamsters /* Om hamsterarna finns så mapas de ut */
					? hamsters.map(hamster => (
						<div key={hamster.id} className='gallery-item' onClick={() => checkInfo(hamster)}>
							
							<HamsterCard hamster={hamster} />

							<button onClick={() => removeHamster(hamster.id)}>Remove</button>

							{/*  */}
							{/* <Link to={`/gallery/${hamster.id}`}>gallery</Link> */}

						</div>
					))
					: 'Hämtar hamstrar från API...'
					}
				
					<HamsterForm />

				</section>	
			}
		</div>
	)
}

export default Gallery


