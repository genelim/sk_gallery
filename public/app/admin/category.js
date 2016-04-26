    angular
    .module('app')
    .controller('AdminCategoryController', AdminCategoryController)
    .directive('postRepeatDirective', function(){
        return function(scope, element, attrs){
            if(scope.$last){
                //to disallow edit button to trigger parent's function
                $('.collapsible-header').on('click', function(){
                    $(this).siblings().toggle('fast');
                }).on('click','.right',function(e){
                    e.stopPropagation();
                });
                $('.toggle_sub').on('click', function(){
                    $(this).parent().prev().toggle('fast');
                    $(this).children().toggleClass('fa-plus fa-minus')
                });
                $('.tooltipped').tooltip();
            }
        }
    });

AdminCategoryController.$inject = ['Product_Main_Category','Product_Sub_Category', 'Upload'];

function AdminCategoryController(Product_Main_Category, Product_Sub_Category, Upload){ 
    var vm = this;
    vm.add_category = add_category;
    vm.edit_category = edit_category;
    vm.delete_category = delete_category;
    vm.category_type = null;
    vm.new_main_category = null;
    vm.edit_category_type = null;
    vm.upload = upload;
    vm.upload_edit = upload_edit;
    vm.update_category = update_category;
    vm.main_category = []
    vm.sub_category = []
    vm.index = null;
    vm.image_link = null;

    //adding main cateogry
    function add_category(data, type, $index){
        if(type === 'modal') {
            $('#category').openModal();
        }else if(angular.isUndefined(data) || data === null){
            return;
        } else if(type === 'main'){
            // TO DO: Check duplicates from db
            data.image = vm.image_link.path
            Product_Main_Category.save(data ,function(res){
                vm.new_main_category.name = null;
                vm.main_category = res.response
                $('#category').closeModal();
                data = null;
                vm.image_link = null;
                vm.uploaded = false;
            })
        } else if(type === 'sub'){
            for(var i = 0; i < vm.main_category.length; i++){
                if(vm.main_category[i]._id === data._id){
                    var data_new = {name: data.sub, image:vm.image_link.path};
                    vm.main_category[i].sub_category.push(data_new)
                    data.sub_category = vm.main_category[i].sub_category;
                    console.log(data)
                }
            }
            // TO DO: Check duplicates from db
            Product_Sub_Category.save(data ,function(res){
                $('.'+data._id).parent().toggle('fast');
                $('.'+data._id).parent().next().children().children().toggleClass('fa-plus fa-minus') 
                data = null;
                vm.image_link = null;
                vm.uploaded = false;
            })
        }
    }

    function edit_category(data,type,index){
        vm.index = null;
        vm.category_type = type
        vm.edit_category_type = data;
        if(index !== null){
            vm.index = index;
        }
        $('#edit_category').openModal();
    }

    function update_category(data,type){
        if(type === 'Main'){
            var db_category = Product_Main_Category;
        }else if(type === 'Sub'){
            var db_category = Product_Sub_Category;
        }
        console.log(data)
        db_category.update({_id:data._id},data, function(res) {
            $('#edit_category').closeModal();
            Materialize.toast('Updated', 2000);
        });
    }

    function delete_category(type){
        if(type === 'Sub'){
            vm.edit_category_type.sub_category.splice(vm.index, 1)
            Product_Sub_Category.update({_id:vm.edit_category_type._id},vm.edit_category_type, function(res) {
                $('#edit_category').closeModal();
                Materialize.toast('Updated', 2000);
                get_category()                
            });
        }else{
            Product_Main_Category.delete({id:vm.edit_category_type._id}, function(res) {
                $('#edit_category').closeModal();
                Materialize.toast('Updated', 2000);
                get_category()
            });
        }        
    }
    
    get_category()
    function get_category(){
        Product_Main_Category.query(function(result){
            vm.main_category = result.response
        })
    }
    
    function upload(files,path,index) {
        if (files) {
            if(files.length <= 1 && files.length > 0){
                var _URL = window.URL || window.webkitURL;
                img = new Image();
                img.onload = function () {
                    if(this.width > 300){
                        Upload.upload({url: '/api/upload_image', file: files[0]}).success(function (data, status, headers, config) {
                            vm.uploaded = true;
                            if(vm.category_type === 'Main'){
                                vm.image_link = data.path;
                            }else{
                                vm.edit_category_type.sub_category[vm.index].image = data.path
                            }
                        });
                    }else{
                        // toastr.warning('Image width size must be atleast 500px');
                        Materialize.toast('Image width size must be atleast 300px', 2000);
                    }
                };
                img.src = _URL.createObjectURL(files[0]);
            }else{
                // toastr.warning('Only accepts One Image at a time.');
                Materialize.toast('Only accepts One Image at a time.', 2000);
            }            
        }else{
            // toastr.warning('Image is not uploaded');
            Materialize.toast('Image is not uploaded', 2000);
        }
    };
    
    function upload_edit(files,path) {
        if (files) {
            if(files.length <= 1 && files.length > 0){
                var _URL = window.URL || window.webkitURL;
                img = new Image();
                img.onload = function () {
                    if(this.width > 300){
                        Upload.upload({url: '/api/upload_image', file: files[0]}).success(function (data, status, headers, config) {
                            vm.edit_category_type.image = data.path
                        });
                    }else{
                        // toastr.warning('Image width size must be atleast 500px');
                        Materialize.toast('Image width size must be atleast 300px', 2000);
                    }
                };
                img.src = _URL.createObjectURL(files[0]);
            }else{
                // toastr.warning('Only accepts One Image at a time.');
                Materialize.toast('Only accepts One Image at a time.', 2000);
            }            
        }else{
            // toastr.warning('Image is not uploaded');
            Materialize.toast('Image is not uploaded', 2000);
        }
    };
}