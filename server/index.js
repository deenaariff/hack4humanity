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
var workerAPI;
var eventAPI;
var workers = [];
var events = [];
var start = 0;
if (start === 0) {
	console.log("Updating workers and events")
	db.events.find( function (err, data) { 
		events = data;
		db.users.find( function (err, data) { 
			workers = data;    
			workerAPI = require('./routes/workerAPI')(app, db, ObjectID, workers, events); 
			eventAPI = require('./routes/eventAPI')(app, db, ObjectID, workers, events);
		});
    });
	start += 1;
}

app.get('/', function (req, res) { 
	res.end("Hack4Humanity Sample Get Request");
});

// LISTEN 
app.listen(process.env.PORT || 5000, function(){
  console.log("Started")
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



