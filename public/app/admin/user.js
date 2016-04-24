angular
    .module('app')
    .controller('AdminUserController', AdminUserController);

AdminUserController.$inject = ['User'];

function AdminUserController(User){ 
    var vm = this;
    vm.create_user = create_user;
    vm.open_edit_level = open_edit_level;
    vm.edit_user = edit_user;
    vm.delete_user = delete_user;
    vm.user = {level : 1};
    vm.user_selected = null;
    vm.users = null;
    
    $('.modal-trigger').leanModal();
    function open_edit_level(user){
        $('#edituser').openModal();
        vm.user_selected = user
    }
    
    function create_user(){
        User.save(vm.user, function(result){
            get_user();
            $('#adduser').closeModal();
            vm.user = {level : 1};
        })
    }
    
    get_user()
    function get_user(){
        User.query(function(result){
            vm.users = result.response
        })
    }
    
    function edit_user(){
        User.update({_id:vm.user_selected._id}, vm.user_selected, function(res) {
            get_user();
            $('#edituser').closeModal();
        });
    }
    
    function delete_user(){
        User.delete({id:vm.user_selected._id}, function(res) {
            get_user();
            $('#edituser').closeModal();
        });
    }
}