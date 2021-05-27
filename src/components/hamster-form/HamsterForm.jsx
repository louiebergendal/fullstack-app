
/* 

*/

import { useState } from 'react'

const HamsterForm = () => {
	const [inputName, setInputName] = useState('default')
	const [inputAge, setInputAge] = useState(0)
	const [inputFavFood, setInputFavFood] = useState('default')
	const [inputLoves, setInputLoves] = useState('default')
	const [inputImgName, setInputImgName] = useState('default')
	const [inputWins, setInputWins] = useState(0)
	const [inputDefeats, setInputDefeats] = useState(0)
	const [games, setGames] = useState(0)

	async function postHamster() {

		setGames(inputWins + inputDefeats)

		const formData = {
			'name': inputName,
			'age': Number(inputAge),
			'favFood': inputFavFood,
			'loves': inputLoves,
			'imgName': inputImgName,
			'wins': inputWins,
			'defeats': inputDefeats,
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
		<p>
			<label> 
				Name:
				<input onChange={event => {
						console.log('Controlled change', event.target.value);
						setInputName(event.target.value.toUpperCase()) // Här kan jag kontrollera fältet
					}}
					value={inputName}
				/>
			</label>
		</p>
		<p>
			<label> 
				Age:
				<input onChange={event => {
						console.log('Controlled change', event.target.value);
						setInputAge(event.target.value) // Här kan jag kontrollera fältet
					}}
					value={inputAge}
				/>
			</label>
		</p>
		<p>
			<label> 
				Favourite food:
				<input onChange={event => {
						console.log('Controlled change', event.target.value);
						setInputFavFood(event.target.value.toUpperCase()) // Här kan jag kontrollera fältet
					}}
					value={inputFavFood}
				/>
			</label>
		</p>
		<p>
			<label> 
				Loves:
				<input onChange={event => {
						console.log('Controlled change', event.target.value);
						setInputLoves(event.target.value.toUpperCase()) // Här kan jag kontrollera fältet
					}}
					value={inputLoves}
				/>
			</label>
		</p>
		
		<button onClick={postHamster}> post hamster </button>

	</section>

)}
export default HamsterForm
