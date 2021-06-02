// import { Link, useLocation } from 'react-router-dom';

function InfoBox(props) {
    console.log('props.hamster: ', props.hamster);

/*     const x = useLocation()
    console.log(x);
    console.log(x.pathname);

    const x2 = x.pathname.split('/')
    console.log('x2: ', x2);

    const x3 = x2[2]
    console.log(x3);

    const hamster = getHamster(x3)


	// Hämta hamster från databas
	async function getHamster(hamsterID) {
		const response = await fetch(`/hamsters/:${hamsterID}`, { method: 'GET' })
		return await response.json()
	} */


	return (
        <div className='info-box'>

            <p>Namn: {props.hamster.name}</p>
            <p>Ålder: {props.hamster.age}</p>
            <p>Favoritaktivitet: {props.hamster.loves}</p>
            <p>Favoritmat: {props.hamster.favFood}</p>

            <div className='hamster-card-img' style={{backgroundImage: `url(img/${props.hamster.imgName})`}}

            ></div>

{/*             <Link to="/galleri"> galleri page </Link> */}
        </div>
	);
}

export default InfoBox;
