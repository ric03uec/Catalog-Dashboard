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
    $('#stockArrivalDateDiv').datepicker().on('changeDate', function(ev){
      console.log(ev.date.valueOf());
      $('#stockArrivalDateDiv').datepicker('hide');
    });
});
