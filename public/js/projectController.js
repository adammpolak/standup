(function() {
  angular.module('websiteApp')
  .controller('projectController', projectController);
  projectController.$inject = ['$http', '$location', '$state', '$timeout'];

  function projectController($http, $location, $state, $timeout) {
    var self = this;
    this.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
   }

    $http.get('/api/helpers/get-user')
      .then(function(response) {
        if (response.data.user) {
          self.isAdam = true
          console.log("it's ya boy");
        }
      })
      .catch(function(err){
        console.log('err', err)
      })

    $http.get('/api/projects/')
    .then(function(response) {
      self.allProjects = response.data;
    })
    .catch(function(err) {
      console.log('err', err);
    })

    this.displayProject = function(id) {
      sessionStorage.setItem('activeProjectId', JSON.stringify(id))
      $state.go('project_show')
    }

    this.findProject = function() {
      if ($state.current.name == 'project_show') {
        self.activeProjectId = JSON.parse(sessionStorage.getItem('activeProjectId'));
        $http.get(`/api/projects/${self.activeProjectId}`)
        .then(function(response){
          self.activeProject = response.data;
          sessionStorage.setItem('activeProject', JSON.stringify(self.activeProject))
        })
      } else {
        this.activeProject = JSON.parse(sessionStorage.getItem('activeProject'));
      }
    }
    this.findProject()
    console.log(self.activeProject);


    this.deleteProject = function() {
      $http.delete(`/api/projects/${self.activeProject._id}`)
      .then(function(response){
        // self.allProjects.splice(index,1)
        $state.go("landing")
      })
    }

    this.addProject = function() {
      $http.post('/api/projects', self.activeProject)
      .then(function(response) {
        $state.go('landing');
      })
      .catch(function(err) {
        console.log(err)
      });
    }

    this.newProject = function() {
      self.activeProject = {name: '', imgsrc: '', short_description: "", long_description: "", links: [{description: "", address: ""}]};
      sessionStorage.setItem('activeProject', JSON.stringify(self.activeProject));
      $state.go('project_new');
    }

    this.addLink = function() {
      self.activeProject.links.push({description: "", address: ""})
    }

    this.removeLink = function(index) {
      self.activeProject.links.splice(index,1)
    }

    this.updateActiveProject = function () {
      sessionStorage.setItem('activeProject', JSON.stringify(self.activeProject))
      //update in the database
      $http.put(`/api/projects`, self.activeProject)
      .then(function(response){
        console.log(response);
        $state.go("project_show")
      })
    };


    //email stuff

    this.sendEmail = function(emailObject) {
      $http.post('api/helpers/email', emailObject)
      .then(function(response){
        emailObject.emailAddress = "";
        emailObject.emailSubject = "";
        emailObject.emailBody = "";
      })
    }


    //user stuff





    this.register = function(userObj){
      $http.post('api/users/register', {username: userObj.usernamereg, password: userObj.passwordreg})
        .then(function(res){
          if (res.data.message){
            $state.go('landing', {url: '/'});
          } else {
            $state.go('devices_all', {url: '/devices'});
            userObj.passwordreg = '';
            userObj.usernamereg = '';
          }
        })
    }

    this.login = function(userObj){
      $http.post('api/users/login', {username: "Adam", password: userObj.password})
      .then(function(res){
        if (res.data.message) {
          alert('Nice try nerd, that is not a user, get it together')
        } else {
          self.user = res.data.user;
          self.isAdam = true;
          $state.go('landing', {reload: true});
          window.location.reload(true);
        }
      })
    }
    this.userObject;

    this.logout = function() {
      $http.delete('/api/users/logout')
      .then(function(response){
        $state.go('landing',{}, {url: '/'});
        window.location.reload(true);
      });
    }
  }
})()
