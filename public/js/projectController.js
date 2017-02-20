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
        var teamIndex = JSON.parse(sessionStorage.getItem('teamIndex'))
        self.activeTeam = self.userTeams[teamIndex]
        self.runBlockersCount()
      }
    }
    this.runBlockersCount = function() {
      self.activeBlockersCount = (_.filter(self.activeTeam.blockers, ['activestatus', true]).length)
      self.upcomingBlockersCount = (_.filter(self.activeTeam.blockers, ['activestatus', false]).length)
    }

    this.showStandups = function(index) {
      sessionStorage.setItem('teamIndex', JSON.stringify(index))
      $state.go('standups', {url: '/standups'});
    }


    this.addActiveBlocker = function(activeBlocker) {
      if (activeBlocker) {
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
      if (upcomingBlocker) {
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


    this.addToDo = function () {

    }

    this.saveStandUp = function() {

    }

    this.now = new Date();
    this.travelIntoTheFutureADay = function() {

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
