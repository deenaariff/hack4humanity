module.exports = function (app, db, ObjectID) {

	app.post('/worker/new/:name', function (req, res) {
        var user_id = ++numworkers;
        var user_object = {
        	'id': user_id,
        	'name': ' ',
        	'work_info': {
        		'event': 
        	},
        	'req_info': {},
        	'status': 'available'
        }
        db.users.save(user_object,
          function (err, data) {
              res.end(JSON.stringify(data));
          });
  	});


};