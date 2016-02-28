// DEPENDENCIES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var PORT = 5000;

// PARSER
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// DB COMPONENTS
var mongojs =  require('mongojs');
var morgan  =  require('morgan');
var db =  mongojs('h4h',['users','events']);
var mongodb = require("mongodb"),
	ObjectID = mongodb.ObjectID

// SERVER COMPONENTS
var requesterAPI = require('./routes/requesterAPI')(app, db, ObjectID);
var workerAPI = require('./routes/workerAPI')(app, db, ObjectID);
var eventAPI = require('./routes/eventAPI')(app, db, ObjectID);

app.get('/', function (req, res) { 
	res.end("Working");
}

// LISTEN 
console.log("Listening on PORT: "  + PORT);
app.listen(PORT);



