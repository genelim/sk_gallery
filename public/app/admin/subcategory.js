angular
    .module('app')
    .controller('AdminProductController', AdminProductController);

AdminProductController.$inject = [];

function AdminProductController(){
    var vm = this;
    $('.modal-trigger').leanModal();
}