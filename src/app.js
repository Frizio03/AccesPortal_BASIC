const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'User Acces Portal',
        name: 'fabriT'
    })
})

app.get('/login', (req, res) => {
    res.render('login', {
        messaggio: 'Hello! Login NOW!',
        autore: 'Fabri'
    })
})

app.get('/signup', (req, res) => {
    res.render('signup', {
        forecast: 'It is snowing',
        location: 'Novellara City'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

const port = 8080
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})