angular
    .module('app')
    .controller('MoreCollectionsController', MoreCollectionsController);

MoreCollectionsController.$inject = ['Product_Main_Category'];

function MoreCollectionsController(Product_Main_Category){ 
    var vm = this;
    vm.main_category = null;
    get_category();
    
    function get_category(){
        Product_Main_Category.query(function(result){
            vm.main_category = result.response
        })
    }
}