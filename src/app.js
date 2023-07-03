const dotenv = require('dotenv');
const express = require('express');
var app = express();
const dbconfig = require('./db/config')
const router = require('./routes/routes')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/api', router);

app.get('/', (req, res) => {
    res.send(`App Running on Port ${PORT}`)
})

app.listen(PORT, function () {
    console.log('Node app is running on port 3000');
});