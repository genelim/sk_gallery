angular
    .module('app')
    .controller('CollectionController', CollectionController);

CollectionController.$inject = ['Product_Main_Category', '$stateParams'];

function CollectionController(Product_Main_Category, $stateParams){ 
    var vm = this;
    vm.main_category = null;
    get_category();
    function get_category(){
        Product_Main_Category.query(function(result){
            for(var i = 0; i < result.response.length; i++){
                if(result.response[i]._id === $stateParams.id){
                    vm.main_category = result.response[i]
                    break;
                }
            }
        })
    }
}