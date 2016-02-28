module.exports = function (app, db, ObjectID) {

  var ObjectId = ObjectID;

    app.get('/events/getAll', function (req, res, next) {

        db.events.find(), function (err, data) {
          if(!data)
            res.send("Param did not work")
          else
            res.send(JSON.stringify(data));
        };

    });

  // ADD NEW EVENT
  // TODO: make sure num users increases in scale of db 
  app.post('/event/new/:leader', function (req, res) {
    var data = req.body;
        var event_object = {
          "euid":  db.events.count(),
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
        db.events.save(event_object,
          function (err, data) {
              console.log(JSON.stringify(data));
        });
    });



};