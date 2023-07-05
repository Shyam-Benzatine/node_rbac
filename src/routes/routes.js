const express = require('express')
var router = express.Router();
const {register,login,test} = require('../controllers/AuthController')

router.post('/register',register);
router.post('/login',login);
router.get('/test',test);

module.exports = router;