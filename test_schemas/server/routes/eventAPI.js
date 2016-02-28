module.exports = function (app, db, ObjectID) {

  var ObjectId = ObjectID;

    app.get('/events/getAll', function (req, res, next) {
        console.log("Get All Called");
        db.events.find( function (err, data) {
          console.log("In find");
          res.send(JSON.stringify(data));
        });

    });

  // ADD NEW EVENT
  // TODO: make sure num users increases in scale of db 
  app.post('/events/new/:leader', function (req, res) {
        console.log("Called");
        var data = req.body;
        db.events.count(function(error, nbDocs) {
          var event_object = {
            "euid":  nbDocs+1,
            "position": {
             "long": data.longit,
             "lat": data.latit
            },
            "completed" : 0, 
            "leader": req.params.leader,
            "workers_needed": 0,
            "commited_workers": [],
            "potential_workers": [],
            "type": data.type,
            "severity": data.severity
          };
          db.events.save(event_object, function (err, data) {
                console.log("NEW EVENT")
                console.log(JSON.stringify(data));
                res.send(JSON.stringify(data));
          });
        });
    });



};