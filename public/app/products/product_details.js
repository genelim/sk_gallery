angular
    .module('app')
    .controller('ProductDetailsController', ProductDetailsController);

ProductDetailsController.$inject = [];

function ProductDetailsController(){ 
    $('.slider').slider({
        full_width: true,
        height  : 600
    });  
}