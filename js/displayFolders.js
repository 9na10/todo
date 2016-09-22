$(document).ready(function(){
  displayLastFolder();
  displayLastFolderTasks();
  displayMenuFolders();
  $('.folders').on('click', '.add_folder', showNewFolderWindow);
  $('.colors').on('click', setChosenColor);
  $('.save_folder').on('click', saveNewFolderSettings);
  $('.folders').on('click', '.trashFolder', removeFolders);
  $('.remove_in_settings_new_projects').on('click', removeSettingsFolder);
  $('.remove_folder').on('click', removeSettingsFolder);
  $('.folders').on('click', '.folder, .important', displayFolderTasks);
  $('.folders').on('click', '.folder, .important', setActiveFolder);

  function displayLastFolder() {
    // display name FOLDERS when user log in first time;
    if (localStorage.getItem('chosenFolderId')===null){
      $('.home_page').val("PROJECTS");
    }else{
      $('.home_page').text(localStorage.getItem('chosenFolderName'));
    }
  }

  function displayLastFolderTasks() {
    var chosenFolder = localStorage.getItem('chosenFolderId');

    if(chosenFolder === null || chosenFolder === "undefined") {
      // exit from function if don't found chosen folder;
      return;
    }
    // display all tasks from chosen folder;
    $.ajax(TaskiApp.projectURI(chosenFolder), {
      method:'get',
      dataType:'json',
      success: function(response){
        $.each(response, displayTask);
      }
    });
  }
  // display folder menu;
  function displayMenuFolders() {
    $.ajax(TaskiApp.projectsURI(), {
      method: 'get',
      dataType: 'json',
      success: function(response){
        $.each(response, displayFolder);
        addFolderButton();
        // delete event handler after hover folder list -
        // it prevents duplicated trash icon;
        removeEventHandler();
        addTrashIcon();
      }
    });
  }
  // display name chosen folder;
  function setActiveFolder() {
    var id = $(this).data('folderId');
    var name = $(this).text();
    $('.home_page').text(name);
    // write to localStorage chosen folder;
    localStorage.setItem('chosenFolderId', id);
    localStorage.setItem('chosenFolderName', name);
  }

  // settings for create new folder;
  function showNewFolderWindow(){
    $('.settings_new_projects').show();
  }
  function setChosenColor() {
    // create border after click; user see what he is clicking now;
    $('.colors').removeClass('changeBorder');
    $(this).addClass('changeBorder');
    // attribution chosen foler color to input value;
    $('#chosenColor').val($(this).data('color'));
  }
  function saveNewFolderSettings(event){
    event.preventDefault();
    $.ajax(TaskiApp.projectsURI(), {
      type:'post',
      dataType: 'json',
      data: $('.settings_new_projects').serialize() + '&user_id='+localStorage.getItem('user_id'),
      success: function(folder){
        removeSettingsFolder();
        displayFolder(undefined, folder);
      }
    });
  }
  function removeSettingsFolder(event){
    event.preventDefault();
    // transferring add_folder button in last place in the list of projects;
    $('.folders').append($('.add_folder'));
    //clear input wrere user write new folder name;
    $('#folderName').val('');
    $('.settings_new_projects').hide();
  }

  // delete event handler after hover folder list - it prevents duplicated trash
  // icon;
  function removeEventHandler() {
    $('.folder').off('mouseenter mouseleave');
  }
  function displayFolder(index, folder){
    $('.folders').append(
      $("<li class='folder'>")
        .data('folderId', folder.id)
        .prepend($('<a href="#">').html(folder.name))
        //attribution color from chosen folder;
        .prepend($("<span class='glyphicon glyphicon-stop'>").css("color", folder.color))
    );
    removeEventHandler();
    addTrashIcon();
  }
  // possibility add new folder;
  function addFolderButton(){
    $('.folders').append(
      $('<li class="add_folder">Add folder</li>')
        .prepend($("<span class='glyphicon glyphicon-plus'>"))
    );
  }
  // add trash icon;
  function addTrashIcon() {
    $('.folder').hover(
      function(){
        $(this).append($("<span class='glyphicon glyphicon-trash trashFolder'></span>"));
      },
      function() {
        $(this).find('span:last').remove();
      }
    );
  }
  // remove folder;
  function removeFolders(event){
    event.stopPropagation();
    event.preventDefault();
    // return <li>;
    var removeFolder = $(this).closest('.folder');
    var id = removeFolder.data('folderId');
    var nameFolder = removeFolder.find('a').text();
    var confirmation = confirm("Are you sure you want delete " + nameFolder);
    if (confirmation === true) {
      $.ajax(TaskiApp.delete(id), {
        type: 'post',
        data: {"_method": "delete",
              "user_id": "localStorage.getItem(user_id)"
        },
        success: function(result){
          removeFolder.remove();
        }
      });
    }
  }

  function displayTask(index,task){
    $('.tasks').append(
      $('<li>')
        .append(
          $('<span>')
            .data('taskId', task.id)
            .addClass("glyphicon glyphicon-star")
        )
      .append($('<input type="checkbox" class="js_checkbox">'))
      .append(task.content)
    );
    if(task.flagged === true){
      $('.tasks .glyphicon.glyphicon-star').last().addClass('yellow');
    }
    if(task.done === true){
      $('.tasks li').last().addClass('changeBackground');
      $('.tasks li').last().find('input').prop('checked', true);
      $('.tasks .glyphicon.glyphicon-star').last().removeClass('yellow');
    }
  }
  // return all tasks in chosen foler;
  function displayFolderTasks(){
    $('.tasks li').remove();
    if($(this).hasClass('important')){
      var url = TaskiApp.important();
    } else if($(this).hasClass('folder')) {
      var id = $(this).data('folderId');
      var url = TaskiApp.projectURI(id);
    }

    (function displayTasks(){
      $.ajax(url, {
        method: 'get',
        dataType: 'json',
        success: function(response) {
          $.each(response, displayTask);
        }
      });
    })();
  }
});
