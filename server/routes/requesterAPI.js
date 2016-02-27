module.exports = function (app db, ObjectID) {

 	var ObjectId = ObjectID;

  	app.put('/requester/workersNeeded/:id/:num', function (req, res, next) {

        db.events.findOne({
          _id: db.ObjectId(req.params.id),
        }, function (err, data) {
       	  if(!data)
       	  	res.send("Param did not work")

          data.workers_needed = req.params.num;

          db.foodList.update({
            _id: db.ObjectID(req.params.id)
          }, data, {
            multi: false
          }, function (err, data) {
            if (err)
            	res.send("ERROR: Updating database failed")
          });
        });
    });

    app.get('/requester/myevent/:user', function (req, res, next) {

        db.events.findOne({
          _id: db.ObjectId(req.params.user),
        }, function (err, data) {
       	  if(!data)
       	  	res.send("Param did not work")
       	  else
       	  	res.send(JSON.stringify(data));
        });

    });




};