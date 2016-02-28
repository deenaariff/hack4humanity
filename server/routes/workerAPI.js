module.exports = function (app, db, ObjectID) {

	// ADD NEW USER
	// TODO: make sure num users increases in scale of db 
	app.post('/worker/new/:name', function (req, res) {
        var user_object = {
          "uuid": db.users.count(),
          "name": req.params.name,
          "is_leader": 0,
          "phone": "9999999999",
          "email": "example@gmail.com",
          "event": "earthquake",
          "cur_pos": {
           "long": 0,
          "lat": 0
        },
 	       "status": "available"
        }
        db.users.save(user_object,
          function (err, data) {
              console.log(JSON.stringify(data));
          });
  	});

	// SEE REQUEUSTS
	app.get('worker/requests/:id', function (req, res) {
		db.users.find({"uuid" : req.params.id}), function(err,docs) {
			if (err) {
                res.end(JSON.stringify ({
                    error: "DB Error"
                }));
            }
            var data = JSON.stringifiy(docs.requests);
            res.end(jsonStr);
        };
	});

	// ACCEPT REQUEST
  	// TODO: make sure num users increases in scale of db 
	app.post('/worker/:id/:event/:accept', function (req, res) {
		db.event.find({"euid" : req.params.event}), function(err,docs) {
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
        };
        db.users.find({"uuid" : req.params.id}), function(err,docs) {
			if (err) {
                res.end(JSON.stringify ({
                    error: "DB Error Updating User"
                }));
            }
            docs.events += req.params.event;
            db.users.update(docs,
        	  function (err, docs) {
              	console.log(JSON.stringify(data));
         	});
         	res.end("Succesful");
        };
  	});


};