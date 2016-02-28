module.exports = function (app, db, ObjectID, workers, events) {

	// WORKING
	app.post('/worker/new/:name', function (req, res) {

     db.users.count(function(error, nbDocs) {

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
              console.log("New worker: " + user_object["name"]);
              console.log("Workers in queue: " + workers);
              console.log("Workers in queue: " + workers.length);
              res.send(JSON.stringify(data));
        });

        workers += user_object;

         var quickSortbyID = function () {
              var swapped;
              do {
                  swapped = false;
                  for (var i=0; i < events.length-1; i++) {
                      if (events[i]["priority"] > events[i+1]["priority"]) {
                          var temp = events[i];
                          events[i] = events[i+1];
                          events[i+1] = temp;
                          swapped = true;
                      }
                  }
              } while (swapped);
          }
          console.log (workers);

          quickSortbyID();
          while(workers.length != 0 && events.length != 0 && events[0]["priority"] != 0 ) {
            console.log("Workers in pqueue(BEFORE): " + events[0]["commited_workers"].length);
            events[0]["commited_workers"].push(workers[0]);
            delete(workers[0]);
            events[0]["priority"] = events[0]["workers_needed"] - events[0]["commited_workers"].length;
            db.events.update(events[0]["euid"], events[0], function () {
            });
            console.log("Workers in queue(after): " + events[0]["commited_workers"].length);
            quickSortbyID();
          }

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


    // GET ALL EVENTS
    app.get('/workers/numWorkers', function (req, res, next) {
        db.users.count( function (err, data) {
          res.send(JSON.stringify(data));
        });

    });



};