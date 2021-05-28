import { useState } from 'react'

const HamsterForm = () => {
	const [inputName, setInputName] = useState('default')
	const [inputAge, setInputAge] = useState(0)
	const [inputFavFood, setInputFavFood] = useState('default')
	const [inputLoves, setInputLoves] = useState('default')
	const [inputImgName, setInputImgName] = useState('default')
	const [wins] = useState(0)
	const [defeats] = useState(0)
	const [games, setGames] = useState(0)

	async function postHamster() {

		console.log('POST HAMSTER');

		// ======= VALIDERING ======= //
		if (inputName.length === 0) {
			console.log('Each contestor needs to have a name!');
			return
		}
		if (inputFavFood.length === 0) {
			console.log('Each contestor needs to have a favourite food!');
			return
		}
		if (inputLoves.length === 0) {
			console.log('Each contestor must love something!');
			return
		}

		setGames(wins + defeats)

		const formData = {
			'name': inputName,
			'age': Number(inputAge),
			'favFood': inputFavFood,
			'loves': inputLoves,
			'imgName': inputImgName,
			'wins': wins,
			'defeats': defeats,
			'games': games
		}

		// Skickar den nya hamstern till APIet som skickar den vidare till databasen (Firestore) 
		await fetch(`/hamsters`, { 
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData) 
		})
	}

	return (
		<section>
			<div>
				<label> 
					Name:
					<input onChange={event => {
							setInputName(event.target.value)// <--- Här styr jag inputfältet
							// EXEMPEL: setInputName(event.target.value.toUpperCase())
						}}
						value={inputName}
					/>
				</label>
			</div>
			<div>
				<label> 
					Age:
					<input onChange={event => {
							if (event.target.value >= 0) {
								setInputAge(event.target.value)	
							}
						}}
						value={inputAge}
					/>
				</label>
			</div>
			<div>
				<label> 
					Favourite food:
					<input onChange={event => {
							console.log('Controlled change', event.target.value)
							setInputFavFood(event.target.value)
						}}
						value={inputFavFood}
					/>
				</label>
			</div>
			<div>
				<label> 
					Loves:
					<input onChange={event => {
							console.log('Controlled change', event.target.value)
							setInputLoves(event.target.value)
						}}
						value={inputLoves}
					/>
				</label>
			</div>
			
			<button onClick={postHamster}> post hamster </button>

		</section>
	)
}
export default HamsterForm
