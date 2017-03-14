(function(){
  angular.module('standupApp', ['ui.router']).config(MainRouter);
  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: '/templates/landing.html',
      controller: 'authController',
      controllerAs: 'auth',
    })
    .state('pick-team', {
      url: '/pick-team',
      templateUrl: '/templates/pick-team.html',
      controller: 'projectController',
      controllerAs: 'project',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('teams', {
      url: '/teams',
      templateUrl: '/templates/teams.html',
      controller: 'projectController',
      controllerAs: 'project',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                  $state.go('landing', {url: '/'})}
              if (res.data.user) {
                $state.go('teams', {url: '/teams'});
              }
            })
          }
        }
      // resolve:{ logged: function($http, $state){
          // $http.get('/api/helpers/get-user')
          //   .then(function(res){
          //     if (!res.data.user) {
          //       $state.go('landing', {url: '/'});
          //     } else {
          //       if (res.data.user.reviews.length>0) {
          //         $state.go('tas.reviews', {url: 'tas/reviews'})
          //       } else {
          //         $state.go('tas.mytimecards', {url: 'tas/mytimecards'})
          //
          //       }
          //     }
          //   })
    })
    .state('standups', {
      url: '/standups',
      templateUrl: '/templates/standups.html',
      controller: 'projectController',
      controllerAs: 'project',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    $locationProvider.html5Mode({
      enabled: true,
      // requireBase: false
    });
    $urlRouterProvider.otherwise('/');
  }
})()
