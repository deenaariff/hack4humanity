module.exports = function (server, db, ObjectID) {

	var ObjectId = ObjectID;

  	app.get('/events/getAll', function (req, res, next) {

        db.events.find(), function (err, data) {
       	  if(!data)
       	  	res.send("Param did not work")
       	  else
       	  	res.send(JSON.stringify(data));
        });

    });



};