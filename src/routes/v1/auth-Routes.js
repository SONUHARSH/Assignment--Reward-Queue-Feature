const express = require('express');
const { register, login } = require('../../controller/auth-Controller');
const router = express.Router();


//   8088/api/v1/auth/register & login   POST
router.post('/register', register);
router.post('/login', login);

module.exports = router;
