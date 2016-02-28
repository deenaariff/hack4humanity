module.exports = function () {
    
function pushWorker(events, worker) {
	var first = events[0];
	if(events[0].priority != 0) {
    	events[0].commited_workers += worker;
  		priority = (first.workers_needed - first.commited_workers.size())*severity;
  		quickSortbyID(events);
	}
}
    
function pushEvent(events, e) {
	events += e;
	lindex = events.length() - 1;
    events[lindex].priority = (events[length].workers_needed - events[length].commited_workers) * events[length].severity;
    quickSortbyID(events);  
}
    
function updateEvents(events) {
    quickSortbyID(events);
}

function quickSortbyID (events) {
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

}