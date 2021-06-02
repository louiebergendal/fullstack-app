
import { useEffect, useState } from 'react'
import { useMountedRef } from '../../hooks/useMountedRef'
import HamsterCard from '../hamster-card/HamsterCard'
import './Kamp.css'

/*
TODO:
	PÅ STARTSIDAN
	Om det av någon anledning inte går att nå backend-servern så ska du visa ett användarvänligt felmeddelande här. 
	Användaren ska också få möjligheten att försöka igen.

	Nu ska du visa hur många vinster och förluster respektive hamster har. 
	Användaren ska få möjligheten att starta en ny match, med två slumpade hamstrar.
*/

const Kamp = () => {
	const [hamsterHero, setHamsterHero] = useState(null)
	const [hamsterVillain, setHamsterVillain] = useState(null)
	const [showVictoryResult, setShowVictoryResult] = useState(false)
	const [winner, setWinner] = useState(null)
	const [loser, setLoser] = useState(null)

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
	},	[isMounted])


	// ======= FUNKTIONS-DEKLARATIONER ======= //

	async function declareWinner(winner, loser) {
		console.log(showVictoryResult);

		// Om matchresultaten inte visas så är matchen pågående.
		// Sålänge matchen är pågående kan någon vinna.
		if (!showVictoryResult) {

			// Registrerar matchresultatet
			setWinner(winner)
			setLoser(loser)
			await fetch(`/hamsters/${winner.id}/win`, { method: 'PUT' })
			await fetch(`/hamsters/${loser.id}/lose`, { method: 'PUT' })

			// Visar match-resultatet
			setShowVictoryResult(true)
		}
	}

	async function startNewMatch() {
		// Stäng ned resultatet från den förra matchen och gör kombatanterna (när de kommit) klickbara
		setShowVictoryResult(false)

		// Hämtar kombatanter från backend
		const heroHamster = await getRandomHamster()
		const villainHamster = await recursivelyGetVillainousHamster(heroHamster)

		setHamsterHero(heroHamster)
		setHamsterVillain(villainHamster)

	}

	async function getRandomHamster() {
		const response = await fetch('/hamsters/random', { method: 'GET' })
		const hamster = await response.json()
		return hamster
	}

	async function recursivelyGetVillainousHamster(heroHamster) {
		let villainHamsterCandidate = await getRandomHamster()
	
		if (heroHamster.id === villainHamsterCandidate.id) {
			return await recursivelyGetVillainousHamster(heroHamster);
		} else {
			return villainHamsterCandidate;
		}
	}

	// ======= RETURN, JSX ETC ======= //

	return (
		<section>
			<div className='battle'>
				{hamsterHero ? 
					<div className='combatant' onClick={() => declareWinner(hamsterHero, hamsterVillain)}>

						<HamsterCard hamster={hamsterHero} />

					</div>
				: defaultString
				}

				<div></div>

				{hamsterVillain ? 
					<div className='combatant' onClick={() => declareWinner(hamsterVillain, hamsterHero)}>
						<HamsterCard hamster={hamsterVillain} />
					</div>
				: defaultString
				}

			</div>

			{showVictoryResult ? 
				<div className='victory-box'>
					
					<button onClick={startNewMatch}>next battle!</button>

					<div>
						<p>WINNER!</p>
						<p>Name: {winner.name}</p>
						<p>Wins: {winner.wins + 1}</p>
						<p>Defeats: {winner.defeats}</p>
					</div>

					<div>
						<p>LOOSER!</p>
						<p>Name: {loser.name}</p>
						<p>Wins: {loser.wins}</p>
						<p>Defeats: {loser.defeats + 1}</p>
					</div>

				</div>
			: ''}
		
		</section>

	)
}
export default Kamp

