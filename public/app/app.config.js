angular
    .module('app')
    .config(Configuration);

Configuration.$inject = ['$urlRouterProvider','$stateProvider','$locationProvider'];

function Configuration($urlRouterProvider,$stateProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url:'/',
        templateUrl: 'app/main/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
    })
    .state('more_collections', {
        url:'/more_collections',
        templateUrl: 'app/products/more_collections.html'
    })
    .state('product_details', {
        url:'/product_details',
        templateUrl: 'app/products/product_details.html'
    })
    .state('collection', {
        url:'/collection',
        templateUrl: 'app/products/collection.html'
    })

    .state('test', {
        url:'/test',
        templateUrl: 'app/test/test.html'
    })
    
    $locationProvider.html5Mode({
        enabled: true
    });
}