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

	// Öppnar infolådan
	function openInfoBox(hamster) {
		setSelectedHamster(hamster)
	}

	// Stänger infolådan
	function closeInfoBox() {
		setSelectedHamster(null)
	}

	return (
		<div>

			{/* Om man har selectat en hamster så mörkläggs allt bakom InfoBox */}
			{selectedHamster ? 
				<div>

					{/* Om man klickar på mörkret så slopas selectionen och mörkret stängs */}
					<div className='darkness' onClick={() => closeInfoBox()}></div>

					{/* Själva infolådan */}
					<InfoBox hamster={selectedHamster}/>

				</div>
			: ''
			}

			<section className='gallery'>
				{hamsters /* Om hamsterarna finns så mapas de ut */
				? hamsters.map(hamster => (

					<div key={hamster.id} className='gallery-item' onClick={() => openInfoBox(hamster)}>
						<p>{hamster.name}</p>
						<HamsterCard hamster={hamster} />
						
						{/* "e.stopPropagation()" gör så att man kan klicka på knappen, fastän parent har onClick.*/}
						<button onClick={(e) => {e.stopPropagation(); removeHamster(hamster.id)} }>Remove</button>

					</div>
				))
				: 'Hämtar hamstrar från API...'
				}
			</section>

			<HamsterForm />
			
		</div>
	)
}

export default Gallery


