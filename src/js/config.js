function config($stateProvider,$urlRouterProvider,$ocLazyLoadProvider){
	/*console.log($stateProvider)
	console.log($urlRouterProvider)*/
	$urlRouterProvider.otherwise("home");

	$stateProvider
			.state("home",{
				url:"/home",
				templateUrl:"view/home.html",
				data : {
					title : "home页面"
				},
				resolve : {
					loadPlugin:function($ocLazyLoad){
						return $ocLazyLoad.load([
							{
								files:["css/foot.css","css/style.css"]
							}
						])
					}
				}
			})
			.state("diamond",{
				url:"/diamond",
				templateUrl:"view/diamond.html",
				data : {
					title : "diamond页面"
				},
				resolve : {
					loadPlugin:function($ocLazyLoad){
						return $ocLazyLoad.load([
							{
								files:["css/diamond.css"]
							}
						])
					}
				}
			})
			.state("search",{
				url:"/search",
				templateUrl:"view/search.html",
				data : {
					title : "search页面"
				},
				resolve : {
					loadPlugin:function($ocLazyLoad){
						return $ocLazyLoad.load([
							{
								files:["css/search.css"]
							}
						])
					}
				}
			})
			.state("classify",{
				url:"/classify",
				templateUrl:"view/classify.html",
				data : {
					title : "classify页面"
				},
				resolve : {
					loadPlugin:function($ocLazyLoad){
						return $ocLazyLoad.load([
							{
								files:["css/classify.css","css/foot.css"]
							}
						])
					}
				}
				
			})
			.state("affirm",{
				url:"/affirm",
				templateUrl:"view/affirm.html",
				data : {
					title : "affirm页面"
				},
				resolve : {
					loadPlugin:function($ocLazyLoad){
						return $ocLazyLoad.load([
							{
								files:["css/affirm.css"]
							}
						])
					}
				}
			})
			.state("shopping",{
				url:"/shopping",
				templateUrl:"view/shopping.html",
				data : {
					title : "shopping页面"
				},
				resolve : {
					loadPlugin:function($ocLazyLoad){
						return $ocLazyLoad.load([
							{
								files:["css/shopping.css","css/foot.css"]
							}
						])
					}
				}
			})
			.state("submit",{
				url:"/submit",
				templateUrl:"view/submit.html",
				data : {
					title : "submit页面"
				},
				resolve : {
					loadPlugin:function($ocLazyLoad){
						return $ocLazyLoad.load([
							{
								files:["css/submit.css"]
							}
						])
					}
				}
			})
			.state("mine",{
				url:"/mine",
				templateUrl:"view/mine.html",
				data : {
					title : "mine页面"
				},
				resolve : {
					loadPlugin:function($ocLazyLoad){
						return $ocLazyLoad.load([
							{
								files:["css/mine.css","css/foot.css"]
							}
						])
					}
				},
				controller:"user"
			})
}
angular.module("myapp")
		.config(config)