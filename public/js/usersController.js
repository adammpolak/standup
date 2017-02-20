(function(){
  angular.module('standupApp')
    .controller('authController', authController)
    authController.$inject = ['$http', '$state']
  function authController($http, $state){

    var self = this;
    sessionStorage.clear();

    function register(userObj){
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

    function login(userObj){
      $http.post('api/users/login', {username: userObj.username, password: userObj.password})
        .then(function(res){
          if (res.data.message) {
            $state.go('landing', {url: '/'});
            alert('Nice try nerd, that is not a user, get it together')
          } else {
            self.user = res.data.user;
            // console.log(self.user)
            $state.go('teams', {url: '/teams'});
          }
        })
    }

    this.login = login;
    this.register = register;
    this.userObject;
  };
})();
