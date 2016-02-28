// DEPENDENCIES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// PARSER
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// DB COMPONENTS
var mongojs =  require('mongojs');
var morgan  =  require('morgan');
var db =  mongojs('mongodb://hacker:hacker@ds019058.mlab.com:19058/hack4humanity',['users','events']);
var mongodb = require("mongodb"),
	ObjectID = mongodb.ObjectID

// SERVER COMPONENTS
var requesterAPI = require('./routes/requesterAPI')(app, db, ObjectID);
var workerAPI = require('./routes/workerAPI')(app, db, ObjectID);
var eventAPI = require('./routes/eventAPI')(app, db, ObjectID);

app.get('/', function (req, res) { 
	res.end("Working");
});

// LISTEN 
app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



