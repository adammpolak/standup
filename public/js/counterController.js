(function() {
  angular.module('websiteApp')
  .controller('counterController', counterController);
  counterController.$inject = ['$http', '$location', '$state', '$timeout'];

  function counterController($http, $location, $state, $timeout) {
    var self = this;
    this.number = 7;
    $http.get('/api/counters/')
    .then(function(response) {
      self.allCounters = response.data;
    })
    .catch(function(err) {
      console.log('err', err);
    })
    this.createCounter = function() {
      $http.post('/api/counters', {value: 0})
      .then(function(response) {
        self.allCounters.push(response.data)
      })
      .catch(function(err) {
        console.log(err)
      });
    }
    this.deleteCounter = function(index) {
      var id = self.allCounters[index]._id
      $http.delete(`/api/counters/${id}`)
      .then(function(response){
        self.allCounters.splice(index,1)
      })
    }
    this.addValue = function(index) {
      console.log('frank');
      var currentCounter = self.allCounters[index];
      currentCounter.value += 1;
      $http.put(`/api/counters`, currentCounter)
      .then(function(response){
        console.log(response);
      })
    }
    this.subtractValue = function(index) {
      var currentCounter = self.allCounters[index];
      currentCounter.value -= 1;
      $http.put(`/api/counters`, currentCounter)
      .then(function(response){
        console.log(response);
      })

    }
  }
})()
