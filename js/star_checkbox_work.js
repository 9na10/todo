$(document).ready(function(){

  $('body').on('click', '.glyphicon.glyphicon-star', function(){
    var id = $(this).data('taskId');
    var el = $(this);
    if(el.hasClass('yellow')){
      // uncheck star status;
      $.ajax(TaskiApp.unstar(id),{
        method: 'get',
        success: function(){
          el.removeClass('yellow');
        }
      })
      // check star status;
    } else {
      $.ajax(TaskiApp.star(id),{
        method: 'get',
        success: function(){
          el.addClass('yellow');
        }
      });
    }
  });
  $('body').on('click', '.js_checkbox', function(){
    var id = $(this).parent().find('span').data('taskId');
    var input = $(this);
    if(input.prop('checked')){ 
      $.ajax(TaskiApp.check(id),{
        method: 'get',
        success: function(){
          input.parent().addClass('changeBackground');
          input.parent().find('span').removeClass('yellow');
        }
      });
    }else{
      $.ajax(TaskiApp.uncheck(id),{
        method: 'get',
        success: function(){
          input.parent().removeClass('changeBackground');
          input.parent().find('span').addClass('yellow');
        }
      });
    }
  });
});
