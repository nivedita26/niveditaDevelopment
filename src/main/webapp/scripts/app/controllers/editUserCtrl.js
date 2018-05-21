(function () {
    'use strict';
	angular.module('rlmsApp')
	.controller('editUserCtrl', ['$scope', '$filter','serviceApi','$route','$http','utility','$window','pinesNotifications','$rootScope', function($scope, $filter,serviceApi,$route,$http,utility,$window,pinesNotifications,$rootScope) {
		//initialize add Branch
		initAddUser();
		loadCompayInfo();
		//loadBranchListInfo();
		$scope.backPage = function(){
			$window.history.back();
		}
		$scope.alert = { type: 'success', msg: 'You successfully Added new user.',close:true };
		$scope.showAlert = false;
		function initAddUser(){
			$scope.selectedCompany = {};
			$scope.addUser={
				firstName:'',
				lastName:'',
				address:'',
				contactNumber:'',
				emailId:'',
				companyId:'',
				city:'',
				area:'',
				pinCode:''
			};	
		    //$scope.companies = [];
		    $scope.userList={};
		}
		
		$scope.alert = { type: 'success', msg: 'You successfully edited user.',close:true };
		$scope.showAlert = false;
		//load compay dropdown data
		function loadCompayInfo(){
			serviceApi.doPostWithoutData('/RLMS/admin/getAllApplicableCompanies')
		    .then(function(response){
		    		$scope.companies = response;
		    });
		};
		
		$scope.submitEditUser = function(){
			var userData = {};
			userData = {
					userId: $rootScope.editUser.userId,
					firstName:$scope.editUser.firstName,
					lastName:$scope.editUser.lastName,
					address:$scope.editUser.address,
					area:$scope.editUser.area,
					contactNumber:$scope.editUser.contactnumber,
					emailId:$scope.editUser.emailid,
					city:$scope.editUser.city,
					pinCode:$scope.editUser.pincode,
			};
			serviceApi.doPostWithData("/RLMS/admin/validateAndUpdateUser",userData)
			.then(function(response){
				$scope.showAlert = true;
				var key = Object.keys(response);
				var successMessage = response[key[0]];
				$scope.alert.msg = successMessage;
				$scope.alert.type = "success";
			},function(error){
				$scope.showAlert = true;
				$scope.alert.msg = error.exceptionMessage;
				$scope.alert.type = "danger";
			});
		}
		
		//Post call add branch
		$scope.submitAddUser = function(){
			$scope.addUser.companyId = $scope.selectedCompany.selected.companyId;
			serviceApi.doPostWithData("/RLMS/admin/validateAndRegisterNewUser",$scope.addUser)
			.then(function(response){
				$scope.showAlert = true;
				var key = Object.keys(response);
				var successMessage = response[key[0]];
				$scope.alert.msg = successMessage;
				$scope.alert.type = "success";
				//utility.showMessage("",successMessage,"success");
				initAddUser();
				$scope.addUserForm.$setPristine();
				$scope.addUserForm.$setUntouched();
				
			},function(error){
				$scope.showAlert = true;
				$scope.alert.msg = error.exceptionMessage;
				$scope.alert.type = "danger";
			});
		}
		//rese add branch
		$scope.resetAddUser = function(){
			$scope.showAlert = false;
			initAddUser();
			$scope.addUserForm.$setPristine();
			$scope.addUserForm.$setUntouched();
		}
		
	}]);
})();
