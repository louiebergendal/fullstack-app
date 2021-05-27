const getDatabase = require('./database.js')
const dataJSON = require('./data.json')

const db = getDatabase()

dataJSON.forEach(hamster => {
	postHamster(hamster);	
});


async function postHamster(hamster) {
	db.collection('hamsters').add(hamster)
}
