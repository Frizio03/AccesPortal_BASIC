const express = require('express')
const bodyParser = require('body-parser')
const router = new express.Router()

//Router
const userRouter = router.post('/test', async (req, res) => {
    console.log(req.body)
    res.send({message: "ok"})
})

app = express()
app.use(express.json())
// app.use(userRouter)
app.post('/test', async (req, res) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error)
    }
    res.send({message: "ok"})
})




app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));
