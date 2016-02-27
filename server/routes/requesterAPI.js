module.exports = function (app db, ObjectID) {

  var ObjectId = ObjectID;

  app.get('/allRequesters', function (req, res) { {
          db.collection('users').find(function(err,docs) {
              var jsonStr = JSON.stringify(docs);
              res.end(jsonStr);
              if (err) {
                res.writeHead(403, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify ({
                    error: "DB Error"
                }));
              }
          });
  });

};