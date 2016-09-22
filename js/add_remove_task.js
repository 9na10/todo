$(document).ready(function(){
  $('.addTask').on('click', addNewTask);
  $('body').on('click', '.removalTask', serviceRemoveButton);
  $('body').on('click','.saveTask', sendTaskSettings);

  function removeNewTask(){
    $('.newTaskForm').empty();
    $('.addTask').show();
    $('.description').show();
  }

  function addNewTask(){
    hideElements();
    settingsNewTask();
    enableDatepicker();
    loadFolders();
    displaySelect2();
    // WARNING: only when select2 framework is completly loaded - last chosen;
    // folder is displayed;
    setTimeout(showLastFolder, 200);

    function hideElements(){
      $('.addTask').hide();
      $('.description').hide();
    }

    function settingsNewTask(){
      var formShow =
        $('<textarea class="form-control" rows="4" placeholder="Please, write your task here..." autofocus></textarea>');
      var saveTask = $('<input type="submit" value="Zapisz" class="btn btn-primary saveTask">');
      var removalTask = $('<button class="btn btn-danger removalTask">Remove</button>');

      $('.newTaskForm').prepend(formShow);
      $('.newTaskForm').append($("<div class='deadline'>")
        .append("<span class='glyphicon glyphicon-stop'>")
        .append("Deadline:")
        .append("<input type='text' class='form-control deadline_calendar'>")
      );
      $('.newTaskForm').append($("<div class='folderSelection'>")
        .append("<span class='glyphicon glyphicon-stop'>")
        .append("Folder selection:")
        .append('<select class="selectFolder"></select>')
      );
      $('.newTaskForm').append($('<div class="inputStore">')
        .append(saveTask)
        .append(removalTask)
      );
    }// end function settingsNewTask;

    // use of library select2;
    function displaySelect2(){
      $('.selectFolder').select2();
    }
    // display last folder, according to last chosen folder by user;
    // using localStorage;
    function showLastFolder(){
      $('.selectFolder').val(localStorage.getItem('chosenFolderId')).trigger("change");
    }

    function enableDatepicker(){
      $('.deadline_calendar').datepicker({
       format: "yyyy-mm-dd",
       todayHighlight: true
      });
    }
    // display folder in select;
    function displayFolder(index, folder){
      $('.selectFolder').append(
        $("<option class='optionFolder'></option>")
          .attr('value', folder.id).text(folder.name)
      );
    }
    // load all folders;
    function loadFolders(){
      $.ajax(TaskiApp.projectsURI(), {
        method: 'get',
        dataType: 'json',
        success: function(response){
          // appear list folder in select;
          $.each(response, displayFolder);
        }
      });
    }
  }// END function addNewTask;

  // before remove settings for new task - appear question;
  // are you sure to want clear all settings;
  function serviceRemoveButton(event){
    event.preventDefault();

    var question_for_sure =
      $('<p class="question_for_sure">Are you sure you want delete task?</p>');
    var confirm = $('<button class="yes">Confirm</button>');
    var no = $('<button class="no">Remove</button>');

    if($('textarea').val().length > 0) {
      $('.details')
        .append(question_for_sure.append(confirm).append(no))
      $('.yes').on('click', function(){
        $('.question_for_sure').hide();
        removeNewTask();
      });
      $('.no').on('click', function(){
        $('.question_for_sure').hide();
        $('.description').show();
      });
    }else{
      removeNewTask();
      $('.newTaskForm').html("");
    }
  } // END function serviceRemoveButton
  function sendTaskSettings(event){
    // necessary application preventDefault; it prevents refreshing page;
    // before send setting to server;
    event.preventDefault();
    $.ajax(TaskiApp.tasksURI(), {
      method: 'post',
      // send to server information about new task (content; id; due_date);
      data: {
        // send to server information about id user with new task settings;
        "user_id": localStorage.getItem('user_id'),
        "content" : $('textarea').val(),
        "project_id" : $('.selectFolder').val(),
        "due_date" : $('.deadline_calendar').val()
      },
      success: function(response){
        // clear textarea, show the view before the change;
        removeNewTask();
      }
    });
  } // END sendTaskSettings;
});
