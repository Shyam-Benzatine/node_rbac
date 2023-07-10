const dotenv = require('dotenv');
const express = require('express');
var app = express();
app.use(express.static('public'))
const dbconfig = require('./db/config')
const router = require('./routes/routes')
const bodyParser = require('body-parser')
const session = require('express-session');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(session({
    secret: 'dsgagbcbcxgarwaq',
    resave: false,
    saveUninitialized: false
}));

app.use('/api', router);

app.get('/', (req, res) => {
    res.send(`App Running on Port ${PORT}`)
})

app.listen(PORT, function () {
    console.log('Node app is running on port 3000');
});

