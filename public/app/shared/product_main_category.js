angular
	.module('app')
	.service('Product_Main_Category', Product_Main_Category);

Product_Main_Category.$inject = ['$resource'];

function Product_Main_Category($resource) {
	return $resource('/api/main_category/:id',null,{
		update: {
      		method: 'PUT'
    	},
    	delete: { 
    		method: 'DELETE', params: {id: 'id'} 
    	},
    	query: {
    		method: 'GET',
    		isArray: false
    	}
	});
}