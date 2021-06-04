
import { useEffect/*, useCallback */, useState } from 'react'
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

	const isMounted = useMountedRef()
	const defaultString = 'Awaiting champion...'

/*	memoizedCallback(); */

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

/* 	
	const memoizedCallback = useCallback(
		async () => {
			// Hämtar kombatanter från backend
			const heroHamster = await getRandomHamster()
			const villainHamster = await recursivelyGetVillainousHamster(heroHamster)
	
			// Kollar så att komponenten är mountad
			if (isMounted.current) {
				setHamsterHero(heroHamster)
				setHamsterVillain(villainHamster)
			}
		},
		[heroHamster, villainHamster], // isMounted?
	);
*/


	// ======= FUNKTIONS-DEKLARATIONER ======= //

	async function declareWinner(winner, loser) {
		console.log(showVictoryResult);

		// Om matchresultaten inte visas så är matchen pågående.
		// Sålänge matchen är pågående kan någon vinna.
		if (!showVictoryResult) {

			// Registrerar matchresultatet
			setWinner(winner)

			// Updaterar display-datan
			if(winner === hamsterHero) {

				// Hamster hero seger skrivs in i display-datan
				const hamsterHeroCopy = hamsterHero
				hamsterHeroCopy.wins = (hamsterHeroCopy.wins + 1)
				hamsterHeroCopy.games = (hamsterHeroCopy.games + 1)
				
				// Hamster villain förlust skrivs in i display-datan
				const hamsterVillainCopy = hamsterVillain
				hamsterVillainCopy.defeats = (hamsterVillainCopy.defeats + 1)
				hamsterVillainCopy.games = (hamsterVillainCopy.games + 1)

				setHamsterHero(hamsterHeroCopy)
				setHamsterVillain(hamsterVillainCopy)

			} else {

				// Hamster villain skrivs in i display-datan
				const hamsterVillainCopy = hamsterVillain
				hamsterVillainCopy.wins = (hamsterVillainCopy.wins + 1)
				hamsterVillainCopy.games = (hamsterVillainCopy.games + 1)
				
				// Hamster heros förlust skrivs in i display-datan
				const hamsterHeroCopy = hamsterHero
				hamsterHeroCopy.defeats = (hamsterHeroCopy.defeats + 1)
				hamsterHeroCopy.games = (hamsterHeroCopy.games + 1)

				setHamsterHero(hamsterHeroCopy)
				setHamsterVillain(hamsterVillainCopy)
			}

			// Registrerar resultatet i databasen
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
		
		// Hämtar en kandidat
		let villainHamsterCandidate = await getRandomHamster()
	
		// Kollar så att onding-kandidaten inte är samma som hjälten
		if (heroHamster.id === villainHamsterCandidate.id) {

			// Om ondingkandidaten är samma som hjälten så börjar funktionen om
			return await recursivelyGetVillainousHamster(heroHamster);
		} else {

			// Annars blir onding-kandidaten antagen som onding
			return villainHamsterCandidate;
		}
	}

	// ======= RETURN, JSX ETC ======= //

	return (
		<section className='battle-background'>
			<div className='battle'>
				{hamsterHero ? 
					<div className={ 'combatant ' + (hamsterHero === winner ? 'winner ' : '') + (showVictoryResult ? '' : 'active ')} onClick={() => declareWinner(hamsterHero, hamsterVillain)}>
						<HamsterCard hamster={hamsterHero} />
						<div className='text-wrapper'>
							<p>Hej! Jag heter {hamsterHero.name}!</p>
							<p>När jag inte äter {hamsterHero.favFood} gillar jag att {hamsterHero.loves}.</p>
						</div>
					</div>
				: defaultString
				}

				<div></div>

				{hamsterVillain ? 
					<div className={ 'combatant ' + (hamsterVillain === winner ? 'winner' : '') + (showVictoryResult ? '' : 'active ')} onClick={() => declareWinner(hamsterVillain, hamsterHero)}>
						<HamsterCard hamster={hamsterVillain} />
						<div className='text-wrapper'>
							<p>Hej! Mitt namn är {hamsterVillain.name}!</p>
							<p>Jag gillar att {hamsterVillain.loves}, och annars käkar jag mest {hamsterVillain.favFood}.</p>	
						</div>
					</div>
				: defaultString
				}

			</div>

			{showVictoryResult ? 
			
				<div className='victory-box'>

					<h2>{winner.name} står som segrare!</h2>

					<div>
						<div>
							<h4>Namn: {hamsterHero.name}</h4>
							<p>Segrar: {hamsterHero.wins}</p>
							<p>Förluster: {hamsterHero.defeats}</p>
						</div>

						<div>
							<h4>Namn: {hamsterVillain.name}</h4>
							<p>Segrar: {hamsterVillain.wins}</p>
							<p>Förluster: {hamsterVillain.defeats}</p>
						</div>
					</div>
					
					<button onClick={startNewMatch}>En gång till!</button>

				</div>
			: ''}
		
		</section>

	)
}
export default Kamp

