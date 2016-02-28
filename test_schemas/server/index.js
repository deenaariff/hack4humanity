// DEPENDENCIES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')


// PARSER
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// DB COMPONENTS
var mongojs =  require('mongojs');
var morgan  =  require('morgan');
var db =  mongojs('mongodb://hacker:hacker@ds019058.mlab.com:19058/hack4humanity',['users','events']);
var mongodb = require("mongodb"),
	ObjectID = mongodb.ObjectID

// VARIABLES
var workers = [];
var events = [];
var start = 1;
if (start === 1) {
	db.users.find( function (err, data) { workers = data; });
	db.events.find( function (err, data) { events = data; });
	start += 1;
}

// SERVER COMPONENTS
var workerAPI = require('./routes/workerAPI')(app, db, ObjectID, workers, events);
var eventAPI = require('./routes/eventAPI')(app, db, ObjectID, workers, events);

app.get('/', function (req, res) { 
	res.end("Hack4Humanity Sample Get Request");
});

// LISTEN 
app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



