angular
    .module('app')
    .controller('AdminProductController', AdminProductController);

AdminProductController.$inject = ['Product_Main_Category', 'Upload'];

function AdminProductController(Product_Main_Category, Upload){
    var vm = this;
    $('.modal-trigger').leanModal();
    vm.add_product = add_product;
    vm.get_category = get_category;
    vm.category = null;
    vm.new_product = null;
    
    vm.product_details = {color:[],size:[],image:[],shipping_fee:[],category:null};
        vm.add_row = add_row;

    function add_product(){
        console.log(vm.new_product)    
    }
    
    get_category()
    function get_category(){
        Product_Main_Category.query(function(result){
            vm.category = result.response
        })
    }
    
    function add_row(row, type_i, $event){
        if(type_i === 'size'){
            row.push('');
        }else if(type_i === 'color'){
            row.push('#26a69a');
        }else if(type_i === 'image'){
            row.push('');
        }else if(type_i === 'shipping_fee'){
            row.push({'country':'No Fee','fee':0});
        }
        $event.preventDefault();
    }
}