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

AdminCategoryController.$inject = ['Product_Main_Category','Product_Sub_Category'];

function AdminCategoryController(Product_Main_Category, Product_Sub_Category){ 
    var vm = this;
    vm.add_category = add_category;
    vm.edit_category = edit_category;
    vm.delete_category = delete_category;
    vm.category_type = null;
    vm.new_main_category = null;
    vm.edit_category_type = null;
    vm.update_category = update_category;
    vm.main_category = []
    vm.sub_category = []
    vm.index = null;

    //adding main cateogry
    function add_category(data, type, $index){
        if(type === 'modal') {
            $('#category').openModal();
        }else if(angular.isUndefined(data) || data === null){
            return;
        } else if(type === 'main'){
            // TO DO: Check duplicates from db
            Product_Main_Category.save(data ,function(res){
                vm.new_main_category.name = null;
                vm.main_category = res.response
                $('#category').closeModal();
                data = null;
            })
        } else if(type === 'sub'){
            for(var i = 0; i < vm.main_category.length; i++){
                if(vm.main_category[i]._id === data._id){
                    vm.main_category[i].sub_category.push(data.sub)
                    data.sub_category = vm.main_category[i].sub_category;
                }
            }
            // TO DO: Check duplicates from db
            Product_Sub_Category.save(data ,function(res){
                $('.'+data._id).parent().toggle('fast');
                $('.'+data._id).parent().next().children().children().toggleClass('fa-plus fa-minus') 
                data = null;
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
        db_category.update({_id:data._id},data, function(res) {
            $('#edit_category').closeModal();
            Materialize.toast('Updated', 2000);
        });
    }

    function delete_category(){
        Materialize.toast('Coming Soon!', 2000);
        $('#edit_category').closeModal();
    }
    get_category()
    function get_category(){
        Product_Main_Category.query(function(result){
            vm.main_category = result.response
            console.log(vm.main_category)
        })
    }
}