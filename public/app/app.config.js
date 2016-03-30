angular
    .module('app')
    .config(Configuration);

Configuration.$inject = ['$urlRouterProvider','$stateProvider','$locationProvider'];

function Configuration($urlRouterProvider,$stateProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/');
    $urlRouterProvider.when('/admin', '/admin/dashboard');
    $urlRouterProvider.when('/admin/', '/admin/dashboard');

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
        templateUrl: 'app/products/product_details.html',
        controller: 'ProductDetailsController',
        controllerAs: 'vm'
    })
    .state('collection', {
        url:'/collection',
        templateUrl: 'app/products/collection.html'
    })

    .state('products', {
        url:'/products',
        templateUrl: 'app/products/tesproductst.html'
    })
    .state('admin', {
        url:'/admin',
        templateUrl: 'app/admin/admin.html',        
    })
    .state('admin.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/admin/dashboard.html',
        // controller: 'AdminDashboardController',
        // controllerAs: 'vm'
    })
    .state('admin.user', {
        url: '/user',
        templateUrl: 'app/admin/user.html',
        // controller: 'AdminUserController',
        // controllerAs: 'vm'
    })
    .state('admin.product', {
        url: '/product',
        templateUrl: 'app/admin/product.html',
        // controller: 'AdminProductController',
        // controllerAs: 'vm'
    });
    
    $locationProvider.html5Mode({
        enabled: true
    });
}