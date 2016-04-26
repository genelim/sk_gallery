angular
    .module('app')
    .controller('ProductsController', ProductsController);

ProductsController.$inject = ['Product_Main_Category', '$stateParams'];

function ProductsController(Product_Main_Category, $stateParams){
    var vm = this;
    $('.modal-trigger').leanModal();
    var vm = this;
    vm.category = null;
    get_category();
    function get_category(){
        Product_Main_Category.query(function(result){
            for(var i = 0; i < result.response.length; i++){
                if(result.response[i]._id === $stateParams.id){
                    vm.category.main = result.response[i].main_category;
                    for(var a = 0; a < result.response[i].sub_category; a++){
                        //get sub
                    }
                    break;
                }
            }
        })
    }
}