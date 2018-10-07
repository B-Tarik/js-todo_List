const express       = require('express'),
    Todo              = require('../models/todo'),
    router          = express.Router();


router.get('/', function(req, res) {
    res.sendFile('index.html');
});


module.exports = router;