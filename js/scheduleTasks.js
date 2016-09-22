$(document).ready(function(){

  function removeNewTask(){
    $('.newTaskForm').empty();
    $('.addTask').show();
    $('.description').show();
  }

  $('.scheduleIcon').on('click', function(){
    removeNewTask();
    // toggle task list;
    if($('.details').hasClass('showAllTasks')) {
      $('.details').removeClass('showAllTasks');
      $('.scheduledTasks').remove();
    }else {
      $('.details').addClass('showAllTasks');
      $('.details').append(
        $('<ul class="scheduledTasks">')
      );
      $.getJSON(TaskiApp.scheduled(), function(response) {
        var orderedTasks = [];
        $.each(response, function(index,task){
          // display all tasks;
          orderedTasks.push(
            task.due_date + " " + task.title
          )
        });
        orderedTasks.sort();
        for(i=0; i<orderedTasks.length; i++){
          $('.scheduledTasks').append($('<li>').text(orderedTasks[i]));
        }
      });
    }
  });
});
