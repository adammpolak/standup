(function() {
  angular.module('itvApp')
  .controller('projectController', projectController);
  projectController.$inject = ['$http', '$location', '$state', '$timeout', '$scope', '$window'];

  function projectController($http, $location, $state, $timeout, $scope, $window) {
    var self = this;
    this.number = 7;

    this.timecardFilter = "all"
    this.timecardSelected = "2017-01-22T08:00:00.000Z"
    this.availableDays = [{day:"monday"}, {day:"tuesday"}, {day:"wednesday"}, {day:"thursday"}, {day:"friday"}, {day: "saturday"}, {day: "sunday"}]

   this.setTimecardFilter = function(filter) {
     self.timecardFilter = filter
   }

   this.saveInitialActiveTimecardVersion = function() {
     self.savedActiveTimecard = angular.copy(self.activeTimecard)
   }



   this.setTimecard = function(timecard) {
     self.timecardSelected = timecard.weekending
     self.activeTimecard = timecard
     self.selectedDaysArray = [];
     self.highlightmonday = false
      self.highlighttuesday = false
      self.highlightwednesday = false
      self.highlightthursday = false
      self.highlightfriday = false
      self.highlightsaturday = false
      self.highlightsunday = false
      self.highlightObject = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
      }
     self.saveInitialActiveTimecardVersion()
   }
   this.isThisDayHighLighted = function(day) {
     if (day == "monday") {
       self.highlightmonday = !self.highlightmonday
     }if (day == "tuesday") {
       self.highlighttuesday = !self.highlighttuesday
     }if (day == "wednesday") {
       self.highlightwednesday = !self.highlightwednesday
     }if (day == "thursday") {
       self.highlightthursday = !self.highlightthursday
     }if (day == "friday") {
       self.highlightfriday = !self.highlightfriday
     }if (day == "saturday") {
       self.highlightsaturday = !self.highlightsaturday
     }if (day == "sunday") {
       self.highlightsunday = !self.highlightsunday
     }
   }
   self.activeTimecardsNumber = 0;
   self.rejectedTimecardsNumber = 0;
   self.approvalsTimecardsNumber = 0;
   self.approvedTimecardsNumber = 0;

   this.adjustSelectedDays = function(day) {
     if (day == "monday") {
       if (!self.highlightmonday) {
         //so if it is not highlighted that means it was unselected so remove
         for (var x = 0; x < self.selectedDaysArray.length; x++) {
           if (self.selectedDaysArray[x].day == "monday") {
             self.selectedDaysArray.splice(x,1)
           }
         }
       } if (self.highlightmonday) {
         //this means it was selected so add to the array
         self.selectedDaysArray.push({day: "monday", fields: self.activeTimecard.monday})
       }
     }
     if (day == "tuesday") {
       if (!self.highlighttuesday) {
         //so if it is not highlighted that means it was unselected so remove
         for (var x = 0; x < self.selectedDaysArray.length; x++) {
           if (self.selectedDaysArray[x].day == "tuesday") {
             self.selectedDaysArray.splice(x,1)
           }
         }
       } if (self.highlighttuesday) {
         //this means it was selected so add to the array
         self.selectedDaysArray.push({day: "tuesday", fields: self.activeTimecard.tuesday})
       }
     }
     if (day == "wednesday") {
       if (!self.highlightwednesday) {
         //so if it is not highlighted that means it was unselected so remove
         for (var x = 0; x < self.selectedDaysArray.length; x++) {
           if (self.selectedDaysArray[x].day == "wednesday") {
             self.selectedDaysArray.splice(x,1)
           }
         }
       } if (self.highlightwednesday) {
         //this means it was selected so add to the array
         self.selectedDaysArray.push({day: "wednesday", fields: self.activeTimecard.wednesday})
       }
     }
     if (day == "thursday") {
       if (!self.highlightthursday) {
         //so if it is not highlighted that means it was unselected so remove
         for (var x = 0; x < self.selectedDaysArray.length; x++) {
           if (self.selectedDaysArray[x].day == "thursday") {
             self.selectedDaysArray.splice(x,1)
           }
         }
       } if (self.highlightthursday) {
         //this means it was selected so add to the array
         self.selectedDaysArray.push({day: "thursday", fields: self.activeTimecard.thursday})
       }
     }
     if (day == "friday") {
       if (!self.highlightfriday) {
         //so if it is not highlighted that means it was unselected so remove
         for (var x = 0; x < self.selectedDaysArray.length; x++) {
           if (self.selectedDaysArray[x].day == "friday") {
             self.selectedDaysArray.splice(x,1)
           }
         }
       } if (self.highlightfriday) {
         //this means it was selected so add to the array
         self.selectedDaysArray.push({day: "friday", fields: self.activeTimecard.friday})
       }
     }
     if (day == "saturday") {
       if (!self.highlightsaturday) {
         //so if it is not highlighted that means it was unselected so remove
         for (var x = 0; x < self.selectedDaysArray.length; x++) {
           if (self.selectedDaysArray[x].day == "saturday") {
             self.selectedDaysArray.splice(x,1)
           }
         }
       } if (self.highlightsaturday) {
         //this means it was selected so add to the array
         self.selectedDaysArray.push({day: "saturday", fields: self.activeTimecard.saturday})
       }
     }
     if (day == "sunday") {
       if (!self.highlightsunday) {
         //so if it is not highlighted that means it was unselected so remove
         for (var x = 0; x < self.selectedDaysArray.length; x++) {
           if (self.selectedDaysArray[x].day == "sunday") {
             self.selectedDaysArray.splice(x,1)
           }
         }
       } if (self.highlightsunday) {
         //this means it was selected so add to the array
         self.selectedDaysArray.push({day: "sunday", fields: self.activeTimecard.sunday})
       }
     }

     self.adjustInputTimes();
   }

   this.selectedDaysArray = []


   this.adjustInputTimes = function() {
     if (self.selectedDaysArray.length == 0) {
       self.dayInputFields = {
         call: "",
         wrap: "",
         meal1out: "",
         meal1in: "",
         meal2out: "",
         meal2in: "",
         daytype: "",
         location: "",
         state: "",
         perdiem: false,
         projects: []
       }
     } else {
       var lastItem = this.selectedDaysArray.length - 1
       self.dayInputFields = angular.copy(self.selectedDaysArray[lastItem].fields)
     }
   }

   this.revertActiveTimecard = function() {
     self.activeTimecard = self.savedActiveTimecard
     self.dayInputFields = {
       call: "",
       wrap: "",
       meal1out: "",
       meal1in: "",
       meal2out: "",
       meal2in: "",
       daytype: "",
       location: "",
       state: "",
       perdiem: false,
       projects: []
     }
     self.highlightObject = {
       monday: false,
       tuesday: false,
       wednesday: false,
       thursday: false,
       friday: false,
       saturday: false,
       sunday: false
     }
     self.highlightmonday = false
     self.highlighttuesday = false
     self.highlightwednesday = false
     self.highlightthursday = false
     self.highlightfriday = false
     self.highlightsaturday = false
     self.highlightsunday = false

     self.selectedDaysArray = []
     self.saveInitialActiveTimecardVersion()
   }

   this.applyTimes = function() {
     for (var x = 0; x < self.selectedDaysArray.length; x++) {
       //this will set the timecards selected days equal to the input fields
       var day = self.selectedDaysArray[x].day
       self.activeTimecard[day] = self.dayInputFields
     }
     $http.put(`/api/users`, self.user)
     .then(function(response){
       console.log(response);
       self.dayInputFields = {
         call: "",
         wrap: "",
         meal1out: "",
         meal1in: "",
         meal2out: "",
         meal2in: "",
         daytype: "",
         location: "",
         state: "",
         perdiem: false,
         projects: []
       }
       self.saveInitialActiveTimecardVersion()
       self.revertActiveTimecard()
     })
   }

   this.highlightObject = {
     monday: false,
     tuesday: false,
     wednesday: false,
     thursday: false,
     friday: false,
     saturday: false,
     sunday: false
   }

   this.highlightRouter = function(day) {
     if (day == "monday") {
       self.highlightmonday = !self.highlightmonday
     }
     if (day == "tuesday") {
       self.highlighttuesday = !self.highlighttuesday
     }
     if (day == "wednesday") {
       self.highlightwednesday = !self.highlightwednesday
     }
     if (day == "thursday") {
       self.highlightthursday = !self.highlightthursday
     }
     if (day == "friday") {
       self.highlightfriday = !self.highlightfriday
     }
     if (day == "saturday") {
       self.highlightsaturday = !self.highlightsaturday
     }
     if (day == "sunday") {
       self.highlightsunday = !self.highlightsunday
     }
   }

   this.highlightmonday = false
   this.inputmonday = function() {
     self.dayInputFields = self.activeTimecard.monday
   }
   this.highlighttuesday = false
   this.inputtuesday = function() {
     self.dayInputFields = self.activeTimecard.tuesday
   }
   this.highlightwednesday = false
   this.inputwednesday = function() {
     self.dayInputFields = self.activeTimecard.wednesday
   }
   this.highlightthursday = false
   this.inputthursday = function() {
     self.dayInputFields = self.activeTimecard.thursday
   }
   this.highlightfriday = false
   this.inputfriday = function() {
     self.dayInputFields = self.activeTimecard.friday
   }
   this.highlightsaturday = false
   this.inputsaturday = function() {
     self.dayInputFields = self.activeTimecard.saturday
   }
   this.highlightsunday = false
   this.inputsunday = function() {
     self.dayInputFields = self.activeTimecard.sunday
   }

   this.dayInputFields = {
     call: "",
     wrap: "",
     meal1out: "",
     meal1in: "",
     meal2out: "",
     meal2in: "",
     daytype: "",
     location: "",
     state: "",
     perdiem: false,
     projects: []
   }

   this.firstLoadDisplayTimecard = function(date, timecards) {
     for (var x = 0; x < timecards.length; x++) {
       if (timecards[x].weekending == date) {
         self.activeTimecard = timecards[x]
         self.saveInitialActiveTimecardVersion()
         return
       }
     }
   }

   this.countTimecardStatuses = function(timecards) {
     self.activeTimecardsNumber = 0;
     self.rejectedTimecardsNumber = 0;
     self.approvalsTimecardsNumber = 0;
     self.approvedTimecardsNumber = 0;
     for (var x = 0; x < timecards.length; x++) {
       if (timecards[x].status == "active") {
         self.activeTimecardsNumber++
       }
       if (timecards[x].status == "rejected") {
         self.rejectedTimecardsNumber++
       }
       if (timecards[x].status == "approvals") {
         self.approvalsTimecardsNumber++
       }
       if (timecards[x].status == "approved") {
         self.approvedTimecardsNumber++
       }
     }
   }

   this.allReviews = [];

   this.reviewsApproveTimecard = function(index) {
     var now = new Date()
     var timecard = self.allReviews[index]
     var approverLength = timecard.approvalflow.length;
     var x = 0
     //check if user is last approver
     while (timecard.approvalflow[x]['approved'] == true) {
       x++
     }
     //check if need to change timecard status to approved
     if (approverLength = (x +1)) {
       timecard.status = 'approved'
     }

     timecard.approvalflow[x].approved = true //changed timecard status
    //update timecard history
     timecard.history.push({first: self.user.firstname, last: self.user.lastname, action: "approved", time: now})

     var owner = self.findUserById(timecard.ownerid) //find user
     //this part find this timecard in the owners timecards and updates it
     for (var y = 0; y< owner.timecards.length; y++) {
       if (owner.timecards[y]._id == timecard._id) {
         owner.timecards[y] = timecard
       }
     }
     var nextapprover = {}
     //now will add this timecard to "approved" timecards list, not full data so it will always have latest approval flow
     self.user.approved.push({ownerid: owner._id,timecardid: timecard._id})
     //remove this timecard from users reviews
     self.user.reviews.splice(index,1)
    //  update current user (Reviewer)
     $http.put(`/api/users`, self.user)
     .then(function(response){
       //update timecard owner
       $http.put(`/api/users`, owner)
       .then(function(response){
         //person is not the last approver, must put into next queue
         if (approverLength != (x +1)) {
           nextapprover = self.findUserById(timecard.approvalflow[x+1].id)
           nextapprover.reviews.push(timecard)
           //update next approver
           $http.put(`/api/users`, nextapprover)
           .then(function(response){
           })
         }
       })
     })
     .catch(function(err) {
       console.log(err)
     });
   }
   this.reviewsRejectTimecard = function(index) {
     var now = new Date()
     var timecard = self.allReviews[index]
     //update timecard history
     timecard.history.push({first: self.user.firstname, last: self.user.lastname, action: "rejected", time: now})
     //update timecard status
     timecard.status = 'rejected'
     timecard.approvalflow = []; //removes approval flow
     var owner = self.findUserById(timecard.ownerid) //find user
     //add the rejection comment
     timecard.comments.push({first: self.user.firstname, last: self.user.lastname, action: "rejected", time: now, text: self.rejectionComments})
     //this part find this timecard in the owners timecards and updates it
     for (var y = 0; y< owner.timecards.length; y++) {
       if (owner.timecards[y]._id == timecard._id) {
         owner.timecards[y] = timecard
       }
     }
     //remove this timecard from users reviews
     self.user.reviews.splice(index,1)
     //update
     $http.put(`/api/users`, self.user)
     .then(function(response){
       $http.put(`/api/users`, owner)
       .then(function(response){
       })
    })

   }

   this.checkUser = function() {
     $http.get('/api/helpers/get-user')
     .then(function(response) {
       if (response.data.user) {
         self.user = response.data.user
         self.countTimecardStatuses(self.user.timecards)
         self.firstLoadDisplayTimecard("2017-01-22T08:00:00.000Z", self.user.timecards)
         self.allReviews = self.user.reviews;
         self.amountOfReviews = self.user.reviews.length
       } else {
       }
     })
     .catch(function(err){
       console.log('err', err)
     })
   }
   this.checkUser()
   self.currentUserApprovalFlow = []
   this.currentApprovalFlow = function(tcflow) {
     //even though we have an approval flow it would be easier if it was in an array that was easy to reference
     if (tcflow) {
       for (var x = 1; x<6; x++) {
         if (tcflow[x]) {
           var currentApprover = self.findUserById(tcflow[x])
           self.currentUserApprovalFlow.push({level: x, id: currentApprover._id, approved: false, first: currentApprover.firstname, last: currentApprover.lastname})
         }
       }
     }
   }
   this.getMondayDate = function () {
     var temp = new Date()
     self.activeTimecard.weekending
     temp.setDate(self.activeTimecard.weekending.getDate()-6);
     console.log(temp);
   }

   this.rejectionComments = ''


   this.submitTimecardForApproval = function() {
     var now = new Date()
     self.activeTimecard.approvalflow = self.currentUserApprovalFlow //this attaches approval flow to tc
     self.activeTimecard.status = 'approvals' //changes tc status
     self.activeTimecard.history.push({first: self.user.firstname, last: self.user.lastname, action: "submitted", time: now}) //updates history
     var approver = self.findUserById(self.currentUserApprovalFlow[0].id)
     approver.reviews.push(self.activeTimecard) //puts it in the queue
     self.countTimecardStatuses(self.user.timecards)
    //  console.log(JSON.stringify(self.activeTimecard));
     $http.put(`/api/users`, self.user)
     .then(function(response){
       $http.put(`/api/users`, approver)
       .then(function(response){
       })
    })
   }
   this.rejectTimecardEmployee = function() {
     var now = new Date()
     self.activeTimecard.status = 'rejected' // changes status
     self.activeTimecard.history.push({first: self.user.firstname, last: self.user.lastname, action: "rejected", time: now})
     var approver = self.removeFromApproversQueue() //that updated the queue
     self.countTimecardStatuses(self.user.timecards)
     self.activeTimecard.approvalflow = []; //removes approval flow
     $http.put(`/api/users`, self.user)
     .then(function(response){
       $http.put(`/api/users`, approver)
       .then(function(response){
       })
    })
   }

   this.removeFromApproversQueue = function() {
     var x = 0
     while (self.activeTimecard.approvalflow[x].approved == true && x < self.activeTimecard.approvalflow.length) {
       x++
     }
     var approver = self.findUserById(self.activeTimecard.approvalflow[x].id)
     for (var x = 0; x < approver.reviews.length; x++) {
       if (approver.reviews[x]._id == self.activeTimecard._id) {
         approver.reviews.splice(x,1)
       }
     }
     return approver
   }


   this.makeTimecardApprovalFlow = function() {

   }

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



    this.updateActiveProject = function () {
      sessionStorage.setItem('activeProject', JSON.stringify(self.activeProject))
      //update in the database
      $http.put(`/api/projects`, self.activeProject)
      .then(function(response){
        console.log(response);
        $state.go("project_show")
      })
    };


    //tas-admin user stuff

    self.bulkApprovals = [{id: ''}];

    this.addApprovalLevel = function() {
      self.bulkApprovals.push({id: ""})
      console.log(self.bulkApprovals);
    }
    self.ptoApproval = ""

    this.removeApprovalLevel = function(index) {
      self.bulkApprovals.splice(index,1)
    }

    this.setBulkApprovals = function() {
      //prepare 1 user info
      //do loop over selected users doing find 1 and update

    }
    this.userFilter = 'all'

    this.setUserFilter = function(status) {
      self.userFilter = status
    }

    this.selectedUsers = []

    self.createSelectedUsersList = function() {
      self.selectedUsers = []
      for (var x= 0; x<self.allUsers.length; x++) {
        if (self.allUsers[x].selected) {
          self.selectedUsers.push(self.allUsers[x]);
        }
      }
    }

    self.setApprovals = function() {
      self.createSelectedUsersList()
      self.settingApprovals = true;
      sessionStorage.setItem('selectedUsers', JSON.stringify(self.selectedUsers))
      $state.go('tas-admin.users.setapprovals', {url: '/tas-admin/users/setapprovals'})
    }
    self.loadedUsers = JSON.parse(sessionStorage.getItem('selectedUsers'))

    self.settingApprovals = false;

    this.viewUser = function(user) {
      self.settingApprovals = true;
      sessionStorage.setItem('activeUser', JSON.stringify(user))
      $state.go('tas-admin.users.user', {url: '/tas-admin/users/user'})

    }
    if ($state.current.name == "tas-admin.users.user") {
      self.activeUser = JSON.parse(sessionStorage.getItem('activeUser'))
      self.loadedUsers.push(self.activeUser)
      if (self.activeUser.tcApprovalFlow) {
        self.bulkApprovals = []
        for (var x = 1; x<6; x++) {
          if (self.activeUser.tcApprovalFlow[x]) {
            self.bulkApprovals.push({id: self.activeUser.tcApprovalFlow[x]})
          }
        }
      }
      self.ptoApproval = self.activeUser.ptoApprovalFlow
      console.log("REMADE APPROVALS: "+JSON.stringify(self.bulkApprovals));
      console.log("LOADED USERS: "+ JSON.stringify(self.loadedUsers));
    }


    this.usersBreadCrumb = function() {
      $window.location.href = '/tas-admin/users';
    }

    this.selectedApprover = {}

    this.bulkUpdateApprovals = function() {
      //this part creates the approval flow object to be used
      var tcApprovalFlow = {}
      for (var x = 0; x < self.bulkApprovals.length; x++) {
        y = x + 1
        tcApprovalFlow[y] = self.bulkApprovals[x].id
      }
      //this part creates the PTO approval flow to be used
      var ptoApprovalFlow = ""
      ptoApprovalFlow = self.ptoApproval
      //this part goes through each user that is going to be affected
      for (var i = 0; i < self.loadedUsers.length; i++) {
        //this part checks to make sure peoples tcReviewerOf  and ptoReviewerOf is updated
        self.checkIfNewTCApprover(self.loadedUsers[i])
        self.checkIfStillTCApprover(self.loadedUsers[i])
        self.checkIfNewPTOApprover(self.loadedUsers[i])
        self.checkIfStillPTOApprover(self.loadedUsers[i])
        //this part creates the objects that will be sent to the update route
        var userWithFlows = {}
        userWithFlows._id = self.loadedUsers[i]._id
        userWithFlows.tcApprovalFlow = tcApprovalFlow
        userWithFlows.ptoApprovalFlow = ptoApprovalFlow
        console.log(JSON.stringify(userWithFlows));
        //this part actually updates the users with the new flow
        $http.put(`/api/users`, userWithFlows)
        .then(function(response){
          console.log(response);
        })
      }
      //this part brings us back to users with updated info
      self.usersBreadCrumb()
    }

    this.updateUser = function(userObj) {
      $http.put(`/api/users`, userObj)
      .then(function(response){
        console.log(response);
      })
    }

    this.checkIfNewTCApprover = function(user) {
      console.log("DOING NEW TC CHECK FOR: "+ user.firstname);
      for (var x = 0; x<self.bulkApprovals.length;x++) {
        var approver = self.bulkApprovals[x].id
        //currently going through each approval level and checking the approver id versus the users current tcApprovalFlow ids
        var alreadyApprover = false;
        for (var variable in user.tcApprovalFlow) {
          if (user.tcApprovalFlow.hasOwnProperty(variable)) {
            if (variable != '_id') {
              //now we are checking every level in flow
              if (approver == user.tcApprovalFlow[variable])
              alreadyApprover = true;
            }
          }
        }
        //now we are done with our check if alreadyApprover is still false which means this is a new approver we will update the approver's list
        if (!alreadyApprover) {
          console.log("THIS IS A NEW TC APPROVER");
          var approverObject = self.findUserById(approver)
          var revieweeObject = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname }
            var updatedApprover = {}
            updatedApprover._id = approverObject._id
            updatedApprover.tcReviewerOf = [];
            updatedApprover.tcReviewerOf = approverObject.tcReviewerOf
            updatedApprover.tcReviewerOf.push(revieweeObject)
            console.log(updatedApprover);
            $http.put(`/api/users`, updatedApprover)
            .then(function(response){
              console.log();
              console.log(response);
            })

        }
      }
    }

    this.checkIfStillTCApprover = function(user) {
      console.log("DOING STILL TC CHECK FOR: "+ user.firstname);
      for (var variable in user.tcApprovalFlow) {
        if (user.tcApprovalFlow.hasOwnProperty(variable)) {
          if (variable != '_id') {
            var approver = user.tcApprovalFlow[variable]
            //we are going through the users current flow and checking if there is a match with the new flow
            var stillApprover = false
            for (var x = 0; x<self.bulkApprovals.length;x++) {
              if (approver == self.bulkApprovals[x].id) {
                stillApprover = true
              }
            }
            //if it is no longer an approver we must update
            if (!stillApprover) {
              console.log("THIS IS A NOT STILL TC APPROVER");
              var approverObject = self.findUserById(approver)
                var updatedApprover = {}
                updatedApprover._id = approverObject._id
                var updatedApprovertcReviewerOf = []
                updatedApprovertcReviewerOf = approverObject.tcReviewerOf
                //in this space must remove user from reviewerof array
                for(var i = 0; i < updatedApprovertcReviewerOf.length; i++) {
                    if(updatedApprovertcReviewerOf[i].id == user._id) {
                        updatedApprovertcReviewerOf.splice(i, 1);
                    }
                }

                  updatedApprover.tcReviewerOf = updatedApprovertcReviewerOf
                  $http.put(`/api/users`, updatedApprover)
                  .then(function(response){
                    console.log(response);
                  })

            }

          }
        }
      }
    }

    this.findUserById = function(id) {
      for (var x = 0; x< self.allUsers.length; x++) {
        if (self.allUsers[x]._id == id) {
          return self.allUsers[x]
        }
      }
    }
    this.checkIfNewPTOApprover = function(user) {
      console.log("DOING NEW PTO CHECK FOR: "+ user.firstname);
      if (user.ptoApprovalFlow != self.ptoApproval) {
        console.log("THIS IS A NEW PTO APPROVER");
        var approverObject = self.findUserById(self.ptoApproval)
          var revieweeObject = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname }
            var updatedApprover = {}
            updatedApprover._id = approverObject._id
            updatedApprover.ptoReviewerOf = [];
            updatedApprover.ptoReviewerOf = approverObject.ptoReviewerOf
            updatedApprover.ptoReviewerOf.push(revieweeObject)
            console.log(updatedApprover)
            $http.put(`/api/users`, updatedApprover)
            .then(function(response){
              console.log(response);
            })
            .catch(function(err){
              console.log('err', err)
            })

      }
    }
    this.checkIfStillPTOApprover = function(user) {
      console.log("DOING STILL PTO CHECK FOR: "+ user.firstname);
      if (user.ptoApprovalFlow != self.ptoApproval && user.ptoApprovalFlow) {
        console.log("THIS IS NOT STILL A PTO APPROVER");
        var approverObject = self.findUserById(user.ptoApprovalFlow)
          if (approverObject.ptoReviewerOf) {

            var updatedApprover = {}
            updatedApprover._id = approverObject._id
            var updatedApproverptoReviewerOf = []
            updatedApproverptoReviewerOf = approverObject.ptoReviewerOf
            console.log();
            //in this space must remove user from reviewerof array
            for(var i = 0; i < updatedApproverptoReviewerOf.length; i++) {
              if(updatedApproverptoReviewerOf[i].id == user._id) {
                updatedApproverptoReviewerOf.splice(i, 1);
              }
            }
            updatedApprover.ptoReviewerOf = updatedApproverptoReviewerOf
            $http.put(`/api/users`, updatedApprover)
            .then(function(response){
              console.log(response);
            })
          }

      }
    }








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
      $http.post('api/users/login', {username: userObj.username, password: userObj.password})
      .then(function(res){

        if (res.data.message) {
          alert('Nice try nerd, that is not a user, get it together')
        } else {
          if (userObj.username == 'admin1@itv.com') {
            $window.location.href = '/tas-admin/users';
          } else {
            $window.location.href = '/tas/mytimecards';
          }
        }
      })
    }

    if ($state.current.name == "tas.approved") {
    }



    if ($state.current.name == "tas-admin.users" || $state.current.name == "tas-admin.users.setapprovals" || $state.current.name == "tas-admin.users.user" || $state.current.name == "tas.mytimecards" || $state.current.name == "tas.reviews" || $state.current.name == "tas.approved") {
      $http.get('/api/users/')
      .then(function(response) {
        self.allUsers = response.data;
        self.importedUsers = 0;
        self.invitesentUsers = 0;
        self.activeUsers = 0;
        self.currentApprovalFlow(self.user.tcApprovalFlow)
        for (var x=0; x<self.allUsers.length; x++) {
          if (self.allUsers[x].status == 'imported') {
            self.importedUsers++;
          } if (self.allUsers[x].status == 'invite sent') {
            self.invitesentUsers++;
          } if (self.allUsers[x].status == 'active') {
            self.activeUsers++;
          }
        }
        self.allApproved = []
        for (var x = 0; x<self.user.approved.length; x++) {

          var owner = self.findUserById(self.user.approved[x].ownerid)
          timecard_id = self.user.approved[x].timecardid
          for (var y = 0; y < owner.timecards.length; y++) {
            if (owner.timecards[y]._id == timecard_id) {
              self.allApproved.push(owner.timecards[y])
            }
          }
        }

      })
      .catch(function(err) {
        console.log('err', err);
      })
    }

    this.logout = function() {
      $http.delete('/api/users/logout')
      .then(function(response){
        // $state.go('landing',{}, {url: '/'});
        // window.location.reload(true);
        $window.location.href = '/';
      });
    }

    this.availableTimesCall = [
      "6:00am",
      "6:15am",
      "6:30am",
      "6:45am",
      "7:00am",
      "7:15am",
      "7:30am",
      "7:45am",
      "8:00am",
      "8:15am",
      "8:30am",
      "8:45am",
      "8:00am",
      "9:15am",
      "9:30am",
      "9:45am",
      "9:00am",
      "10:15am",
      "10:30am",
      "10:45am",
      "11:00am",
      "11:15am",
      "11:30am",
      "11:45am",
      "12:00pm",
      "12:15pm",
      "12:30pm",
      "12:45pm",
      "1:00pm",
      "1:15pm",
      "1:30pm",
      "1:45pm",
      "2:00pm",
      "2:15pm",
      "2:30pm",
      "2:45pm",
      "3:00pm",
      "3:15pm",
      "3:30pm",
      "3:45pm",
      "4:00pm",
      "4:15pm",
      "4:30pm",
      "4:45pm",
      "5:00pm",
      "5:15pm",
      "5:30pm",
      "5:45pm",
      "6:00pm",
      "6:15pm",
      "6:30pm",
      "6:45pm",
      "7:00pm",
      "7:15pm",
      "7:30pm",
      "7:45pm",
      "8:00pm",
      "8:15pm",
      "8:30pm",
      "8:45pm",
      "8:00pm",
      "9:15pm",
      "9:30pm",
      "9:45pm",
      "9:00pm",
      "10:15pm",
      "10:30pm",
      "10:45pm",
      "10:00pm",
      "11:15pm",
      "11:30pm",
      "11:45pm",
      "12:00am",
      "12:15am",
      "12:30am",
      "12:45am",
      "1:00am",
      "1:15am",
      "1:30am",
      "1:45am",
      "2:00am",
      "2:15am",
      "2:30am",
      "2:45am",
      "3:00am",
      "3:15am",
      "3:30am",
      "3:45am",
      "4:00am",
      "4:15am",
      "4:30am",
      "4:45am",
      "5:00am",
      "5:15am",
      "5:30am",
      "5:45am",
    ]
    this.availableTimesMeal1 = [
      "10:30am",
      "10:45am",
      "11:00am",
      "11:15am",
      "11:30am",
      "11:45am",
      "12:00pm",
      "12:15pm",
      "12:30pm",
      "12:45pm",
      "1:00pm",
      "1:15pm",
      "1:30pm",
      "1:45pm",
      "2:00pm",
      "2:15pm",
      "2:30pm",
      "2:45pm",
      "3:00pm",
      "3:15pm",
      "3:30pm",
      "3:45pm",
      "4:00pm",
      "4:15pm",
      "4:30pm",
      "4:45pm",
      "5:00pm",
      "5:15pm",
      "5:30pm",
      "5:45pm",
      "6:00pm",
      "6:15pm",
      "6:30pm",
      "6:45pm",
      "7:00pm",
      "7:15pm",
      "7:30pm",
      "7:45pm",
      "8:00pm",
      "8:15pm",
      "8:30pm",
      "8:45pm",
      "8:00pm",
      "9:15pm",
      "9:30pm",
      "9:45pm",
      "9:00pm",
      "10:15pm",
      "10:30pm",
      "10:45pm",
      "10:00pm",
      "11:15pm",
      "11:30pm",
      "11:45pm",
      "12:00am",
      "12:15am",
      "12:30am",
      "12:45am",
      "1:00am",
      "1:15am",
      "1:30am",
      "1:45am",
      "2:00am",
      "2:15am",
      "2:30am",
      "2:45am",
      "3:00am",
      "3:15am",
      "3:30am",
      "3:45am",
      "4:00am",
      "4:15am",
      "4:30am",
      "4:45am",
      "5:00am",
      "5:15am",
      "5:30am",
      "5:45am",
      "6:00am",
      "6:15am",
      "6:30am",
      "6:45am",
      "7:00am",
      "7:15am",
      "7:30am",
      "7:45am",
      "8:00am",
      "8:15am",
      "8:30am",
      "8:45am",
      "8:00am",
      "9:15am",
      "9:30am",
      "9:45am",
      "9:00am",
      "10:15am"
    ]
    this.availableTimesWrap = [
      "4:00pm",
      "4:15pm",
      "4:30pm",
      "4:45pm",
      "5:00pm",
      "5:15pm",
      "5:30pm",
      "5:45pm",
      "6:00pm",
      "6:15pm",
      "6:30pm",
      "6:45pm",
      "7:00pm",
      "7:15pm",
      "7:30pm",
      "7:45pm",
      "8:00pm",
      "8:15pm",
      "8:30pm",
      "8:45pm",
      "8:00pm",
      "9:15pm",
      "9:30pm",
      "9:45pm",
      "9:00pm",
      "10:15pm",
      "10:30pm",
      "10:45pm",
      "10:00pm",
      "11:15pm",
      "11:30pm",
      "11:45pm",
      "12:00am",
      "12:15am",
      "12:30am",
      "12:45am",
      "1:00am",
      "1:15am",
      "1:30am",
      "1:45am",
      "2:00am",
      "2:15am",
      "2:30am",
      "2:45am",
      "3:00am",
      "3:15am",
      "3:30am",
      "3:45am",
      "4:00am",
      "4:15am",
      "4:30am",
      "4:45am",
      "5:00am",
      "5:15am",
      "5:30am",
      "5:45am",
      "6:00am",
      "6:15am",
      "6:30am",
      "6:45am",
      "7:00am",
      "7:15am",
      "7:30am",
      "7:45am",
      "8:00am",
      "8:15am",
      "8:30am",
      "8:45am",
      "8:00am",
      "9:15am",
      "9:30am",
      "9:45am",
      "9:00am",
      "10:15am",
      "10:30am",
      "10:45am",
      "11:00am",
      "11:15am",
      "11:30am",
      "11:45am",
      "12:00pm",
      "12:15pm",
      "12:30pm",
      "12:45pm",
      "1:00pm",
      "1:15pm",
      "1:30pm",
      "1:45pm",
      "2:00pm",
      "2:15pm",
      "2:30pm",
      "2:45pm",
      "3:00pm",
      "3:15pm",
      "3:30pm",
      "3:45pm",
    ]
    this.availableStates = [
      "CA","AK","AL","AR","AZ","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","NY", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"
    ]
    this.availableProjects = [
      "FIS321",
      "DIR295",
      "QOV593",
      "DHS039",
      "DHE165",
      "NBG765",
      "SDF432",
      "AWD365",
      "TOI897",
      "DRF432",
      "FYT567",
      "SAQ123",
      "FRD435",
      "KOL098",
      "TCV576",
      "FDE321",
      "GBH765",
      "GYH789",
      "QAS234",
      "ZXD456",
      "1QW234",
      "ASW456",
      "CAS321",
      "GER432",
      "DSW321",
    ]
    this.availableDayTypes = [
      "WORK",
      "IDLE",
      "TRAVEL",
      "IDLE",
      "PTO"
    ]
    this.availableLocations = [
      "OFFICE",
      "ON LOCATION",
      "STUDIO",
      "OFF STUDIO"
    ]

  }
})()
