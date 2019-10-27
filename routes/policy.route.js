var express = require('express');
var router = express.Router();
var pC = require('../controllers/policy.controller');

router.post('/addPolicy',pC.addPolicy);
router.get('/viewPolicy',pC.viewPolicy);

module.exports = router;