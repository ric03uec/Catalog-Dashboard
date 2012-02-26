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
    loadScript('/js/newSku.js');
    initDatePickers();
});

var initDatePickers = function(){
  $('#stockArrivalDateDiv').datepicker().on('changeDate', function(ev){
    console.log(ev.date.valueOf());
    $('#stockArrivalDateDiv').datepicker('hide');
  });

  $('#launchDateDiv').datepicker().on('changeDate', function(ev){
    $('#launchDateDiv').datepicker('hide');   
  });
  
  $('#contentAssignDateDiv').datepicker().on('changeDate', function(ev){
    $('#contentAssignDateDiv').datepicker('hide');   
  });
  
  $('#editingCompDateDiv').datepicker().on('changeDate', function(ev){
    $('#editingCompDateDiv').datepicker('hide');   
  });
  
  $('#catalogSubDateDiv').datepicker().on('changeDate', function(ev){
    $('#catalogSubDateDiv').datepicker('hide');   
  });
  
  $('#approvedDateDiv').datepicker().on('changeDate', function(ev){
    $('#approvedDateDiv').datepicker('hide');   
  });  
  
  $('#photoCompleteDateDiv').datepicker().on('changeDate', function(ev){
    $('#photoCompleteDateDiv').datepicker('hide');   
  });
  
  $('#imageAssignDateDiv').datepicker().on('changeDate', function(ev){
    $('#imageAssignDateDiv').datepicker('hide');   
  });
}
