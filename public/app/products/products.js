angular
    .module('app')
    .controller('ProductsController', ProductsController);

ProductsController.$inject = [];

function ProductsController(){
    var vm = this;
    $('.modal-trigger').leanModal();
}