const express = require('express')
const bodyParser = require('body-parser')

app = express()
app.use(express.json())
app.post('/test', async (req, res) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error)
    }
    res.send({message: "ok"})
});


app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));
