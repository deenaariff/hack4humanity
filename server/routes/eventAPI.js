module.exports = function (app, db, ObjectID, workers, events) {

    var ObjectId = ObjectID;

    var scramble = function () {
        var guidHolder = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        var hex = '0123456789abcdef';
        var r = 0;
        var guidResponse = "";
        for (var i = 0; i < 36; i++) {
            if (guidHolder[i] !== '-' && guidHolder[i] !== '4') {
                r = Math.random() * 16 | 0;
            }
            if (guidHolder[i] === 'x') {
                guidResponse += hex[r];
            } else if (guidHolder[i] === 'y') {
                r &= 0x3; 
                r |= 0x8;
                guidResponse += hex[r];
            } else {
                guidResponse += guidHolder[i];
            }
        }
        return guidResponse;
    };

    // ADD NEW EVENT
    app.post('/events/new/:event_type/:severity/:workers_needed', function (req, res) {

          var id = scramble();
          var commited_workers = [];

          console.log("EVENTS in queue(START): " + events.length);

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

          
          console.log("Priority")
          for(var i = 0; i < events.length; i++) {
            console.log(events[i]["priority"])
          }

          quickSortbyID();
          while(workers.length != 0 && events.length != 0 && events[0]["priority"] != 0 ) {
            console.log("Workers in pqueue(BEFORE): " + workers.length);
            events[0]["commited_workers"].push(workers.splice(0,1));
            events[0]["priority"] = events[0]["workers_needed"] - workers.length;
            db.events.update(events[0]["euid"], events[0], function () {
            });
            console.log("Workers in queue(after): " + events[0]["commited_workers"].length);
            quickSortbyID();
          }

          console.log("Workers in queue(BEFORE): " + workers.length);
          while (workers.length != 0 && commited_workers.length != req.params.workers_needed) {
            commited_workers.push(workers.splice(0,1));
          }
          var event_object = {
            "euid":  id,
            "position": {
             "lat": (Math.random() * (37.673132 - 37.633916) + 37.633916),
             "lng": (Math.random() * (-122.220531 - -122.471864) + -122.471864)
            },
            "completed" : 0, 
            "workers_needed": req.params.workers_needed,
            "commited_workers": commited_workers,
            "type": req.params.event_type,
            "priority":  req.params.workers_needed - commited_workers.length,
            "severity": req.params.severity
          };

          events.push(event_object);

          db.events.save(event_object, function (err, data) {
                console.log("New event: " + event_object["type"]);
                console.log("Workers in queue(AFTER): " + workers.length);
                res.send(JSON.stringify(data));
          });


    });

    // GET ALL EVENTS
    app.get('/events/getAll', function (req, res, next) {
        console.log("getAll() Called");
        db.events.find( function (err, data) {
          res.send(JSON.stringify(data));
        });

    });

    



};