angular
	.module('app')
	.service('Product_Sub_Category', Product_Sub_Category);

Product_Sub_Category.$inject = ['$resource'];

function Product_Sub_Category($resource) {
	return $resource('/api/sub_category/:id',null,{
		update: {
      		method: 'PUT'
    	},
    	delete: { 
    		method: 'DELETE', params: {id: 'id'} 
    	}
	});
}