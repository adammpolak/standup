(function(){
  angular.module('itvApp', ['ui.router', "angucomplete-alt", 'localytics.directives']).config(MainRouter);
  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: '/templates/signin.html',
      controller: 'projectController',
      controllerAs: 'project',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (res.data.user) {
                $state.go('tas.mytimecards', {url: '/tas/mytimecards'});
              }
            })
          }
        }
    })
    .state('tas', {
      url: '/tas',
      templateUrl: '/templates/tas.html',
      controller: 'projectController',
      controllerAs: 'project',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              } else {
                $state.go('tas.mytimecards', {url: 'tas/mytimecards'})
              }
            })
          }
        }
    })
    .state('tas-admin', {
      url: '/tas-admin',
      templateUrl: '/templates/tas-admin.html',
      controller: 'projectController',
      controllerAs: 'project',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              } else {
                $state.go('tas-admin.users', {url: 'tas-admin/users'})
              }
            })
          }
        }
    })
    .state('tas.mytimecards', {
      url: '/mytimecards',
      templateUrl: '/templates/tas/mytimecards.html',
      controller: 'projectController',
      controllerAs: 'project',
      // views: {
      //   'leftnav': {
      //     templateUrl: '/templates/tas/mytimecards/leftnav.html'
      //   },
      //   'timecard': {
      //     templateUrl: '/templates/tas/mytimecards/leftnav.html'
      //   }
      // }
    })
    // .state('tas.mytimecards.leftnav', {
    //   // url: '/tas/mytimecards',
    //   templateUrl: '/templates/tas/mytimecards/leftnav.html',
    //   controller: 'projectController',
    //   controllerAs: 'project'
    // })
    // .state('tas.mytimecards.timecard', {
    //   // url: '/tas/mytimecards',
    //   templateUrl: '/templates/tas/mytimecards/timecard.html',
    //   controller: 'projectController',
    //   controllerAs: 'project'
    // })
    .state('tas.pto', {
      url: '/pto',
      templateUrl: '/templates/tas/pto.html',
      controller: 'projectController',
      controllerAs: 'project'
    })
    .state('tas.reviews', {
      url: '/reviews',
      templateUrl: '/templates/tas/reviews.html',
      controller: 'projectController',
      controllerAs: 'project'
    })
    .state('tas.approved', {
      url: '/approved',
      templateUrl: '/templates/tas/approved.html',
      controller: 'projectController',
      controllerAs: 'project'
    })
    .state('tas-admin.users', {
      url: '/users',
      templateUrl: '/templates/tas-admin/users.html',
      controller: 'projectController',
      controllerAs: 'project'
    })
    .state('tas-admin.users.setapprovals', {
      url: '/setapprovals',
      templateUrl: '/templates/tas-admin/setapprovals.html',
      controller: 'projectController',
      controllerAs: 'project'
    })
    .state('tas-admin.users.user', {
      url: '/user',
      templateUrl: '/templates/tas-admin/user.html',
      controller: 'projectController',
      controllerAs: 'project'
    })
    .state('tas-admin.projects', {
      url: '/tas-admin/projects',
      templateUrl: '/templates/tas-admin/projects.html',
      controller: 'projectController',
      controllerAs: 'project'
    });
    $locationProvider.html5Mode({
      enabled: true,
      // requireBase: false
    });
    $urlRouterProvider.otherwise('/');
  }
})()
