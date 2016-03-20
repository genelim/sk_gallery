angular
    .module('app')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$http'];

function HomeController($http){ 
    var vm = this;
    vm.user = '';
    get_user();
    function get_user(){
        $http.get('/api/user/')
        .success(function(data){
            vm.user = data[0].name;
        })
    }    
}