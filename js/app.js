"use strict";

var TaskiApp = {
  ApiURI: 'http://taski-backend.ovh.2501.pl:8888/',
  user_id: localStorage.getItem('user_id'),
  // GET /tasks
  tasksURI: function() {
    return this.ApiURI + 'tasks?user_id=' + this.user_id;
  },
  //GET /tasks/scheduled
  scheduled: function() {
    return this.ApiURI + 'tasks/scheduled?user_id=' + this.user_id;
  },
  // GET /tasks/:id
  taskURI: function(id) {
    return this.ApiURI + 'tasks/' + id + '?user_id=' + this.user_id;
  },
  // GET TaskiApp.taskURI(id) + '/unstar'
  unstar: function(id) {
    return this.ApiURI + 'tasks/' + id + '/unstar?user_id=' + this.user_id;
  },
  star: function(id) {
    return this.ApiURI + 'tasks/' + id + '/star?user_id=' + this.user_id;
  },
  check: function(id) {
    return this.ApiURI + 'tasks/' + id + '/check?user_id=' + this.user_id;
  },
  uncheck: function(id) {
    return this.ApiURI + 'tasks/' + id + '/uncheck?user_id=' + this.user_id;
  },
  // GET /projects
  projectsURI: function() {
    return this.ApiURI + 'projects?user_id=' + this.user_id;
  },
  // GET /projects/:id/tasks
  projectURI: function(id) {
    return this.ApiURI + 'projects/'+ id +'/tasks?user_id=' + this.user_id;
  },
  // GET /tasks/with_stars
  important: function() {
    return this.ApiURI + 'tasks/with_stars?user_id=' + this.user_id;
  },
  // POST /projects/:id
  delete: function(id) {
    return this.ApiURI + 'projects/' + id + '?user_id=' + this.user_id;
  },
  // POST /sessions
  sessions: function() {
    return this.ApiURI + '/sessions';
  }
};
