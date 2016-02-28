module.exports = function (workers, events) {

// DATASTRUCTURE COMPONENTS
var workerQueue = require('./wQueue')
var eventPQueue = require('./eventPQueue')

function allocate () {
	while (workers.length != 0 || events.length != 0) {
		eventPqueue.pushEvent(events, workerQueue.pop(workers));
	}
}

}