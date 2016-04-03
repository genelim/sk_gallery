angular
    .module('app')
    .controller('AdminUserController', AdminUserController);

AdminUserController.$inject = [];

function AdminUserController(){ 
    var vm = this;
    $('.modal-trigger').leanModal();  
}