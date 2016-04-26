angular
    .module('app')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$http', 'Product_Main_Category'];

function HomeController($http, Product_Main_Category){ 
    var vm = this;
    vm.main_category = null;
    get_category();
    $('.slider').slider({full_width: true, indicators: false});
    // function get_user(){
    //     $http.get('/api/user/')
    //     .success(function(data){
    //         vm.user = data[0].name;
    //     })
    // }    
    
    function get_category(){
        Product_Main_Category.query(function(result){
            vm.main_category = result.response
        })
    }
}