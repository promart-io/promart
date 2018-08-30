angular.module('page', ['ngAnimate', 'ui.bootstrap']);
angular.module('page')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'promart.Marketplace.Products.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onEntityRefresh: function(callback) {
			on('promart.Marketplace.Products.refresh', callback);
		},
		onIndustriesModified: function(callback) {
			on('promart.Marketplace.Industries.modified', callback);
		},
		onCategoriesModified: function(callback) {
			on('promart.Marketplace.Categories.modified', callback);
		},
		onVendorsModified: function(callback) {
			on('promart.Marketplace.Vendors.modified', callback);
		},
		onRegionsModified: function(callback) {
			on('promart.Marketplace.Regions.modified', callback);
		},
		onCountriesModified: function(callback) {
			on('promart.Marketplace.Countries.modified', callback);
		},
		onSolutionsModified: function(callback) {
			on('promart.Marketplace.Solutions.modified', callback);
		},
		messageEntityModified: function() {
			message('modified');
		},
		messageEntitySelected: function(id) {
			message('selected', id);
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/promart/api/Marketplace/Products.js';
	var industryOptionsApi = '/services/v3/js/promart/api/Registry/Industries.js';
	var categoryOptionsApi = '/services/v3/js/promart/api/Registry/Categories.js';
	var vendorOptionsApi = '/services/v3/js/promart/api/Accounts/Vendors.js';
	var regionOptionsApi = '/services/v3/js/promart/api/Registry/Regions.js';
	var countryOptionsApi = '/services/v3/js/promart/api/Registry/Countries.js';
	var solutionOptionsApi = '/services/v3/js/promart/api/Registry/Solutions.js';

	$scope.industryOptions = [];

	$scope.categoryOptions = [];

	$scope.vendorOptions = [];

	$scope.regionOptions = [];

	$scope.countryOptions = [];

	$scope.solutionOptions = [];

	$scope.dateOptions = {
		startingDay: 1
	};
	$scope.dateFormats = ['yyyy/MM/dd', 'dd-MMMM-yyyy', 'dd.MM.yyyy', 'shortDate'];
	$scope.dateFormat = $scope.dateFormats[0];

	function industryOptionsLoad() {
		$http.get(industryOptionsApi)
		.success(function(data) {
			$scope.industryOptions = data;
		});
	}
	industryOptionsLoad();

	function categoryOptionsLoad() {
		$http.get(categoryOptionsApi)
		.success(function(data) {
			$scope.categoryOptions = data;
		});
	}
	categoryOptionsLoad();

	function vendorOptionsLoad() {
		$http.get(vendorOptionsApi)
		.success(function(data) {
			$scope.vendorOptions = data;
		});
	}
	vendorOptionsLoad();

	function regionOptionsLoad() {
		$http.get(regionOptionsApi)
		.success(function(data) {
			$scope.regionOptions = data;
		});
	}
	regionOptionsLoad();

	function countryOptionsLoad() {
		$http.get(countryOptionsApi)
		.success(function(data) {
			$scope.countryOptions = data;
		});
	}
	countryOptionsLoad();

	function solutionOptionsLoad() {
		$http.get(solutionOptionsApi)
		.success(function(data) {
			$scope.solutionOptions = data;
		});
	}
	solutionOptionsLoad();

	$scope.dataPage = 1;
	$scope.dataCount = 0;
	$scope.dataOffset = 0;
	$scope.dataLimit = 10;

	$scope.getPages = function() {
		return new Array($scope.dataPages);
	};

	$scope.nextPage = function() {
		if ($scope.dataPage < $scope.dataPages) {
			$scope.loadPage($scope.dataPage + 1);
		}
	};

	$scope.previousPage = function() {
		if ($scope.dataPage > 1) {
			$scope.loadPage($scope.dataPage - 1);
		}
	};

	$scope.loadPage = function(pageNumber) {
		$scope.dataPage = pageNumber;
		$http.get(api + '/count')
		.success(function(data) {
			$scope.dataCount = data;
			$scope.dataPages = Math.ceil($scope.dataCount / $scope.dataLimit);
			$http.get(api + '?$offset=' + ((pageNumber - 1) * $scope.dataLimit) + '&$limit=' + $scope.dataLimit)
			.success(function(data) {
				$scope.data = data;
			});
		});
	};
	$scope.loadPage($scope.dataPage);

	$scope.openNewDialog = function() {
		$scope.actionType = 'new';
		$scope.entity = {};
		toggleEntityModal();
	};

	$scope.openEditDialog = function(entity) {
		$scope.actionType = 'update';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.openDeleteDialog = function(entity) {
		$scope.actionType = 'delete';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.close = function() {
		$scope.loadPage($scope.dataPage);
		toggleEntityModal();
	};

	$scope.create = function() {
		$http.post(api, JSON.stringify($scope.entity))
		.success(function(data) {
			$scope.loadPage($scope.dataPage);
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
			
	};

	$scope.update = function() {
		$http.put(api + '/' + $scope.entity.Id, JSON.stringify($scope.entity))
		.success(function(data) {
			$scope.loadPage($scope.dataPage);
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		})
	};

	$scope.delete = function() {
		$http.delete(api + '/' + $scope.entity.Id)
		.success(function(data) {
			$scope.loadPage($scope.dataPage);
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
	};

	$scope.industryOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.industryOptions.length; i ++) {
			if ($scope.industryOptions[i].Id === optionKey) {
				return $scope.industryOptions[i].Name;
			}
		}
		return null;
	};

	$scope.categoryOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.categoryOptions.length; i ++) {
			if ($scope.categoryOptions[i].Id === optionKey) {
				return $scope.categoryOptions[i].Name;
			}
		}
		return null;
	};

	$scope.vendorOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.vendorOptions.length; i ++) {
			if ($scope.vendorOptions[i].Id === optionKey) {
				return $scope.vendorOptions[i].Name;
			}
		}
		return null;
	};

	$scope.regionOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.regionOptions.length; i ++) {
			if ($scope.regionOptions[i].Id === optionKey) {
				return $scope.regionOptions[i].Name;
			}
		}
		return null;
	};

	$scope.countryOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.countryOptions.length; i ++) {
			if ($scope.countryOptions[i].Id === optionKey) {
				return $scope.countryOptions[i].Name;
			}
		}
		return null;
	};

	$scope.solutionOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.solutionOptions.length; i ++) {
			if ($scope.solutionOptions[i].Id === optionKey) {
				return $scope.solutionOptions[i].Name;
			}
		}
		return null;
	};

	$messageHub.onEntityRefresh($scope.loadPage($scope.dataPage));
	$messageHub.onIndustriesModified(industryOptionsLoad);
	$messageHub.onCategoriesModified(categoryOptionsLoad);
	$messageHub.onVendorsModified(vendorOptionsLoad);
	$messageHub.onRegionsModified(regionOptionsLoad);
	$messageHub.onCountriesModified(countryOptionsLoad);
	$messageHub.onSolutionsModified(solutionOptionsLoad);

	$scope.selectEntity = function(entity) {
		$scope.selectedEntity = entity;
		$messageHub.messageEntitySelected({
			'id': entity.Id		})
	};

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});