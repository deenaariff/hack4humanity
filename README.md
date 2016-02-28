# hack4humanity
Hack for Humanity relief effort coordination


APIS for Workers

  New Worker(GET): /worker/new/:name

  Get Worker Requests(GET): worker/requests/:id

  Accept/Deny Requets(POST): /worker/:id/:event/:accept


APIS for Requester

  Update WorkersNeeded(POST): /requester/workersNeeded/:id/:num

  Data of Requester(GET): /requester/myevent/:user



APIS for event

  Get All Events(GET): '/events/getAll'
