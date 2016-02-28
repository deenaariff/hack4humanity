module.exports = function (app, db, ObjectID, workers, events) {

  var ai = require('../structures/shuffle')(workers,events);

	// WORKING
	app.post('/worker/new/:name', function (req, res) {

     db.events.count(function(error, nbDocs) {

        var user_object = {
          "uuid": nbDocs + 1,
          "name": req.params.name,
          "is_leader": 0,
          "phone": "9999999999",
          "email": "example@gmail.com",
          "event": "earthquake",
          "requests": [{"event": "earthquake"}],
          "cur_pos": {
           "long": 0,
          "lat": 0
        },
 	       "status": "available"
        }

        db.users.save(user_object,
          function (err, data) {
              console.log(JSON.stringify(data));
              res.send(JSON.stringify(data));
        });

        ai.workerQueue.push(workers, user_object);
        ai.allocate();

      });

  	});

	// SEE REQUESTS
	app.get('/worker/requests/:id', function (req, res) {

    console.log("Worker Requests called");

		db.users.findOne({'uuid' : req.params.id}, function(err,docs) {
      if (err) {
        res.send(JSON.stringify ({ error: "DB Error" }));
      }
      else { 
        res.send(JSON.stringify(docs));
      }
    });

	});

	// ACCEPT REQUEST
  	// TODO: make sure num users increases in scale of db 
	app.post('/worker/:id/:occurrance/:accept', function (req, res) {
		db.events.find({euid : req.params.occurrance}, function(err,docs) {
			     if (err) {
                res.end(JSON.stringify ({
                    error: "DB Error Updating Event "
                }));
            }
            docs.commited_workers += req.params.id;
        	  db.events.update(docs,
        	  function (err, data) {
              	console.log(JSON.stringify(data));
         	  });
      });
      db.users.find({"uuid" : req.params.id}, function(err,docs) {
			    if (err) {
                res.end(JSON.stringify ({
                    error: "DB Error Updating User"
                }));
          }
            docs.events += req.params.occurance;
            db.users.update(docs,
        	  function (err, docs) {
              	console.log(JSON.stringify(data));
         	});
         	res.send("Succesful");
      });
  	});


};