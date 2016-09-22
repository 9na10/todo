$(document).ready(function(){
  $('.calendarIcon').on('click', function(){
    if($('.details').hasClass('calendarPlace')){
      $('.details').removeClass('calendarPlace');
      $('.details').find("#calendar").remove();
      $('.scheduleIcon').show();
    }else {
      $('.details').addClass('calendarPlace')
      $('.details').append($("<div id='calendar'>"));
      $('.scheduleIcon').hide();
      $.getJSON(TaskiApp.scheduled(), function(response) {
        var events = [];
        $.each(response, function(index,task){
          events.push({
            title: task.title,
            start: task.due_date,
            end: task.due_date
          });
        });
        // display all tasks in the right place in calendar; assignment of tasks to deadline;
        $('#calendar').fullCalendar({
          events: events
        });
      });
    }
  });
});
