(function(){
  angular.module('websiteApp', ['ui.router']).config(MainRouter);
  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: '/templates/landing.html',
      controller: 'projectController',
      controllerAs: 'project'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: '/templates/signin.html',
      controller: 'projectController',
      controllerAs: 'project'
    })
    .state('project_show', {
      url: '/project',
      templateUrl: '/templates/project/project_show.html',
      controller: 'projectController',
      controllerAs: 'project'
    })
    .state('project_new', {
      url: '/project/new',
      templateUrl: '/templates/project/project_new.html',
      controller: 'projectController',
      controllerAs: 'project'
    })
    .state('project_edit', {
      url: '/project/edit',
      templateUrl: '/templates/project/project_edit.html',
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
