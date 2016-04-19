angular
    .module('app')
    .controller('AdminProductController', AdminProductController);

AdminProductController.$inject = [];

function AdminProductController(){
    var vm = this;
    $('.modal-trigger').leanModal();

    var vm = this;
    vm.add_product = add_product;
}