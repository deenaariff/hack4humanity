module.exports = function (app, db, ObjectID, workers, events) {

  var ai = require('../structures/shuffle')(workers,events);
  var queue = require('../structures/wQueue');
  var pqueue = require('../structures/eventPQueue')

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
              console.log(JSON.stringify(data));
              res.send(JSON.stringify(data));
        });

        var quickSortbyID = function (events) {
            var pivot = events[0];
            var lessThan = [];
            var greaterThan = [];
            for (var k = 1; k < events.length; k++) {
              // original function sorted in ascending, reversed operator to make descending 
                if (data[k][6] > pivot[6]) lessThan.push(data[k]);   
                else greaterThan.push(data[k]);
            }
            if (lessThan.length > 1) lessThan = quickSortbyID(lessThan); // sort data less than pviot
            lessThan.push(events[0]);
            if (greaterThan.length > 1) greaterThan = quickSortbyID(greaterThan); // sort data greater than pivot
            return lessThan.concat(greaterThan);
        }

          // Intelligent Allocation
        while (workers.length != 0 || events.length != 0) {
           worker = shift(workers);
           var first = events[0];
           if(events[0].priority != 0) {
                events[0].commited_workers += worker;
                priority = (first[3] - first[4].size())*severity;
                quickSortbyID(events);
            }
           else {
              for (var i = 0; k < first[3].size(); i++) 
                workers.push(first.commited_workers[i]);
              delete(events[0]);
           }
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


};