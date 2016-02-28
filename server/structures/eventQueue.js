module.exports = function () {
    
function push(events) {

}
    
function updateEvents() {

}
    
// Quick Sorted by object.id of data in ascendeding order
// O(nlogn) - AVG , O(n^2) - WORST
function quickSortbyID (events) {

    var pivot = events[0];
    var lessThan = [];
    var greaterThan = [];
    for (var k = 1; k < events.length; k++) {
    var priority = (events[k].workers_needed - events[k].commited_workers) * events[k].severity;
      if (data[k].user_id < pivot.user_id) lessThan.push(data[k]);   
      else greaterThan.push(data[k]);
    }
    if (lessThan.length > 1) lessThan = quickSortbyID(lessThan); // sort data less than pviot
    lessThan.push(data[0]);
    if (greaterThan.length > 1) greaterThan = quickSortbyID(greaterThan); // sort data greater than pivot
    return lessThan.concat(greaterThan);
}

}