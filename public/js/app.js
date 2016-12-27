(function(){
  angular.module('websiteApp', ['ui.router']).config(MainRouter);
  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('counters', {
      url: '/counters',
      templateUrl: 'templates/counter.html',
      controller: 'counterController',
      controllerAs: 'counter'
    })
    .state('landing', {
      url: '/',
      templateUrl: 'templates/landing.html',
      controller: 'counterController',
      controllerAs: 'counter'
    });
  }
})()
