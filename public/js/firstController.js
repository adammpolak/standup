(function() {
  angular.module('boilerApp')
  .controller('firstController', firstController);
  firstController.$inject = ['$http', '$location', '$state', '$timeout'];

  function firstController($http, $location, $state, $timeout) {
    var self = this;
    this.number = 7;


  }
})()
