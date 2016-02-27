// DEPENDENCIES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var PORT = 3000;

// PARSER
var bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

// DB COMPONENTS
var mongojs =  require('mongojs');
var morgan  =  require('morgan');
var db =  mongojs('mongodb://',['users','foodLists']);
var mongodb = require("mongodb"),
		ObjectID = mongodb.ObjectID

// SERVER COMPONENTS
var requesterAPI = require('routes/requesterAPI')(app, db, ObjectID);
var workerAPI = require('routes/workerAPI')(app, db, ObjectID);
var dashboard API = require('routes/dashboardAPI')(app, db, ObjectID);

// LISTEN 
app.listen(PORT);


