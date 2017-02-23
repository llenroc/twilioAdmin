var app = angular.module('twilio',[]);

app.controller('baseController', function($scope, $http, $location) {
    console.log($location.absUrl());
    $scope.hideLogin= false;
    $scope.showUsersAndChannels= false;

    $scope.sid= localStorage.getItem('sid');
    $scope.token= localStorage.getItem('token');
    
    $scope.servicesList = [];

    if($scope.sid !='' && $scope.token!=''){
    	login()	
    }

 	function login() {

		$http.defaults.headers.common.Authorization = 'Basic '+btoa($scope.sid + ":" +$scope.token);
		
		$http({
	        method : "GET",
	        url : 'https://chat.twilio.com/v1/Services'
	    }).then(function mySucces(response) {
	    	$scope.hideLogin = true;
	    	
	    	localStorage.setItem('sid', $scope.sid);
	    	localStorage.setItem('token', $scope.token);

	    	$scope.listServices(response.data.services);

    		console.log(response);
	    	return response.data;

	    }, function myError(response) {
	    	console.log(response);
	    	return response;
	    });	
    }

    $scope.listServices = function(services) {

    	$scope.servicesList = services;
		return services;
    }

    $scope.getService = function(users, channels) {
    	$("#channelLists").html('');
		$("#userLists").html('');

		$http({
	        method : "GET",
	        url : users
	    }).then(function mySucces(response) {
	    	
    		$scope.usersList = response.data.users;

			$scope.showUsersAndChannels = true;

	    }, function myError(response) {
	    	console.log(response);
	    });

	    $http({
	        method : "GET",
	        url : channels
	    }).then(function mySucces(response) {
	    	console.log(response.data.channels);
    		$scope.channelList = response.data.channels;
			$scope.showUsersAndChannels = true;

		    }, function myError(response) {
	    	console.log(response);
	    });
    }

    $scope.getUser = function(user) {
		$http({
	        method : "GET",
	        url : user
	    }).then(function mySucces(response) {
	    	
    		console.log(response);

	    }, function myError(response) {
	    	console.log(response);
	    });
    }

});

app.filter('capitalize',function(){
    return function(x) {
        return x.charAt(0).toUpperCase() + x.slice(1);
    };
});
