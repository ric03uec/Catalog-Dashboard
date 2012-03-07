/**
  * Method to load any script into DOM. Include only this index.js in view and call
  * all the scripts from here
  */
var loadScript = function(url, callback){
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  script.onreadystatechange = callback;
  script.onload = callback;

  head.appendChild(script);
}

$(document).ready(function(response){
    initDatePickers();
});

var initDatePickers = function(){
  
  var day = moment(new Date()).format("DD/MM/YYYY");
  $('#stockArrivalDate').val(day);

  $('#catalogSubDate').val(day);

  $('#editingCompDate').val(day);

  $('#contentAssignDate').val(day);

  $('#imageAssignDate').val(day);

  $('#photoCompleteDate').val(day);

  $('#launchDate').val(day);
 
  $('#approvedDate').val(day);
}
