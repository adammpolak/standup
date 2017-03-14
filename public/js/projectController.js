(function() {
  angular.module('standupApp')
  .controller('projectController', projectController);
  projectController.$inject = ['$http', '$location', '$state', '$timeout', '$scope', '$window', 'logged'];

  function projectController($http, $location, $state, $timeout, $scope, $window, logged) {
    var self = this;

    $http.get('/api/helpers/get-user')
    .then(function(response) {
      if (response.data.user) {
        self.user = response.data.user
        self.userTeams = []
        _.forEach(self.user.teams, function(item) {
          $http.get(`api/teams/${item}`)
          .then(function(response){
            self.userTeams.push(response.data)
            //this checks that all data has been collected and then fires func.
            if (self.userTeams.length == self.user.teams.length) {
              self.displayActiveTeam()
            }
          })
        })
      }
    })
    .catch(function(err){
      console.log('err', err)
    })

    this.displayActiveTeam = function() {
      if ($state.current.name == "standups") {
        var teamID = JSON.parse(sessionStorage.getItem('teamID'))
        $http.get(`api/teams/${teamID}`)
        .then(function(response){
          self.activeTeam = response.data
          self.runBlockersCount();
          self.saveStandups();
        })
      }
    }

    this.runBlockersCount = function() {
      self.activeBlockersCount = (_.filter(self.activeTeam.blockers, ['activestatus', true]).length)
      self.upcomingBlockersCount = (_.filter(self.activeTeam.blockers, ['activestatus', false]).length);
    }

    this.showStandups = function(teamID) {
      sessionStorage.setItem('teamID', JSON.stringify(teamID))
      $state.go('standups', {url: '/standups'});
    }


    this.addActiveBlocker = function(activeBlocker) {
      if (activeBlocker && activeBlocker.name != "") {
        var blocker = {
          name: activeBlocker.name,
          owner: self.user.firstname + " " + self.user.lastname,
          ownerid: self.user._id,
          activestatus: true,
          resolved: false,
        }
        $http.post('api/blockers/', blocker)
        .then(function(blockerresponse){
          activeBlocker.name = "";
          activeBlocker = null;
          self.activeTeam.blockers.push(blockerresponse.data)
          $http.put(`api/teams/`, self.activeTeam)
          .then(function(response){
            console.log(response.data);
            self.activeTeam = response.data
            self.runBlockersCount()
          })
        })
      }
    }

    this.expandCommentSection = function(item) {
      item.show = !item.show
    }

    this.showAllComments = function(item) {
      item.showAllComments = !item.showAllComments
    }

    this.addComment = function(blocker) {
      if (blocker.commentinput != "") {
        var comment = {
          text: blocker.commentinput,
          owner: self.user.firstname + " " + self.user.lastname,
          ownerid: self.user._id,
        }
        $http.post('api/notes/', comment)
        .then(function(commentresponse){
          blocker.commentinput = "";
          blocker.comments.push(commentresponse.data)
          blocker.show = false;
          blocker.showAllComments = false;
          $http.put(`api/blockers/`, blocker)
          .then(function(blockerresponse){
            $http.put(`api/teams/`, self.activeTeam)
            .then(function(teamresponse){
              self.activeTeam = teamresponse.data
            })
          })
        })
      }
    }

    this.resolveBlocker = function(blocker, index) {
      var rightNow = new Date()
      blocker.resolved = true;
      blocker.resolved_at = rightNow;
      blocker.show = false;
      blocker.showAllComments = false;
      $http.put(`api/blockers/`, blocker)
      .then(function(blockerresponse){
        self.activeTeam.blockers.splice(index,1)
        self.activeTeam.resolvedblockers.push(blockerresponse.data)
        $http.put(`api/teams/`, self.activeTeam)
        .then(function(teamresponse){
          self.activeTeam = teamresponse.data
          self.runBlockersCount()
        })
      })
    }

    this.addUpcomingBlocker = function(upcomingBlocker) {
      if (upcomingBlocker  && upcomingBlocker .name != "") {
        var blocker = {
          name: upcomingBlocker.name,
          owner: self.user.firstname + " " + self.user.lastname,
          ownerid: self.user._id,
          activestatus: false,
          resolved: false,
        }
        $http.post('api/blockers/', blocker)
        .then(function(blockerresponse){
          upcomingBlocker.name = "";
          self.activeTeam.blockers.push(blockerresponse.data)
          $http.put(`api/teams/`, self.activeTeam)
          .then(function(response){
            console.log(response.data);
            self.activeTeam = response.data
            self.runBlockersCount()
          })
        })
      }
    }
    this.escalateBlocker = function(blocker, index) {
      blocker.activestatus = true;
      blocker.show = false;
      blocker.showAllComments = false;
      $http.put(`api/blockers/`, blocker)
      .then(function(blockerresponse){
        $http.put(`api/teams/`, self.activeTeam)
        .then(function(teamresponse){
          self.activeTeam = teamresponse.data
          self.runBlockersCount()
        })
      })
    }

    this.todos = [{text: ""}]
    this.addToDo = function () {
      this.todos.push({text: ""})
    }
    this.removeToDo = function (index) {
      self.todos.splice(index,1);
    }

    this.saveStandUp = function() {
      var now = new Date(); //used for when items were completed
      //this creates an array of only completed standup items (to be archived)
      var completedarray = _.filter(self.activeTeam.standups, function(o) { return o.completed; })
      var totalCompleted = completedarray.length;
      var totalCompletedSaved = 0;
      //removes completed item (that will be archived) from current standups
      _.remove(self.activeTeam.standups,{completed: true})
      //prepares todos (the number of them and cleans out bad data)
      _.remove(self.todos,{text: ""})
      var totalTodoPosted = 0;
      var totalTodos = self.todos.length;

      //save each of completed items as saved
      _.forEach(completedarray, function(standup, index) {
        standup.completed_at= now;
        $http.put(`api/standupitems/`, standup)
        .then(function(standupitemresponse) {
          totalCompletedSaved++
          standupitem = standupitemresponse.data
          //we push the updated standup item into archived standups in this team
          self.activeTeam.archivedstandups.push(standupitem)
          //all completed items have been updated and moved to archives so now we move onto todo items that need to be created
          if (totalCompleted = totalCompletedSaved) {
            _.forEach(self.todos, function(todo) {
              todo.owner = self.user.firstname + " " + self.user.lastname;
              todo.owernid = self.user._id;
              todo.completed = false;
              todo.team = self.activeTeam._id;
              $http.post('api/standupitems/', todo)
              .then(function(standupresponse){
                totalTodoPosted++;
                self.activeTeam.standups.push(standupresponse.data);
                //once every todo item has become a standup item and moved into the active Team current standups we save the entire team
                if (totalTodoPosted == totalTodos) {
                  console.log(self.activeTeam);
                  $http.put(`api/teams/`, self.activeTeam)
                  .then(function(teamresponse){
                    self.activeTeam = teamresponse.data;
                    self.todos = [{text: ""}];
                    self.runBlockersCount();
                    self.saveStandups();
                  })
                }
              })
            })
          }
        })
      })
    }
    this.saveStandups = function() {
      self.savedStandUps = angular.copy(self.activeTeam.standups)
    }
    this.revertStandups = function() {
      self.todos = [{text: ""}]
      self.activeTeam.standups = self.savedStandUps
      self.saveStandups();
    }

    this.now = new Date();
    this.travelIntoTheFutureADay = function() {

    }

    this.logout = function() {
      $http.delete('/api/users/logout')
      .then(function(response){
        // $state.go('landing',{}, {url: '/'});
        // window.location.reload(true);
        $window.location.href = '/';
      });
    }








    this.noActiveBlockersArray = [
        "Enjoy it while you can!",
        "Holy moly who would have thought it could happen",
        "No go forth and crush!",
        "Nice job clearing out those bad boys!",
        "AWWW YEEAAAAAA, go on with yo bad self",
        "Turn UP for no blockers",
        "You came, you saw, you obliterated blockers",
        "You go Glen Coco!",
        "Ohhhhhh yeaaaaa, this project is going to MOVE",
        "Can't stop, won't stop, NO LIMIT SOLDIERS!!!",
      ]
      this.activeEmptyMessage = _.sample(self.noActiveBlockersArray)
      this.upcomingEmptyMessage = _.sample(self.noActiveBlockersArray)



  }
})()
