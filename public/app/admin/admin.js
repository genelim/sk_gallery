    angular
    .module('app')
    .controller('AdminController', AdminController);

AdminController.$inject = ['$http', '$state'];

function AdminController($http, $state){ 
    var vm = this;
    vm.logout = logout;
    
    function logout(){
        $http.post('/api/logout')
        .success(function(result){
            if(result.response){
                $state.go('home')
            }
        })
    }
}