const express       = require('express'),
    Todo            = require('../models/todo'),
    helpers         = require('../helpers/todos'),
    router          = express.Router();

router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo)

router.route('/:todoId')
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo)

module.exports = router;