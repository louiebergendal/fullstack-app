// import { Link, useLocation } from 'react-router-dom';
import './InfoBox.css'

function InfoBox(props) {
    console.log('props.hamster: ', props.hamster);

	return (
		<div>
			<div className='info-box'>

				<div>
					<p>Namn: {props.hamster.name}</p>
					<p>Ålder: {props.hamster.age}</p>
					<p>Favoritaktivitet: {props.hamster.loves}</p>
					<p>Favoritmat: {props.hamster.favFood}</p>
				</div>

				<div className='info-box-img' style={{backgroundImage: `url(img/${props.hamster.imgName})`}}>
				</div>

			{/* <Link to="/galleri"> galleri page </Link> */}
			</div>
		</div>
	);
}

export default InfoBox;
