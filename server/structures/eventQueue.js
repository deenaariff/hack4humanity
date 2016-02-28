module.exports = function (events) {
    
function pushWorker(need, have, severity) {
    var length = events.length;
    events[length].workers_needed = need;
    events[length].commited_workers = have;
    events[length].severity = severity;
    events[length].priority = (events[length].workers_needed - events[length].commited_workers) * events[length].severity;
    
}
    
function pushEvent() {
    quickSortbyID(events);
    
    events[length].priority = (events[length].workers_needed - events[length].commited_workers) * events[length].severity;
    
    if (events[length].priority == 0) {
        return;
    }

}
    
function updateEvents(events) {
    quickSortbyID(events);
}
    
// Quick Sorted by object.id of data in ascendeding order
// O(nlogn) - AVG , O(n^2) - WORST
function quickSortbyID (events) {
    var pivot = events[0];
    var lessThan = [];
    var greaterThan = [];
    for (var k = 1; k < events.length; k++) {
        events[k].priority = (events[k].workers_needed - events[k].commited_workers) * events[k].severity;
        if (data[k].priority < pivot.priority) lessThan.push(data[k]);   
        else greaterThan.push(data[k]);
    }
    if (lessThan.length > 1) lessThan = quickSortbyID(lessThan); // sort data less than pviot
    lessThan.push(events[0]);
    if (greaterThan.length > 1) greaterThan = quickSortbyID(greaterThan); // sort data greater than pivot
    return lessThan.concat(greaterThan);
}

}