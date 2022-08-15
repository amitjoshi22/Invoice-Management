const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controllers/authController');
router.route('/').get(getUser);

router.route('/register').post(register);
router.route('/login').post(login);



module.exports =router;