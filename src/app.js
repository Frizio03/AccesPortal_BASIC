const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mysql = require('mysql')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
dotenv.config({ path: './.env' })

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
hbs.registerPartials(partialsPath)

//Setup DB connection
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.MYSQL_DB
  })

//Define functions
const dbQuery = (queryString) => {
return new Promise((resolve) => {
    db.query(queryString, (error, result) => {
    if (error) {
        throw error
    } else {
        resolve(result)
    }
    })
})
}

const loginUser = async (req, res) => {
    try {
      console.log(req.body)
      /* const users = await dbQuery(
        `SELECT * FROM users WHERE username = '${username}'`
      )
      userData = users[0]
      if (!userData || !(await bcrypt.compare(password, userData.password))) {
        res.render('login', { message: 'Incorrect username or password' })
      } else {
        createToken(userData.id, res)
      }*/
    } catch (err) {
      console.log(err)
      res.render('login', { message: 'An error has occurred. Please try again' })
    }
  }

/* dbQuery(
    `CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255)
    FirstName varchar(255)
    age int
    )`
)
*/
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        logoPath: "./public/img/lock.png",
        title: 'User Acces Portal',
        author: 'Fabri e Gianlu'
    })
})

app.get('/login', (req, res) => {
    res.render('login', {
        title: "User Acces Portal",
        messaggio: 'Hello! Login NOW!',
        author: 'Fabri e Gianlu'
    })
})

app.post('/login', (req, res) => {
    console.log(req.body)
    //loginUser(req, res)
    res.send({message: "ok", data: req.body})
})

app.get('/signup', (req, res) => {
    res.render('signup', {
        title: "User Acces Portal",
        author: 'Fabri e Gianlu'
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