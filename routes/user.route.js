var express = require('express');
var router = express.Router();
var uC = require('../controllers/user.controller');

router.post('/register',uC.register);
router.post('/login',uC.login);
router.get('/viewProfile',uC.viewProfile);

module.exports = router;