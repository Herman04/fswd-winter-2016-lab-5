'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

// to extract form data from POST bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(request, response) {
  response.render('index');
});

app.get('/hi/:name', function(request, response) {
  var str = 'Hello, ' + request.params.name + ' ' + request.query.lastName + '!';

  if (request.query.inseam) {
    var inseam = request.query.inseam;

    if (inseam < 26) {
      str += ' How is the weather down there?';
    } else if (inseam > 34) {
      str += ' Wow, you are tall!';
    } else {
      str += ' And I understand your inseam is ' + inseam + ' inches';
    }
  }

  response.end(str);
});

//Declaring Task such that it refers to some varaible which when filled in some text field gets added to the sever
// var Task =  require('../models').Task;
//
// app.post('/todo/new', function(request, response) {
//   response.end('Added to do: ' + request.body.todo + ' ' + request.body.otherField);
//
//   Task.create({title:request.body.todo});
var Task = require('../models').Task;

app.get('/todo', function(req, res) {
  Task.findAll().then(function(todos) {
    console.log(todos);
    if (!todos) {
      res.end('No todos');
    } else {
      res.end('All known todos: ' + todos.map(function(t) { return t.title; }));
    }
  });
});

app.post('/todo/new', function(request, response) {
  Task.create({ title: request.body.todo }).then(function(todo) {
    response.render('newTodo', { todo: todo }); //what this does is render/return a template instead of some string value
});
});



// allow other modules to use the server
module.exports = app;
