(function(){
  angular.module('itvApp')
    .controller('authControl', authControl)
    authControl.$inject = ['$http', '$state']
  function authControl($http, $state){

    var self = this;

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
      $http.post('api/users/login', {username: "Adam", password: userObj.password})
        .then(function(res){
          if (res.data.message) {
            $state.go('landing', {url: '/'});
            alert('Nice try nerd, that is not a user, get it together')
          } else {
            self.user = res.data.user;
            // console.log(self.user)
            $state.go('landing', {url: '/'});
          }
        })
    }

    this.login = login;
    this.register = register;
    this.userObject;
  };
})();
