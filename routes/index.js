const express       = require('express'),
    Todo              = require('../models/todo'),
    router          = express.Router();


router.get('/', function(req, res) {
    res.send('Hello');
});


module.exports = router;