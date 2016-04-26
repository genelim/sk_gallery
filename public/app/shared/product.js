angular
	.module('app')
	.service('Product', Product);

Product.$inject = ['$resource'];

function Product($resource) {
	return $resource('/api/product/:id',null,{
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