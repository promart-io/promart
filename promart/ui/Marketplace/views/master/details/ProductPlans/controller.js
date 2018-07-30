angular.module('page', ['ngAnimate', 'ui.bootstrap']);
angular.module('page')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'promart.Marketplace.ProductPlans.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onEntityRefresh: function(callback) {
			on('promart.Marketplace.ProductPlans.refresh', callback);
		},
		onProductsModified: function(callback) {
			on('promart.Marketplace.Products.modified', callback);
		},
		onPlanTypesModified: function(callback) {
			on('promart.Marketplace.PlanTypes.modified', callback);
		},
		onSupportLevelsModified: function(callback) {
			on('promart.Marketplace.SupportLevels.modified', callback);
		},
		onSalesModelsModified: function(callback) {
			on('promart.Marketplace.SalesModels.modified', callback);
		},
		onUoMModified: function(callback) {
			on('promart.Marketplace.UoM.modified', callback);
		},
		messageEntityModified: function() {
			message('modified');
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/promart/api/Marketplace/ProductPlans.js';
	var productOptionsApi = '/services/v3/js/promart/api/Marketplace/Products.js';
	var typeOptionsApi = '/services/v3/js/promart/api/Entities/PlanTypes.js';
	var supportOptionsApi = '/services/v3/js/promart/api/Entities/SupportLevels.js';
	var salesOptionsApi = '/services/v3/js/promart/api/Entities/SalesModels.js';
	var unitOptionsApi = '/services/v3/js/promart/api/Entities/UoM.js';

	$scope.dateOptions = {
		startingDay: 1
	};
	$scope.dateFormats = ['yyyy/MM/dd', 'dd-MMMM-yyyy', 'dd.MM.yyyy', 'shortDate'];
	$scope.dateFormat = $scope.dateFormats[0];

	$scope.productOptions = [];

	$scope.typeOptions = [];

	$scope.supportOptions = [];

	$scope.salesOptions = [];

	$scope.unitOptions = [];

	function productOptionsLoad() {
		$http.get(productOptionsApi)
		.success(function(data) {
			$scope.productOptions = data;
		});
	}
	productOptionsLoad();

	function typeOptionsLoad() {
		$http.get(typeOptionsApi)
		.success(function(data) {
			$scope.typeOptions = data;
		});
	}
	typeOptionsLoad();

	function supportOptionsLoad() {
		$http.get(supportOptionsApi)
		.success(function(data) {
			$scope.supportOptions = data;
		});
	}
	supportOptionsLoad();

	function salesOptionsLoad() {
		$http.get(salesOptionsApi)
		.success(function(data) {
			$scope.salesOptions = data;
		});
	}
	salesOptionsLoad();

	function unitOptionsLoad() {
		$http.get(unitOptionsApi)
		.success(function(data) {
			$scope.unitOptions = data;
		});
	}
	unitOptionsLoad();

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
			$http.get(api + '?=' + $scope.masterEntityId + '&$offset=' + ((pageNumber - 1) * $scope.dataLimit) + '&$limit=' + $scope.dataLimit)
			.success(function(data) {
				$scope.data = data;
			});
		});
	};

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

	$scope.productOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.productOptions.length; i ++) {
			if ($scope.productOptions[i].Id === optionKey) {
				return $scope.productOptions[i].Name;
			}
		}
		return null;
	};
	$scope.typeOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.typeOptions.length; i ++) {
			if ($scope.typeOptions[i].Id === optionKey) {
				return $scope.typeOptions[i].Name;
			}
		}
		return null;
	};
	$scope.supportOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.supportOptions.length; i ++) {
			if ($scope.supportOptions[i].Id === optionKey) {
				return $scope.supportOptions[i].Name;
			}
		}
		return null;
	};
	$scope.salesOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.salesOptions.length; i ++) {
			if ($scope.salesOptions[i].Id === optionKey) {
				return $scope.salesOptions[i].Name;
			}
		}
		return null;
	};
	$scope.unitOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.unitOptions.length; i ++) {
			if ($scope.unitOptions[i].Id === optionKey) {
				return $scope.unitOptions[i].Name;
			}
		}
		return null;
	};

	$messageHub.onEntityRefresh($scope.loadPage($scope.dataPage));
	$messageHub.onProductsModified(productOptionsLoad);
	$messageHub.onPlanTypesModified(typeOptionsLoad);
	$messageHub.onSupportLevelsModified(supportOptionsLoad);
	$messageHub.onSalesModelsModified(salesOptionsLoad);
	$messageHub.onUoMModified(unitOptionsLoad);


	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});