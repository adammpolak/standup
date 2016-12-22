(function(){
  angular.module('websiteApp', ['ui.router']).config(MainRouter);
  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('nameOfState', {
      url: '/nameOfState',
      templateUrl: 'templates/firstTemplate.html',
      controller: 'firstController',
      controllerAs: 'first'
    });
  }
})()
