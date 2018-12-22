// Dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var logger = require('morgan');
var mongoose = require('mongoose');

// Requiring our Note and Article models
var Note = require('./models/Note');
var Article = require('./models/Article');

// Requiring our routes
var routes = require('./routes/index');
var articles = require('./routes/articles');

// Our scraping tools
var cheerio = require('cheerio');

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Init app
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Use morgan
app.use(logger('dev'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Database configuration with mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Mongo-Web-Scraper";
mongoose.connect(MONGODB_URI);

// mongoose.connect('mongodb://localhost/GrapeScrape');
var db = mongoose.connection;

// Show any mongoose errors
db.on('error', function (error) {
  console.log('Mongoose Error: ', error);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function () {
  console.log('Mongoose connection successful.');
});

app.use('/', routes);
app.use('/articles', articles);

// Set Port
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Server started on port ' + app.get('port'));
});