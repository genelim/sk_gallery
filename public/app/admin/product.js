angular
    .module('app')
    .controller('AdminProductController', AdminProductController);

AdminProductController.$inject = ['Product_Main_Category', 'Upload', 'Product', 'Authenticate','$state'];

function AdminProductController(Product_Main_Category, Upload, Product, Authenticate, $state){
    var vm = this;
    $('.modal-trigger').leanModal();
    vm.add_product = add_product;
    vm.get_category = get_category;
    vm.category = null;
    vm.new_product = null;
    vm.products = null;
    vm.user = null;
    Authenticate.then(function(result){
        vm.user = result.data
    })
    vm.product_details = {color:[],size:[],image:[],main_category:null,sub_category:null};
    vm.add_row = add_row;
    vm.category_selected = category_selected;
    vm.upload = upload;

    function add_product(){ 
        if(vm.user){
            vm.product_details.user = vm.user
            Product.save(vm.product_details, function(result){
                vm.products = result.response
                Materialize.toast('Added New Product', 2000);
                vm.product_details = {color:[],size:[],image:[],main_category:null,sub_category:null};
                $('#additem').closeModal()
            })  
        }else{
            Materialize.toast('Failed to authenticate user. Please relogin', 2000);     
            $state.go('sk_login')       
        }           
    }
    
    function category_selected(category){
        vm.selected_category = category;
    }
    
    get_category()
    get_product()
    function get_category(){
        Product_Main_Category.query(function(result){
            vm.category = result.response
        })
    }
    
    function get_product(){
        Product.query(function(result){
            vm.products = result.response
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
    
    function upload(files,path,index) {
        if (files && files.length) {
            $('.loader_view'+index).show();
            $('.image_view'+index).hide();
            Upload.upload({url: '/api/upload_image', file: files[0]}).success(function (data, status, headers, config) {
                $('.loader_view'+index).hide();
                $('.image_view'+index).show();
                vm.product_details.image[index] = data.path;
            });
        }else{
            Materialize.toast('No file detected', 2000);
            return
        }
    };
}