angular
    .module('app')
    .controller('ProductsController', ProductsController);

ProductsController.$inject = ['Product_Main_Category', '$stateParams','Product'];

function ProductsController(Product_Main_Category, $stateParams, Product){
    var vm = this;
    $('.modal-trigger').leanModal();
    var vm = this;
    $('.slider').slider({full_width: true});
    var vm = this;
    vm.category = {main: null, sub: null};
    vm.products = [];
    vm.selected_product = [];
    vm.open_product_modal = open_product_modal;
    get_category();
    get_product();
    function get_category(){
        Product_Main_Category.query(function(result){
            for(var i = 0; i < result.response.length; i++){
                if(result.response[i]._id === $stateParams.id){
                    vm.category.main = result.response[i]._id;
                    for(var a = 0; a < result.response[i].sub_category.length; a++){
                        if(result.response[i].sub_category[a].name === $stateParams.name){
                            vm.category.sub = result.response[i].sub_category[a]._id;
                            break;
                        }
                    }
                    break;
                }
            }
        })
    }
    function get_product(){
        Product.query(function(result){
            vm.products = result.response
        })
    }
    
    function open_product_modal(product){
        vm.selected_product = product
        $('#viewproduct').openModal()
    }
}