$(document).ready(function(){
  $('#signIn').on('click', function(){
    $.ajax(TaskiApp.sessions(), {
      method: 'post',
      dataType: 'json',
      data: {
        'email' : $('#email').val(),
        'password' : $('#password').val(),
        'user_id' : localStorage.getItem('user_id')
      },
      success: function(user) {
        localStorage.setItem('user_id', user.id);
        window.location = 'html/home_page.html';
      },
      statusCode: {
          404: function(response) {
            $('.logForm').prepend($('<p class="warning">').text("incorrect username"));
          },
          403: function(response) {
            $('.logForm').prepend($('<p class="warning">').text("incorrect password"));
          },
          400: function(response) {
            $('.logForm').prepend($('<p class="warning">').text("incorrect data"));
          }
      },
    });
  });
});
