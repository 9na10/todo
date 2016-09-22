// display: content, created_at, updated_at tasks;
$(document).ready(function(){
  $('body').on('click', '.tasks li', function(){
    var id = $(this).find('span').data('taskId');
    $.ajax(TaskiApp.taskURI(id), {
      method: 'get',
      dataType: 'json',
      success: function(descripions){
        $('.description').html('')
          .append(
            $('<h2>')
              .html("TITLE:" + " " + descripions.content)
          )
          .append(
            $('<p>').html("CREATED AT:" + " " + descripions.created_at)
          )
          .append(
            $('<p>').html("UPDATED AT:" + " " + descripions.updated_at)
          )
          .append(
            $('<p>').html("DUE DATE:" + " " + descripions.due_date)
          );
      }
    });
  });
});
