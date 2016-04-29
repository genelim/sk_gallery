angular
	.module('app')
	.service('Authenticate', Authenticate);

Authenticate.$inject = ['$http'];

function Authenticate($http) {
	return $http.post('/api/authenticate')
}