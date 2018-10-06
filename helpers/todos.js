const Todo            = require('../models/todo');

exports.getTodos = function(req, res) {
    Todo.find()
    .then(function(todos) {
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    })
}

exports.createTodo = function(req, res) {
    Todo.create(req.body)
    .then(function(newTodo) {
        res.status(201).json(newTodo);
    })
    .catch(function(err) {
        res.send(err);
    })
}

exports.getTodo = function(req, res) {
    Todo.findById(req.params.todoId)
    .then(function(foundTodo) {
        res.json(foundTodo);
    })
    .catch(function(err) {
        res.send(err);
    })
}

exports.updateTodo = function(req, res) {
    Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo) {
        res.json(todo);
    })
    .catch(function(err) {
        res.send(err);
    })
}

exports.deleteTodo = function(req, res) {
    Todo.remove({_id: req.params.todoId})
    .then(function() {
        res.json({message: 'Succesfully Deleted.'});
    })
    .catch(function(err) {
        res.send(err);
    })
}

module.export = exports;