
var pushWorker = function (events, worker, wqueue) {
	var first = events[0];
	if(events[0].priority != 0) {
    	events[0].commited_workers += worker;
  		priority = (first.workers_needed - first.commited_workers.size())*severity;
  		quickSortbyID(events);
	}
	else {
		for (var i = 0; k < first.commited_workers.length; i++) 
			wqueue.push(first.commited_workers[i]);
		delete(events[0]);
	}
}
    
var pushEvent = function (events, e) {
	events += e;
	lindex = events.length() - 1;
    events[lindex].priority = (events[lindex].workers_needed - events[lindex].commited_workers) * events[lindex].severity;
    quickSortbyID(events);  
}
    
var updateEvents = function (events) {
    quickSortbyID(events);
    console.log("UPDATED PRIORITY QUEUE")
    for (var k = 0; k < events.length; k++) {
    	console.log(events[k].priority);
    	console.log(events[k].type);
    }
}

var quickSortbyID = function (events) {
    var pivot = events[0];
    var lessThan = [];
    var greaterThan = [];
    for (var k = 1; k < events.length; k++) {
    	// original function sorted in ascending, reversed operator to make descending 
        if (data[k].priority > pivot.priority) lessThan.push(data[k]);   
        else greaterThan.push(data[k]);
    }
    if (lessThan.length > 1) lessThan = quickSortbyID(lessThan); // sort data less than pviot
    lessThan.push(events[0]);
    if (greaterThan.length > 1) greaterThan = quickSortbyID(greaterThan); // sort data greater than pivot
    return lessThan.concat(greaterThan);
}

module.exports = {
  pushWorker: pushWorker,
  pushEvent: pushEvent,
  updateEvents: updateEvents,
  quickSortbyID: quickSortbyID
}

