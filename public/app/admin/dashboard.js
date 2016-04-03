angular
    .module('app')
    .controller('AdminDashboardController', AdminDashboardController);

AdminDashboardController.$inject = [];

function AdminDashboardController(){ 
    var vm = this;
    $('.modal-trigger').leanModal();  
}