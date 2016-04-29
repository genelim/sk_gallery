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
        templateUrl: 'app/products/more_collections.html',
        controller: 'MoreCollectionsController',
        controllerAs: 'vm'
    })
    .state('product_details', {
        url:'/product_details',
        templateUrl: 'app/products/product_details.html',
        controller: 'ProductDetailsController',
        controllerAs: 'vm'
    })
    .state('collection', {
        url:'/collection/:id',
        templateUrl: 'app/products/collection.html',
        controller: 'CollectionController',
        controllerAs: 'vm'
    })

    .state('products', {
        url:'/products/:id/:name',
        templateUrl: 'app/products/products.html',
        controller: 'ProductsController',
        controllerAs: 'vm'
    })
    .state('admin', {
        url:'/admin',
        templateUrl: 'app/admin/admin.html',    
        controller: 'AdminController',
        controllerAs: 'vm',   
        resolve: {
            authenticate : check_user
        }
    })
    .state('admin.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/admin/dashboard.html',
        controller: 'AdminDashboardController',
        controllerAs: 'vm'
    })
    .state('admin.user', {
        url: '/user',
        templateUrl: 'app/admin/user.html',
        controller: 'AdminUserController',
        controllerAs: 'vm'
    })
    .state('admin.product', {
        url: '/product',
        templateUrl: 'app/admin/product.html',
        controller: 'AdminProductController',
        controllerAs: 'vm'
    })
    .state('admin.category', {
        url: '/category',
        templateUrl: 'app/admin/category.html',
        controller: 'AdminCategoryController',
        controllerAs: 'vm'
    })
    .state('cart', {
        url: '/cart',
        templateUrl: 'app/cart/cart.html',
        controller: 'CartController',
        controllerAs: 'vm'
    })

    .state('sk_login', {
        url: '/sk_login',
        templateUrl: 'app/sk_login/sk_login.html',
        controller: 'AdminLoginController',
        controllerAs: 'vm'
    });

    $locationProvider.html5Mode({
        enabled: true
    });
}

function check_user($location, Authenticate){
    Authenticate.then(function(result){
        if(result.data === '0'){
            $location.path('/')
        }
    })
}