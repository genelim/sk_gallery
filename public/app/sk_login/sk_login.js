angular
    .module('app')
    .controller('AdminLoginController', AdminLoginController);

AdminLoginController.$inject = ['$http', '$state'];

function AdminLoginController($http, $state){ 
    var vm = this;
    vm.login = login;
    vm.user = null;
    
    function login(){
        if(!angular.isUndefined(vm.user)){
            if(angular.isUndefined(vm.user.username)){
                 Materialize.toast('Please enter username', 2000);
            }else if(angular.isUndefined(vm.user.password)){
                 Materialize.toast('Please enter password', 2000);                
            }else{
                $http.post('api/login', vm.user)
                .success(function(result){
                    if(result.response !== 'Server Error' && result.response !== 'Invalid Username or Password'){
                        Materialize.toast('Successfully Login', 2000); 
                        $state.go('admin')    
                    }else{
                        Materialize.toast(result.response, 2000);     
                    }
                })
            }
        }else{
            Materialize.toast('Please username and password', 2000);                           
        }
    }
}