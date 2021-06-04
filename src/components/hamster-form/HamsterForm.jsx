import { useState } from 'react'
import './HamsterForm.css'

const HamsterForm = () => {
	const [inputName, setInputName] = useState('')
	const [inputAge, setInputAge] = useState('')
	const [inputFavFood, setInputFavFood] = useState('')
	const [inputLoves, setInputLoves] = useState('')
	const [inputImgName, setInputImgName] = useState('')
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

		// Räknar ut games
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
		<section className='hamster-form'>
				<label> 
					<p>Name:</p>	
					<input onChange={event => {
							setInputName(event.target.value)// <--- Här styr jag inputfältet
							// EXEMPEL: setInputName(event.target.value.toUpperCase())
						}}
						value={inputName}
					/>
				</label>
				<label> 
					<p>Age:</p>	
					<input onChange={event => {
							if (event.target.value >= 0) {
								setInputAge(event.target.value)
							}
						}}
						value={inputAge}
					/>
				</label>
				<label> 
					<p>Favourite food:</p>
					<input onChange={event => {
							setInputFavFood(event.target.value)
						}}
						value={inputFavFood}
					/>
				</label>
				<label> 
					<p>Loves:</p>
					<input onChange={event => {
							setInputLoves(event.target.value)
						}}
						value={inputLoves}
					/>
				</label>
				<label> 
					<p>Image:</p>
					<input onChange={event => {
							setInputImgName(event.target.value)
						}}
						value={inputImgName}
					/>
				</label>
			
			<button onClick={postHamster}> post hamster </button>

		</section>
	)
}
export default HamsterForm
