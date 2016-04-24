angular
    .module('app')
    .controller('AdminProductController', AdminProductController);

AdminProductController.$inject = ['Product_Main_Category'];

function AdminProductController(Product_Main_Category){
    var vm = this;
    $('.modal-trigger').leanModal();
    vm.add_product = add_product;
    vm.get_category = get_category;
    vm.category = null;
    vm.new_product = null;
    
    function add_product(){
        console.log(vm.new_product)    
    }
    
    get_category()
    function get_category(){
        Product_Main_Category.query(function(result){
            vm.category = result.response
        })
    }
}