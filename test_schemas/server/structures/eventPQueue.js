// Events has [data, and ID]
// var priority = (workers_needed - workers) * severity;
// workers needed
// workers committed

// PRECONDITION: Events has objects (Data -> event, ID -> priority)
module.exports = function (events) {



}

// Quick Sorted by object.id of data in ascendeding order
// O(nlogn) - AVG , O(n^2) - WORST
function quickSortbyID (events) {
    var pivot = events[0];
    var lessThan = [];
    var greaterThan = [];
    for (var k = 1; k < events.length; k++) {
        var events[k].priority = (events[k].workers_needed - events[k].potential_workers) * events[k].severity;
        if (events[k].priority == 0) {
            
        }
        if (events[k].priority < pivot.priority) lessThan.push(events[k]);   
        else greaterThan.push(events[k]);
    }
    if (lessThan.length > 1) lessThan = quickSortbyID(lessThan); // sort data less than pviot
    lessThan.push(events[0]);
    if (greaterThan.length > 1) greaterThan = quickSortbyID(greaterThan); // sort data greater than pivot
    return lessThan.concat(greaterThan);
}

function addEvent (events, worker) {
    var length = events.length;
    events[length] = worker;
}

function updateEvents (events) {
    quickSortbyID (events);
}