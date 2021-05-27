const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require(path.join(__dirname, 'routes/hamsters.js'))

const PORT = process.env.PORT || 1340

const buildFolder = path.join(__dirname, '../build')

// ============= MIDDLEWARE ============= //

// Logger - skriv ut info om inkommande request
app.use((req, res, next) => {
	console.log('===============');
	console.log(`${req.method}  ${req.url} `, req.params);
	next()
})

app.use( express.json() )
app.use( cors() )
app.use( express.static(buildFolder) )
// app.use( express.static(buildImgFolder) )

// ============= ROUTES ============= //

app.use('/hamsters', hamsters) // "use" gör det till en klump med routes

app.get('/', (req, res) => {
    res.send('Hello from server')
})

// Ska vara sist för att fånga upp alla övriga requests
// För att frontend-rountingen ska fungera
app.get('*', (req, res) => {
	console.log('Matchade övrig route:', req.url);
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

// ============= RESTEN ============= //

// Felhanterare
app.use(errorHandler)
function errorHandler (err, req, res, next) {

	console.log('HOPPSAN!');
	
	if (res.headersSent) {
	  return next(err)
	}

	res.status(500)
	res.send({message: 'error', error: err})
}

// Starta servern
app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
})