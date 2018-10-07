const express       = require('express'),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),

    // requiring routes
    indexRoutes     = require('./routes'),
    todoRoutes      = require('./routes/todos');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api', { useNewUrlParser: true });

mongoose.Promise = Promise;
      
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static( __dirname + '/views'));

app.use('/', indexRoutes);
app.use('/api/todos', todoRoutes);


app.listen(process.env.PORT || 3000, function() {
    console.log('Server On');
});