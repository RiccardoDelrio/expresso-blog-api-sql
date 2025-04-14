const express = require('express');
const cors = require("cors");
const app = express()
const port = 3000

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.static('public'));
const postsRoutes = require('./routes/posts') //IMPORTO LE ROTTE PER I POST
const handlerError = require('./middleware/handlerError') //')
const error_404 = require('./middleware/error_404')

app.use('/posts', postsRoutes) //AGGIUNGO LE ROTTE AL SERVER
app.use(handlerError)

app.listen(port, () => {

    console.log(`Server attivo http://localhost:${port}`)
})
app.use(error_404) //aggiunta middleware per gestire errori 404
app.get("/", (req, res) => {
    res.send("Welcome to our server")

})