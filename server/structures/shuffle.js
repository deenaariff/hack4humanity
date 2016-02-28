module.exports = function (workers, events) {

// DATASTRUCTURE COMPONENTS
var workerQueue = require('./wQueue')
var eventPQueue = require('./eventPQueue')

function allocate () {
	while (workers.length != 0 || events.isFull()) {
		eventPqueue.push(events, workerQueue.pop(workers));
	}
}

}