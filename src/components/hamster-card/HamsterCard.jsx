
import './HamsterCard.css'


function HamsterCard(props) {
	return (
        <div key={props.hamster.id} className='hamster-card'>

            <div className='hamster-card-img' style={{backgroundImage: `url(img/${props.hamster.imgName})`}}

            ></div>
        </div>
	);
}

export default HamsterCard;
