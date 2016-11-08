function HelloAngular($scope){
	
}
function login($scope,$location,apiService){
	$scope.one = function (){
		apiService.login("http://localhost:8080/login",{name:"fasdfasd",age:20},"jsonp")
						.success(function(res){
							//console.log(res)
							//$scope.data=res;
							for(var i=0;i<res.length;i++){
								if($scope.username == res[i].username && $scope.password == res[i].password){
									sessionStorage.image=res[i].img;
									$location.url("/tell");										
								}
							}

						})
	}	
}

function user($scope){
	if(sessionStorage.image){
		$scope.img = sessionStorage.image;
	}
}

 angular.module("myapp")
 		.controller("HelloAngular",HelloAngular)
 		.controller("login",login)
 		.controller("user",user)

