module.exports = function (app, db, ObjectID, workers, events) {

    var ObjectId = ObjectID;
    var ai = require('../structures/shuffle')(workers,events);

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
    app.post('/events/new/:event_type/:severity', function (req, res) {

          var id = scramble();
          var event_object = {
            "euid":  id,
            "position": {
             "lat": (Math.random() * (37.673132 - 37.633916) + 37.633916),
             "lng": (Math.random() * (-122.220531 - -122.471864) + -122.471864)
            },
            "completed" : 0, 
            "workers_needed": 0,
            "commited_workers": [],
            "type": req.params.event_type,
            "priority": 0,
            "severity": req.params.severity
          };

          db.events.save(event_object, function (err, data) {
                console.log("NEW EVENT")
                console.log(JSON.stringify(data));
                res.send(JSON.stringify(data));
          });

          ai.eventPQueue.push(events, event_object);
          ai.allocate(events);


    });

    // GET ALL EVENTS
    app.get('/events/getAll', function (req, res, next) {
        console.log("getAll() Called");
        db.events.find( function (err, data) {
          res.send(JSON.stringify(data));
        });

    });

    



};