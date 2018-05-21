angular.module('theme.demos.dashboard.indi', [
  'angular-skycons',
  'theme.demos.forms',
  'theme.demos.tasks',
  'ngStorage'
])
  .controller('DashboardControllerInditech', ['$scope', '$timeout', '$window', '$modal', 'serviceApi', '$filter', '$rootScope','$localStorage','locker','$http', function ($scope, $timeout, $window, $modal, serviceApi, $filter, $rootScope,$localStorage,locker,$http) {
    'use strict';

    $scope.totalServerItemsForComplaints = 0;
    $scope.pagingOptionsForComplaints = {
      pageSizes: [10, 20, 50],
      pageSize: 10,
      currentPage: 1,
      //enableHorizontalScrollbar: 1
    };
    
    $scope.showCompanies=true;
    $scope.showAmc=true;
    $scope.showBranches=true;
    
    $rootScope.showDasboardForInditech=false;
    $rootScope.showDasboardForOthers=false;
    
   /* $scope.loggedInuserDetails={
    		userName:{
    			firstName:'0',
    			color:'white'
    		}
    		
    };*/
    $http({
		  method: 'POST',
		  url: '/RLMS/getLoggedInUser'
		}).then(function successCallback(response) {
			$rootScope.loggedInUserInfoForDashboard=response;
			if($rootScope.loggedInUserInfoForDashboard.data.userRole.rlmsSpocRoleMaster.roleLevel == 1 || $rootScope.loggedInUserInfoForDashboard.data.userRole.rlmsSpocRoleMaster.roleLevel == 2){
				$rootScope.showDasboardForInditech= true;
				$rootScope.showDasboardForOthers=false;
			}else{
				$rootScope.showDasboardForOthers=true;
				$rootScope.showDasboardForInditech=false;
			}
			if($rootScope.loggedInUserInfoForDashboard.data.userRole.rlmsSpocRoleMaster.roleLevel == 2){
				$scope.showCompanies= false;
				$scope.showAmc=true;
			}else{
				$scope.showBranches=false;
			}
/*			 $scope.loggedInuserDetails.userName.firstName=$rootScope.loggedInUserInfoForDashboard.data.userRole.rlmsUserMaster.firstName
*/		  }, function errorCallback(response) {
		  });
    
    $scope.technicianData = {
      totalTechnicians: {
        title: 'Total',
        text: '0',
        color: 'red'
      },
      activeTechnicians: {
        title: 'Active',
        text: '0',
        color: 'amber'
      },
      inactiveTechnicians: {
        title: 'Inactive',
        text: '0',
        color: 'blue'
      }
    };
    
    $scope.event = {
    		inout: {
    	        title: 'In-Out Event',
    	        text: '0',
    	        color: 'red'
    	      },
    		error: {
    				title: 'ERROR',
    				text: '0',
    				color: 'yellow'
               }
    	    };
    $scope.amcSeriveCalls = {
    	        title: 'AMC Service Calls',
    	        text: '0',
    	        color: 'red'
    	    };
    
    $scope.liftStatus = {
    	      totalInstalled: {
    	        title: 'Total Installed',
    	        text: '0',
    	        color: 'red'
    	      },
    	      activeLiftStatus: {
    	        title: 'Active',
    	        text: '0',
    	        color: 'amber'
    	      },
    	      inactiveLiftStatus: {
    	        title: 'Inactive',
    	        text: '0',
    	        color: 'blue'
    	      }
    	    };
    
    $scope.amcDetailsData = {
    	      totalRenewalForThisMonth: {
    	        title: 'Total Renewal For This Month',
    	        text: '0',
    	        color: 'red'
    	      },
    	      activeAmc: {
    	        title: 'Active',
    	        text: '0',
    	        color: 'amber'
    	      },
    	      inactiveAmc: {
    	        title: 'Inactive',
    	        text: '0',
    	        color: 'blue'
    	      },
    	      expiredAmc: {
      	        title: 'Expire',
      	        text: '0',
      	        color: 'blue'
      	      }
    	    };
   
    $scope.companiesData = {
  	      totalCompanies: {
  	        title: 'Total',
  	        text: '0',
  	        color: 'red'
  	      },
  	      activeCompanies: {
  	        title: 'Active',
  	        text: '0',
  	        color: 'amber'
  	      },
  	      inactiveCompanies: {
  	        title: 'Inactive',
  	        text: '0',
  	        color: 'blue'
  	      },
  	      serviceRenewalDueCompanies: {
    	        title: 'Service Renewal Due',
    	        text: '0',
    	        color: 'blue'
    	      }
  	    };
    
    $scope.customersDetails = {
  	      totalCustomers: {
  	        title: 'Total',
  	        text: '0',
  	        color: 'red'
  	      },
  	      activeCustomers: {
  	        title: 'Active',
  	        text: '0',
  	        color: 'amber'
  	      },
  	      inactiveCustomers: {
  	        title: 'Inactive',
  	        text: '0',
  	        color: 'blue'
  	      }
  	    };

    $scope.branchDetails = {
    		total: {
    	        title: 'Total',
    	        text: '0',
    	        color: 'red'
    	      },
    	      activeBranches: {
    	        title: 'Active',
    	        text: '0',
    	        color: 'amber'
    	      },
    	      inactiveBranches: {
    	        title: 'Inactive',
    	        text: '0',
    	        color: 'blue'
    	      }
    	    };
    
    $scope.complaintsData = {
      totalComplaints: {
        title: 'Total',
        text: '0',
        color: 'red'
      },
      totalUnassignedComplaints: {
        title: 'Total Unassigned',
        text: '0',
        color: 'amber'
      },
      totalAssignedComplaints: {
        title: 'Total Assigned',
        text: '0',
        color: 'blue'
      },
      totalResolvedComplaints: {
        title: 'Total Resolved',
        text: '0',
        color: 'green'
      },
      totalPendingComplaints: {
        title: 'Total Pending',
        text: '0',
        color: 'indigo'
      },
      avgLogPerDay: {
        title: 'Avg Log Per Day',
        text: '0',
        color: 'grey'
      },
      todaysTotalComplaints: {
        title: 'Todays Total',
        text: '0',
        color: 'red'
      },
      todaysUnassignedComplaints: {
        title: 'Todays Unassigned',
        text: '0',
        color: 'amber'
      },
      todaysAssignedComplaints: {
        title: 'Todays Assigned',
        text: '0',
        color: 'blue'
      },
      todaysResolvedComplaints: {
        title: 'Todays Resolved',
        text: '0',
        color: 'green'
      },
      todaysPandingComplaints: {
        title: 'Todays Pending',
        text: '0',
        color: 'indigo'
      },
      avgResolvedPerDayRegistered: {
        title: 'Avg Resolved Per Day',
        text: '0',
        color: 'grey'
      }
    };

    $scope.pendingComplaints = {
      title: 'Pending Complaints',
      text: '0',
      color: 'red'
    };

    $scope.assignedComplaints = {
      title: 'Assigned Complaints',
      text: '0',
      color: 'amber'
    };

    $scope.attemptedTodayComplaints = {
      title: 'Complaints Attempted Today',
      text: '0',
      color: 'blue'
    };
    $scope.resolvedComplaints = {
      title: 'Resolved Complaints',
      text: '0',
      color: 'green'
    };
    $scope.totalComplaints = {
      title: 'Total Complaints',
      text: '0',
      color: 'indigo'
    };
    $scope.newCustomerRegistered = {
      title: 'New Customers Registered',
      text: '0',
      color: 'grey'
    };
    $scope.gridOptionsForComplaints = {
      data: 'myComplaintsData',
      rowHeight: 40,
      enablePaging: true,
      showFooter: true,
      totalServerItems: 'totalServerItemsForComplaints',
      pagingOptions: $scope.pagingOptionsForComplaints,
      filterOptions: $scope.filterOptionsForModal,
      multiSelect: false,
      gridFooterHeight:50,
      enableRowSelection: true,
      selectedItems: [],
      afterSelectionChange: function (rowItem, event) {
      }
    };

    $scope.filterOptionsForModal = {
      filterText: '',
      useExternalFilter: true
    };

    $scope.todaysDate = new Date();
    $scope.todaysDate.setHours(0, 0, 0, 0);
    $scope.testComplaintValue="Before";
    $scope.getComplaintsCount = function (complaintStatus) {
      var complaintStatusArray = [];
      var str_array = complaintStatus.split(',');
      for (var i = 0; i < str_array.length; i++) {
        str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
        complaintStatusArray.push(str_array[i]);
      }
      $scope.testComplaintValue="After";
      setTimeout(
        function () {
          var dataToSend = $scope
            .construnctObjeToSend(complaintStatusArray);
          serviceApi
            .doPostWithData(
            '/RLMS/dashboard/getListOfComplaintsForDashboard',
            dataToSend)
            .then(
            function (
              largeLoad) {
              if (complaintStatusArray.includes('2') && complaintStatusArray.length == 1 && largeLoad.length > 0) {
                $scope.complaintsData.totalPendingComplaints.text = largeLoad.length;
                $scope.complaintsData.totalUnassignedComplaints.text = largeLoad.length;
                $scope.todaysUnassignedComplaints = largeLoad.filter(function (item) {
                  return (new Date(item.updatedDate)).getTime() === $scope.todaysDate.getTime();
                });
                if ($scope.todaysUnassignedComplaints.length > 0) {
                  $scope.complaintsData.todaysUnassignedComplaints.text = $scope.todaysUnassignedComplaints.length;
                }
                $scope.todaysPendingComplaints = largeLoad.filter(function (item) {
                  return (new Date(item.updatedDate)).getTime() === $scope.todaysDate.getTime();
                });
                if ($scope.todaysPendingComplaints.length > 0) {
                  $scope.complaintsData.todaysPandingComplaints.text = $scope.todaysPendingComplaints.length;
                }
              }
              if (complaintStatusArray.includes('3') && complaintStatusArray.length == 1 && largeLoad.length > 0) {
                $scope.complaintsData.totalAssignedComplaints.text = largeLoad.length;
                $scope.todaysAssignedComplaints = largeLoad.filter(function (item) {
                  return (new Date(item.updatedDate)).getTime() === $scope.todaysDate.getTime();
                });
                if ($scope.todaysAssignedComplaints.length > 0) {
                  $scope.complaintsData.todaysAssignedComplaints.text = $scope.todaysAssignedComplaints.length;
                }
              }
              if (complaintStatusArray.includes('5') && complaintStatusArray.length == 1 && largeLoad.length > 0) {
                $scope.complaintsData.totalResolvedComplaints.text = largeLoad.length;
                $scope.todaysResolvedComplaints = largeLoad.filter(function (item) {
                  return (new Date(item.updatedDate)).getTime() === $scope.todaysDate.getTime();
                });
                if ($scope.todaysResolvedComplaints.length > 0) {
                  $scope.complaintsData.todaysResolvedComplaints.text = $scope.todaysResolvedComplaints.length;
                }
              }
              if (complaintStatusArray.includes('2') && complaintStatusArray.length == 3 && largeLoad.length > 0) {
                $scope.complaintsData.totalComplaints.text = largeLoad.length;
                $scope.todaysTotalComplaints = largeLoad.filter(function (item) {
                  return (new Date(item.updatedDate)).getTime() === $scope.todaysDate.getTime();
                });
                if ($scope.todaysTotalComplaints.length > 0) {
                  $scope.complaintsData.todaysTotalComplaints.text = $scope.todaysTotalComplaints.length;
                }
              }
            });
        }, 100);
    };

    $scope.getComplaintsCountForSiteVisited = function (complaintStatus) {
      var complaintStatusArray = [];
      var str_array = complaintStatus.split(',');

      for (var i = 0; i < str_array.length; i++) {
        str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
        complaintStatusArray.push(str_array[i]);
      }
      setTimeout(
        function () {
          var dataToSend = $scope
            .construnctObjeToSend(complaintStatusArray);
          serviceApi
            .doPostWithData(
            '/RLMS/dashboard/getListOfComplaintsForSiteVisited',
            dataToSend)
            .then(
            function (
              largeLoad) {
              if (largeLoad.length > 0) {
                $scope.attemptedTodayComplaints.text = largeLoad.length;
              }
            });
        }, 100);
    };

    $scope.getComplaintsCount('2');
    $scope.getComplaintsCount('3');
    $scope.getComplaintsCount('5');
    $scope.getComplaintsCount('2,3,5');
    $scope.getComplaintsCountForSiteVisited('2,3,5');

    $scope.todaysComplaintsList = function (title) {
      var emptyComplaintsArray = [];
      $scope.myComplaintsData = emptyComplaintsArray;
      $scope.pagingOptionsForComplaints.currentPage = 1;
      $scope.totalServerItemsForComplaints = 0;
      if (title == "todaysTotalPending") {
        $scope.tempComplaintsData = $scope.todaysPendingComplaints;
      } else if (title == "todaysUnassigned") {
        $scope.tempComplaintsData = $scope.todaysUnassignedComplaints;
      } else if (title == "todaysResolved") {
        $scope.tempComplaintsData = $scope.todaysResolvedComplaints;
      } else if (title == "todaysAssigned") {
        $scope.tempComplaintsData = $scope.todaysAssignedComplaints;
      } else if (title == "todaysTotal") {
        $scope.tempComplaintsData = $scope.todaysTotalComplaints;
      }
      var userDetails = [];
      var userDetailsObj = {};
      var i = 0;
      for (i = 0; i < $scope.tempComplaintsData.length; i++) {
        userDetailsObj["No"] = $scope.tempComplaintsData[i].complaintNumber;
        userDetailsObj["CompanyName"] = $scope.tempComplaintsData[i].companyName;
        userDetailsObj["Title"] = $scope.tempComplaintsData[i].title;
        userDetailsObj["City"] = $scope.tempComplaintsData[i].city;
        userDetails.push(userDetailsObj);
      }
      $scope.setPagingDataForComplaints(userDetails, $scope.pagingOptionsForComplaints.currentPage, $scope.pagingOptionsForComplaints.pageSize);
      $scope.modalInstance = $modal.open({
        templateUrl: 'demoModalContent.html',
        scope: $scope
      });
    };

    $scope.openDemoModal = function (currentModelOpen, complaintStatus, headerValue,isTodaysData) {
      var emptyComplaintsArray = [];
      $scope.myComplaintsData = emptyComplaintsArray;
      $scope.pagingOptionsForComplaints.currentPage = 1;
      $scope.totalServerItemsForComplaints = 0;
      $scope.filterOptionsForModal.filterText='';
      $scope.currentModel = currentModelOpen;
      $scope.modalHeaderVal = headerValue;
      $scope.isTodaysData=isTodaysData;
      var complaintStatusArray = [];
      var str_array = complaintStatus.split(',');
      for (var i = 0; i < str_array.length; i++) {
        str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
        complaintStatusArray.push(str_array[i]);
      }
      $scope.currentComplaintStatus = complaintStatusArray;
      $scope.getPagedDataAsyncForComplaints($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, "", complaintStatusArray, currentModelOpen,isTodaysData);
      $scope.complaintStatusValue = complaintStatusArray;
      $scope.modalInstance = $modal.open({
        templateUrl: 'demoModalContent.html',
        scope: $scope
      });
    };

    $scope.$watch('pagingOptionsForComplaints', function (newVal, oldVal) {
      if (newVal !== oldVal) {
    	  if($scope.currentModel==="complaints"){
      		$scope
              .getPagedDataAsyncForComplaints(
              $scope.pagingOptionsForComplaints.pageSize,
              $scope.pagingOptionsForComplaints.currentPage,
              $scope.filterOptionsForModal.filterText,
              $scope.currentComplaintStatus,
              $scope.currentModel,
              $scope.isTodaysData);
      	}else if($scope.currentModel==="amcDetails"){
      		$scope.getPagedDataAsyncForAllAMCDetails($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForAMC);
      	}else if($scope.currentModel==="technician"){
      		$scope.getPagedDataAsyncForTechnician($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForTechnician);
      	}else if($scope.currentModel==="liftStatus"){
      		$scope.getPagedDataAsyncForAllLiftStatus($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForLiftStatus);
      	}else if($scope.currentModel==="customerDetails"){
      		$scope.getPagedDataAsyncForAllCustomers($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForCustomers);
      	}else if($scope.currentModel==="companyDetails"){
      		$scope.getPagedDataAsyncForAllCompanies($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForCompanies);
      	}else if($scope.currentModel==="events"){
      		$scope.getPagedDataAsyncForEvents($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForEvents);
      	}
      	else if($scope.currentModel==="branches"){
      		$scope.getPagedDataAsyncForAllBranches($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForBranches);
      	};
      }
    }, true);
    $scope
      .$watch(
      'filterOptionsForModal',
      function (newVal, oldVal) {
        if (newVal !== oldVal) {
        	if($scope.currentModel==="complaints"){
        		$scope
                .getPagedDataAsyncForComplaints(
                $scope.pagingOptionsForComplaints.pageSize,
                $scope.pagingOptionsForComplaints.currentPage,
                $scope.filterOptionsForModal.filterText,
                $scope.currentComplaintStatus,
                $scope.currentModel,
                $scope.isTodaysData);
        	}else if($scope.currentModel==="amcDetails"){
        		$scope.getPagedDataAsyncForAllAMCDetails($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForAMC);
        	}else if($scope.currentModel==="technician"){
          		$scope.getPagedDataAsyncForTechnician($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForTechnician);
          	}else if($scope.currentModel==="liftStatus"){
          		$scope.getPagedDataAsyncForAllLiftStatus($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForLiftStatus);
          	}else if($scope.currentModel==="customerDetails"){
          		$scope.getPagedDataAsyncForAllCustomers($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForCustomers);
          	}else if($scope.currentModel==="companyDetails"){
          		$scope.getPagedDataAsyncForAllCompanies($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForCompanies);
          	}else if($scope.currentModel==="events"){
          		$scope.getPagedDataAsyncForEvents($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForEvents);
          	}
          	else if($scope.currentModel==="branches"){
          		$scope.getPagedDataAsyncForAllBranches($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, $scope.filterOptionsForModal.filterText,$scope.activeFlagForBranches);
          	};
          
        }
      }, true);

    $scope.setPagingDataForComplaints = function (data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myComplaintsData = pagedData;
        $scope.totalServerItemsForComplaints = data.length;
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      };
      
    $scope.getPagedDataAsyncForComplaints = function (pageSize,
      page, searchText, complaintStatus, callingModel,isTodaysData) {
      var url;
      url = '/RLMS/dashboard/getListOfComplaintsForDashboard';
      setTimeout(
        function () {
          var data;
          if (searchText) {
            var ft = searchText
              .toLowerCase();
            var dataToSend = $scope
              .construnctObjeToSend(complaintStatus);
            serviceApi
              .doPostWithData(url, dataToSend)
              .then(
              function (largeLoad) {
                $scope.complaints = largeLoad;
                $scope.showTable = true;
                var userDetails = [];
                if(isTodaysData){
                	largeLoad=largeLoad.filter(function (item) {
                        return (new Date(item.updatedDate)).getTime() === $scope.todaysDate.getTime();
                      });
                }
                for (var i = 0; i < largeLoad.length; i++) {
                  var userDetailsObj = {};
                  if (!!largeLoad[i].complaintNumber) {
                    userDetailsObj["No"] = largeLoad[i].complaintNumber;
                  } else {
                    userDetailsObj["No"] = " - ";
                  }
                  if (!!largeLoad[i].title) {
                    userDetailsObj["CompanyName"] = largeLoad[i].companyName;
                  } else {
                    userDetailsObj["CompanyName"] = " - ";
                  }
                  if (complaintStatus.includes("2") && complaintStatus.includes("3") && complaintStatus.includes("5")) {
                      if (!!largeLoad[i].status) {
                        userDetailsObj["Status"] = largeLoad[i].status;
                      } else {
                        userDetailsObj["Status"] = " - ";
                      }
                    } else {
                    if (!!largeLoad[i].title) {
                      userDetailsObj["Title"] = largeLoad[i].title;
                    } else {
                      userDetailsObj["Title"] = " - ";
                    }
                  }
                  if (!!largeLoad[i].title) {
                    userDetailsObj["Title"] = largeLoad[i].title;
                  } else {
                    userDetailsObj["Title"] = " - ";
                  }
                  if (!!largeLoad[i].city) {
                    userDetailsObj["City"] = largeLoad[i].city;
                  } else {
                    userDetailsObj["City"] = " - ";
                  }
                  userDetails
                    .push(userDetailsObj);
                }
                
                data = userDetails
                  .filter(function (
                    item) {
                    return JSON
                      .stringify(
                      item)
                      .toLowerCase()
                      .indexOf(
                      ft) !== -1;
                  });
                $scope
                  .setPagingDataForComplaints(
                  data,
                  page,
                  pageSize);
              });
          } else {
            var dataToSend = $scope
              .construnctObjeToSend(complaintStatus);
            serviceApi
              .doPostWithData(url,
              dataToSend)
              .then(
              function (
                largeLoad) {
                $scope.complaints = largeLoad;
                $scope.showTable = true;
                var userDetails = [];
                if(isTodaysData){
                	largeLoad=largeLoad.filter(function (item) {
                        return (new Date(item.updatedDate)).getTime() === $scope.todaysDate.getTime();
                      });
                }
                for (var i = 0; i < largeLoad.length; i++) {
                  var userDetailsObj = {};
                  if (!!largeLoad[i].complaintNumber) {
                    userDetailsObj["No"] = largeLoad[i].complaintNumber;
                  } else {
                    userDetailsObj["No"] = " - ";
                  }
                  if (!!largeLoad[i].title) {
                    userDetailsObj["CompanyName"] = largeLoad[i].companyName;
                  } else {
                    userDetailsObj["CompanyName"] = " - ";
                  }
                  if (complaintStatus.includes("2") && complaintStatus.includes("3") && complaintStatus.includes("5")) {
                    if (!!largeLoad[i].status) {
                      userDetailsObj["Status"] = largeLoad[i].status;
                    } else {
                      userDetailsObj["Status"] = " - ";
                    }
                  } else {
                    if (!!largeLoad[i].title) {
                      userDetailsObj["Title"] = largeLoad[i].title;
                    } else {
                      userDetailsObj["Title"] = " - ";
                    }
                  }
                  if (!!largeLoad[i].city) {
                    userDetailsObj["City"] = largeLoad[i].city;
                  } else {
                    userDetailsObj["City"] = " - ";
                  }
                  userDetails
                    .push(userDetailsObj);
                }
                $scope
                  .setPagingDataForComplaints(
                  userDetails,
                  page,
                  pageSize);
              });

          }
        }, 100);
    };

    $scope.cancel = function () {
      $scope.modalInstance.dismiss('cancel');
    };

    $scope.construnctObjeToSend = function (complaintStatus) {
      var dataToSend = {
        statusList: [],
        companyId: $rootScope.loggedInUserInfoForDashboard.data.userRole.rlmsCompanyMaster.companyId
      };
      dataToSend["statusList"] = complaintStatus;
      return dataToSend;
    };
    
    $scope.openDemoModalForTechnician = function (currentModelOpen, headerValue, activeFlag) {
        var emptyComplaintsArray = [];
        $scope.myComplaintsData = emptyComplaintsArray;
        $scope.pagingOptionsForComplaints.currentPage = 1;
        $scope.totalServerItemsForComplaints = 0;
        $scope.filterOptionsForModal.filterText='';
        $scope.currentModel = currentModelOpen;
        $scope.modalHeaderVal = headerValue;
        $scope.activeFlagForTechnician = activeFlag;
        $scope.getPagedDataAsyncForTechnician($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, "",activeFlag); 
        $scope.modalInstance = $modal.open({
          templateUrl: 'demoModalContent.html',
          scope: $scope
        });
      };
    
    $scope.getPagedDataAsyncForTechnician = function (pageSize,
    	      page, searchText, activeFlag) {
    	      var url;
    	      url = '/RLMS/dashboard/getListOfTechniciansForDashboard';
    	      setTimeout(
    	        function () {
    	          var data;
    	          if (searchText) {
    	            var ft = searchText
    	              .toLowerCase();
    	            var dataToSend = $scope
    	              .construnctObjeToSendForTechnician();
    	            serviceApi
    	              .doPostWithData(url, dataToSend)
    	              .then(
    	              function (largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                if (activeFlag=="Active") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 1;
      	                  });
      	                }
    	                if (activeFlag=="InActive") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 0;
      	                  });
      	                }
    	                if(activeFlag=="Total"){
    	                    serviceApi
    	    	              .doPostWithData( '/RLMS/dashboard/getTotalCountOfTechniciansForBranch', dataToSend)
    	    	              .then(
    	    	              function (data){
    	    	                  for (var i = 0; i < data.length; i++) {
    	          	                  var userDetailsObj = {};
    	          	                   userDetailsObj["No"] = i+1;
    	          	                   if (!!data[i].branchName) {
    	          	                    userDetailsObj["BranchName"] = data[i].branchName;
    	          	                  } else {
    	          	                    userDetailsObj["BranchName"] = " - ";
    	          	                  }
    	          	                  if (!!data[i].city) {
    	          	                    userDetailsObj["City"] = data[i].city;
    	          	                  } else {
    	          	                    userDetailsObj["City"] = " - ";
    	          	                  }
    	          	                if (!!data[i].count) {
    	          	                    userDetailsObj["TechnicianCount"] = data[i].count;
    	          	                  } else {
    	          	                    userDetailsObj["TechnicianCount"] = " - ";
    	          	                  }
    	          	                  userDetails
    	          	                    .push(userDetailsObj);
    	          	                }
    	    	                  $scope
    	    	                  .setPagingDataForComplaints(
    	    	                  userDetails,
    	    	                  page,
    	    	                  pageSize);
    	    	              });
    	                    
    	                }
    	                else{
    	                	for (var i = 0; i < largeLoad.length; i++) {
    	                		var userDetailsObj = {};
    	                		if (!!largeLoad[i].userId) {
    	                			userDetailsObj["No"] = largeLoad[i].userId;
    	                		} else {
    	                			userDetailsObj["No"] = " - ";
    	                  }
    	                		if (!!largeLoad[i].companyName) {
    	                			userDetailsObj["CompanyName"] = largeLoad[i].companyName;
    	                		} else {
    	                			userDetailsObj["CompanyName"] = " - ";
    	                		}
    	                		if (!!largeLoad[i].city) {
    	                			userDetailsObj["City"] = largeLoad[i].city;
    	                		} else {
    	                			userDetailsObj["City"] = " - ";
    	                		}
    	                		userDetails
    	                		.push(userDetailsObj);
    	                	}
    	                }
    	                data = userDetails
    	                  .filter(function (
    	                    item) {
    	                    return JSON
    	                      .stringify(
    	                      item)
    	                      .toLowerCase()
    	                      .indexOf(
    	                      ft) !== -1;
    	                  });
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  data,
    	                  page,
    	                  pageSize);
    	              });
    	          } else {
    	            var dataToSend = $scope
    	              .construnctObjeToSendForTechnician();
    	            serviceApi
    	              .doPostWithData(url,
    	              dataToSend)
    	              .then(
    	              function (
    	                largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                if (activeFlag=="Active") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 1;
      	                  });
      	                }
    	                if (activeFlag=="InActive") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 0;
      	                  });
      	                }
    	                if(activeFlag=="Total"){
    	                    serviceApi
    	    	              .doPostWithData( '/RLMS/dashboard/getTotalCountOfTechniciansForBranch', dataToSend)
    	    	              .then(
    	    	              function (data){
    	    	                  for (var i = 0; i < data.length; i++) {
    	          	                  var userDetailsObj = {};
    	          	                   userDetailsObj["No"] = i+1;
    	          	                   if (!!data[i].branchName) {
    	          	                    userDetailsObj["BranchName"] = data[i].branchName;
    	          	                  } else {
    	          	                    userDetailsObj["BranchName"] = " - ";
    	          	                  }
    	          	                  if (!!data[i].city) {
    	          	                    userDetailsObj["City"] = data[i].city;
    	          	                  } else {
    	          	                    userDetailsObj["City"] = " - ";
    	          	                  }
    	          	                if (!!data[i].count) {
    	          	                    userDetailsObj["TechnicianCount"] = data[i].count;
    	          	                  } else {
    	          	                    userDetailsObj["TechnicianCount"] = " - ";
    	          	                  }
    	          	                  userDetails
    	          	                    .push(userDetailsObj);
    	          	                }
    	    	                  $scope
    	    	                  .setPagingDataForComplaints(
    	    	                  userDetails,
    	    	                  page,
    	    	                  pageSize);
    	    	              });
    	                    
    	                }
    	                else{
    	                for (var i = 0; i < largeLoad.length; i++) {
      	                  var userDetailsObj = {};
      	                  if (!!largeLoad[i].userId) {
      	                    userDetailsObj["No"] = largeLoad[i].userId;
      	                  } else {
      	                    userDetailsObj["No"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].companyName) {
      	                    userDetailsObj["CompanyName"] = largeLoad[i].companyName;
      	                  } else {
      	                    userDetailsObj["CompanyName"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].city) {
      	                    userDetailsObj["City"] = largeLoad[i].city;
      	                  } else {
      	                    userDetailsObj["City"] = " - ";
      	                  }
      	                  userDetails
      	                    .push(userDetailsObj);
      	                }}
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  userDetails,
    	                  page,
    	                  pageSize);
    	              });

    	          }
    	        }, 100);
    	    };
    	    $scope.getTechnicianCount = function (technicianStatus) {
    	        var complaintStatusArray = [];
    	        
    	        setTimeout(
    	          function () {
    	            var dataToSend = $scope
    	              .construnctObjeToSendForTechnician();
    	            serviceApi
    	              .doPostWithData(
    	              '/RLMS/dashboard/getListOfTechniciansForDashboard',
    	              dataToSend)
    	              .then(
    	              function (
    	                largeLoad) {
    	                if (technicianStatus=="Active") {
    	                  $scope.activeTechnicians = largeLoad.filter(function (item) {
    	                    return item.activeFlag === 1;
    	                  });
    	                  $scope.technicianData.activeTechnicians.text=$scope.activeTechnicians.length;
    	                }
    	                if(technicianStatus=="InActive"){
    	                	$scope.inactiveTechnicians = largeLoad.filter(function (item) {
        	                    return item.activeFlag === 0;
        	                  });
    	                	if($scope.inactiveTechnicians.length>0){
    	                		$scope.technicianData.inactiveTechnicians.text=$scope.inactiveTechnicians.length;
    	                	}
    	                }
    	                if(technicianStatus=="TotalTechnician"){
        	                  $scope.technicianData.totalTechnicians.text=largeLoad.length;
    	                }
    	              });
    	          }, 100);
    	      };
    	      
    $scope.getTechnicianCount("Active");
    $scope.getTechnicianCount("InActive");
    $scope.getTechnicianCount("TotalTechnician");
    
    $scope.construnctObjeToSendForTechnician = function () {
        var dataToSend = {
          companyId: $rootScope.loggedInUserInfoForDashboard.data.userRole.rlmsCompanyMaster.companyId
        };
        return dataToSend;
      };
      
      $scope.constructDataToSendForAllAMCDetails=function() {
      	var tempStatus =[];
      	tempStatus.push(38);
      	tempStatus.push(39);
      	tempStatus.push(40);
      	tempStatus.push(41);
        var data = {
          companyId: $rootScope.loggedInUserInfoForDashboard.data.userRole.rlmsCompanyMaster.companyId,
          listOFStatusIds:tempStatus
        };
        return data;
      };
      
      $scope.openDemoModalForAllAMCDetails = function (currentModelOpen, headerValue, activeFlag) {
          var emptyComplaintsArray = [];
          $scope.myComplaintsData = emptyComplaintsArray;
          $scope.pagingOptionsForComplaints.currentPage = 1;
          $scope.totalServerItemsForComplaints = 0;
          $scope.currentModel = currentModelOpen;
          $scope.filterOptionsForModal.filterText='';
          $scope.modalHeaderVal = headerValue;
          $scope.activeFlagForAMC=activeFlag;
          $scope.getPagedDataAsyncForAllAMCDetails($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, "",activeFlag); 
          $scope.modalInstance = $modal.open({
            templateUrl: 'demoModalContent.html',
            scope: $scope
          });
        };
      
      $scope.getPagedDataAsyncForAllAMCDetails = function (pageSize,
    	      page, searchText, activeFlag) {
    	      var url;
    	      url = '/RLMS/dashboard/getAllAMCDetails';
    	      setTimeout(
    	        function () {
    	          var data;
    	          if (searchText) {
    	            var ft = searchText
    	              .toLowerCase();
    	            var dataToSend = $scope
    	              .constructDataToSendForAllAMCDetails();
    	            serviceApi
    	              .doPostWithData(url, dataToSend)
    	              .then(
    	              function (largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                if (activeFlag=="Active") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 1 && ((new Date(item.amcEdDate)).getTime() >= $scope.todaysDate.getTime());
      	                  });
      	                }
    	                if (activeFlag=="InActive") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 0;
      	                  });
      	                }
    	                if(activeFlag==="Expire"){
    	                	largeLoad = largeLoad.filter(function (item) {
    	  	                    return (new Date(item.amcEdDate)).getTime() < $scope.todaysDate.getTime();
    	  	                  });
    	                }
    	                for (var i = 0; i < largeLoad.length; i++) {
    	                  var userDetailsObj = {};
    	                  if (!!largeLoad[i].liftNumber) {
      	                    userDetailsObj["No"] = largeLoad[i].liftNumber;
      	                  } else {
      	                    userDetailsObj["No"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].companyName) {
      	                    userDetailsObj["CompanyName"] = largeLoad[i].companyName;
      	                  } else {
      	                    userDetailsObj["CompanyName"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].customerName) {
      	                    userDetailsObj["CustomerName"] = largeLoad[i].customerName;
      	                  } else {
      	                    userDetailsObj["CustomerName"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].amcStartDate) {
        	                userDetailsObj["AMCStartDate"] = largeLoad[i].amcStartDate;
        	              } else {
        	                userDetailsObj["AMCStartDate"] = " - ";
        	              }
      	                  if (!!largeLoad[i].amcEndDate) {
          	                userDetailsObj["AMCEndDate"] = largeLoad[i].amcEndDate;
          	              } else {
          	                userDetailsObj["AMCEndDate"] = " - ";
          	              }
    	                  userDetails
    	                    .push(userDetailsObj);
    	                }
    	                
    	                data = userDetails
    	                  .filter(function (
    	                    item) {
    	                    return JSON
    	                      .stringify(
    	                      item)
    	                      .toLowerCase()
    	                      .indexOf(
    	                      ft) !== -1;
    	                  });
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  data,
    	                  page,
    	                  pageSize);
    	              });
    	          } else {
    	            var dataToSend = $scope
    	              .constructDataToSendForAllAMCDetails();
    	            serviceApi
    	              .doPostWithData(url,
    	              dataToSend)
    	              .then(
    	              function (
    	                largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                if (activeFlag=="Active") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 1 && ((new Date(item.amcEdDate)).getTime() >= $scope.todaysDate.getTime());
      	                  });
      	                }
    	                if (activeFlag=="InActive") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 0;
      	                  });
      	                }
    	                if(activeFlag==="Expire"){
    	                	largeLoad = largeLoad.filter(function (item) {
    	  	                    return (new Date(item.amcEdDate)).getTime() < $scope.todaysDate.getTime();
    	  	                  });
    	                }
    	                for (var i = 0; i < largeLoad.length; i++) {
      	                  var userDetailsObj = {};
      	                if (!!largeLoad[i].liftNumber) {
      	                    userDetailsObj["No"] = largeLoad[i].liftNumber;
      	                  } else {
      	                    userDetailsObj["No"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].companyName) {
      	                    userDetailsObj["CompanyName"] = largeLoad[i].companyName;
      	                  } else {
      	                    userDetailsObj["CompanyName"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].customerName) {
      	                    userDetailsObj["CustomerName"] = largeLoad[i].customerName;
      	                  } else {
      	                    userDetailsObj["CustomerName"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].amcStartDate) {
        	                userDetailsObj["AMCStartDate"] = largeLoad[i].amcStartDate;
        	              } else {
        	                userDetailsObj["AMCStartDate"] = " - ";
        	              }
      	                  if (!!largeLoad[i].amcEndDate) {
          	                userDetailsObj["AMCEndDate"] = largeLoad[i].amcEndDate;
          	              } else {
          	                userDetailsObj["AMCEndDate"] = " - ";
          	              }
      	                  userDetails
      	                    .push(userDetailsObj);
      	                }
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  userDetails,
    	                  page,
    	                  pageSize);
    	              });

    	          }
    	        }, 100);
    	    }; 
      
      
      
      $scope.getActiveAMCCount = function (amcStatus) {
	        
	        setTimeout(
	          function () {
	            var dataToSend = $scope
	              .constructDataToSendForAllAMCDetails();
	            serviceApi
	              .doPostWithData(
	              '/RLMS/dashboard/getAllAMCDetails',
	              dataToSend)
	              .then(
	              function (
	                largeLoad) {
	                if (amcStatus=="Active") {
	                  $scope.activeAMCDetails = largeLoad.filter(function (item) {
	                    return item.activeFlag === 1 && ((new Date(item.amcEdDate)).getTime() >= $scope.todaysDate.getTime());
	                  });
	                  $scope.amcDetailsData.activeAmc.text=$scope.activeAMCDetails.length;
	                }
	                if(amcStatus=="InActive"){
	                	$scope.inactiveAMCDetails = largeLoad.filter(function (item) {
  	                    return item.activeFlag === 0;
  	                  });
  	                  $scope.amcDetailsData.inactiveAmc.text=$scope.inactiveAMCDetails.length;
	                }
	                if(amcStatus=="Expire"){
	                	$scope.expireAMC = largeLoad.filter(function (item) {
  	                    return (new Date(item.amcEdDate)).getTime() < $scope.todaysDate.getTime();
  	                  });
  	                  $scope.amcDetailsData.expiredAmc.text=$scope.expireAMC.length;
	                }
	                /*if(amcStatus=="RenewalForThisMonth"){
	                	$scope.renewalForThisMonthAMC = largeLoad.filter(function (item) {
  	                    return (new Date(item.amcEdDate)).getTime() < $scope.todaysDate.getTime();
  	                  });
  	                  $scope.amcDetailsData.totalRenewalForThisMonth.text=$scope.renewalForThisMonthAMC.length;
	                }*/
	              });
	          }, 100);
	      };
      
      $scope.getActiveAMCCount("Active");
      $scope.getActiveAMCCount("InActive");
      $scope.getActiveAMCCount("Expire");
      $scope.getActiveAMCCount("RenewalForThisMonth");
      
      
      $scope.openDemoModalForAllLiftStatusDetails = function (currentModelOpen, headerValue, activeFlag) {
          var emptyComplaintsArray = [];
          $scope.myComplaintsData = emptyComplaintsArray;
          $scope.pagingOptionsForComplaints.currentPage = 1;
          $scope.totalServerItemsForComplaints = 0;
          $scope.currentModel = currentModelOpen;
          $scope.filterOptionsForModal.filterText='';
          $scope.modalHeaderVal = headerValue;
          $scope.activeFlagForLiftStatus=activeFlag;
          $scope.getPagedDataAsyncForAllLiftStatus($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, "",activeFlag); 
          $scope.modalInstance = $modal.open({
            templateUrl: 'demoModalContent.html',
            scope: $scope
          });
        };
      
      $scope.getPagedDataAsyncForAllLiftStatus = function (pageSize,
    	      page, searchText, activeFlag) {
    	      var url;
    	      url = '/RLMS/dashboard/getLiftStatus';
    	      setTimeout(
    	        function () {
    	          var data;
    	          if (searchText) {
    	            var ft = searchText
    	              .toLowerCase();
    	            var dataToSend = $scope
    	              .constructDataToSendForAllLiftStatus();
    	            serviceApi
    	              .doPostWithData(url, dataToSend)
    	              .then(
    	              function (largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                if (activeFlag=="Active") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 1;
      	                  });
      	                }
    	                if (activeFlag=="InActive") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 0;
      	                  });
      	                }
    	                for (var i = 0; i < largeLoad.length; i++) {
    	                  var userDetailsObj = {};
    	                  if (!!largeLoad[i].liftId) {
      	                    userDetailsObj["No"] = largeLoad[i].liftId;
      	                  } else {
      	                    userDetailsObj["No"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].liftNumber) {
      	                    userDetailsObj["LiftNumber"] = largeLoad[i].liftNumber;
      	                  } else {
      	                    userDetailsObj["LiftNumber"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].companyName) {
      	                    userDetailsObj["CompanyName"] = largeLoad[i].companyName;
      	                  } else {
      	                    userDetailsObj["CompanyName"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].customerName) {
        	                userDetailsObj["CustomerName"] = largeLoad[i].customerName;
        	              } else {
        	                userDetailsObj["CustomerName"] = " - ";
        	              }
      	                  if (!!largeLoad[i].dateOfInstallationStr) {
          	                userDetailsObj["InstallationDate"] = largeLoad[i].dateOfInstallationStr;
          	              } else {
          	                userDetailsObj["InstallationDate"] = " - ";
          	              }
    	                  userDetails
    	                    .push(userDetailsObj);
    	                }
    	                
    	                data = userDetails
    	                  .filter(function (
    	                    item) {
    	                    return JSON
    	                      .stringify(
    	                      item)
    	                      .toLowerCase()
    	                      .indexOf(
    	                      ft) !== -1;
    	                  });
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  data,
    	                  page,
    	                  pageSize);
    	              });
    	          } else {
    	            var dataToSend = $scope
    	              .constructDataToSendForAllLiftStatus();
    	            serviceApi
    	              .doPostWithData(url,
    	              dataToSend)
    	              .then(
    	              function (
    	                largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                if (activeFlag=="Active") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 1;
      	                  });
      	                }
    	                if (activeFlag=="InActive") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 0;
      	                  });
      	                }
    	                for (var i = 0; i < largeLoad.length; i++) {
    	                	var userDetailsObj = {};
    	                if (!!largeLoad[i].liftId) {
      	                    userDetailsObj["No"] = largeLoad[i].liftId;
      	                  } else {
      	                    userDetailsObj["No"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].liftNumber) {
      	                    userDetailsObj["LiftNumber"] = largeLoad[i].liftNumber;
      	                  } else {
      	                    userDetailsObj["LiftNumber"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].companyName) {
      	                    userDetailsObj["CompanyName"] = largeLoad[i].companyName;
      	                  } else {
      	                    userDetailsObj["CompanyName"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].customerName) {
        	                userDetailsObj["CustomerName"] = largeLoad[i].customerName;
        	              } else {
        	                userDetailsObj["CustomerName"] = " - ";
        	              }
      	                  if (!!largeLoad[i].dateOfInstallationStr) {
          	                userDetailsObj["InstallationDate"] = largeLoad[i].dateOfInstallationStr;
          	              } else {
          	                userDetailsObj["InstallationDate"] = " - ";
          	              }
      	                  userDetails
      	                    .push(userDetailsObj);
      	                };
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  userDetails,
    	                  page,
    	                  pageSize);
    	              });

    	          }
    	        }, 100);
    	    }; 
      
      $scope.constructDataToSendForAllLiftStatus=function() {
          var data = {
            companyId: $rootScope.loggedInUserInfoForDashboard.data.userRole.rlmsCompanyMaster.companyId
          };
          return data;
        };
      
      $scope.getLiftStatusDetailsCount = function (liftStatus) {
	        
	        setTimeout(
	          function () {
	            var dataToSend = $scope
	              .constructDataToSendForAllLiftStatus();
	            serviceApi
	              .doPostWithData(
	              '/RLMS/dashboard/getLiftStatus',
	              dataToSend)
	              .then(
	              function (
	                largeLoad) {
	                if (liftStatus=="Active") {
	                  $scope.activeLiftStatus = largeLoad.filter(function (item) {
	                    return item.activeFlag === 1;
	                  });
	                  $scope.liftStatus.activeLiftStatus.text=$scope.activeLiftStatus.length;
	                }
	                if(liftStatus=="InActive"){
	                	$scope.inactiveLiftStatus = largeLoad.filter(function (item) {
	                    return item.activeFlag === 0;
	                  });
	                  $scope.liftStatus.inactiveLiftStatus.text=$scope.inactiveLiftStatus.length;
	                }
	                if(liftStatus=="Total"){
	                  $scope.liftStatus.totalInstalled.text=largeLoad.length;
	                }
	              });
	          }, 100);
	      };
    
      $scope.getLiftStatusDetailsCount("Active");
      $scope.getLiftStatusDetailsCount("InActive");
      $scope.getLiftStatusDetailsCount("Total");
      
      $scope.openDemoModalForAllCustomers = function (currentModelOpen, headerValue, activeFlag) {
          var emptyComplaintsArray = [];
          $scope.myComplaintsData = emptyComplaintsArray;
          $scope.pagingOptionsForComplaints.currentPage = 1;
          $scope.totalServerItemsForComplaints = 0;
          $scope.currentModel = currentModelOpen;
          $scope.filterOptionsForModal.filterText='';
          $scope.modalHeaderVal = headerValue;
          $scope.activeFlagForCustomers=activeFlag;
          $scope.getPagedDataAsyncForAllCustomers($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, "",activeFlag); 
          $scope.modalInstance = $modal.open({
            templateUrl: 'demoModalContent.html',
            scope: $scope
          });
        };
      
      $scope.getPagedDataAsyncForAllCustomers = function (pageSize,
    	      page, searchText, activeFlag) {
    	      var url;
    	      url = '/RLMS/dashboard/getListOfCustomerForDashboard';
    	      setTimeout(
    	        function () {
    	          var data;
    	          if (searchText) {
    	            var ft = searchText
    	              .toLowerCase();
    	            var dataToSend = $scope
    	              .constructDataToSendForAllLiftStatus();
    	            serviceApi
    	              .doPostWithData(url, dataToSend)
    	              .then(
    	              function (largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                if (activeFlag=="Active") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 1;
      	                  });
      	                }
    	                if (activeFlag=="InActive") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 0;
      	                  });
      	                }
    	                for (var i = 0; i < largeLoad.length; i++) {
    	                  var userDetailsObj = {};
    	                  if (!!largeLoad[i].customerId) {
      	                    userDetailsObj["No"] = largeLoad[i].customerId;
      	                  } else {
      	                    userDetailsObj["No"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].companyName) {
      	                    userDetailsObj["CompanyName"] = largeLoad[i].companyName;
      	                  } else {
      	                    userDetailsObj["CompanyName"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].customerName) {
        	                userDetailsObj["CustomerName"] = largeLoad[i].customerName;
        	              } else {
        	                userDetailsObj["CustomerName"] = " - ";
        	              }
      	                  if (!!largeLoad[i].city) {
          	                userDetailsObj["City"] = largeLoad[i].city;
          	              } else {
          	                userDetailsObj["City"] = " - ";
          	              }
    	                  userDetails
    	                    .push(userDetailsObj);
    	                }
    	                   data = userDetails
    	                  .filter(function (
    	                    item) {
    	                    return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
    	                  });
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  data,
    	                  page,
    	                  pageSize);
    	              });
    	          } else {
    	            var dataToSend = $scope
    	              .constructDataToSendForAllLiftStatus();
    	            serviceApi
    	              .doPostWithData(url,
    	              dataToSend)
    	              .then(
    	              function (
    	                largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                if (activeFlag=="Active") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 1;
      	                  });
      	                }
    	                if (activeFlag=="InActive") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 0;
      	                  });
      	                }
    	                for (var i = 0; i < largeLoad.length; i++) {
    	                	var userDetailsObj = {};
    	                	if (!!largeLoad[i].customerId) {
          	                    userDetailsObj["No"] = largeLoad[i].customerId;
          	                  } else {
          	                    userDetailsObj["No"] = " - ";
          	                  }
          	                  if (!!largeLoad[i].companyName) {
          	                    userDetailsObj["CompanyName"] = largeLoad[i].companyName;
          	                  } else {
          	                    userDetailsObj["CompanyName"] = " - ";
          	                  }
          	                  if (!!largeLoad[i].customerName) {
            	                userDetailsObj["CustomerName"] = largeLoad[i].customerName;
            	              } else {
            	                userDetailsObj["CustomerName"] = " - ";
            	              }
          	                  if (!!largeLoad[i].city) {
              	                userDetailsObj["City"] = largeLoad[i].city;
              	              } else {
              	                userDetailsObj["City"] = " - ";
              	              }
      	                  userDetails
      	                    .push(userDetailsObj);
      	                };
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  userDetails,
    	                  page,
    	                  pageSize);
    	              });

    	          }
    	        }, 100);
    	    }; 
      
      $scope.getCustomerDetailsCount = function (liftStatus) {
	        
	        setTimeout(
	          function () {
	            var dataToSend = $scope
	              .constructDataToSendForAllLiftStatus();
	            serviceApi
	              .doPostWithData(
	              '/RLMS/dashboard/getListOfCustomerForDashboard',
	              dataToSend)
	              .then(
	              function (
	                largeLoad) {
	                if (liftStatus=="Active") {
	                  $scope.activeCustomers = largeLoad.filter(function (item) {
	                    return item.activeFlag === 1;
	                  });
	                  $scope.customersDetails.activeCustomers.text=$scope.activeCustomers.length;
	                }
	                if(liftStatus=="InActive"){
	                	$scope.inactiveCustomers = largeLoad.filter(function (item) {
	                    return item.activeFlag === 0;
	                  });
	                  $scope.customersDetails.inactiveCustomers.text=$scope.inactiveCustomers.length;
	                }
	                if(liftStatus=="Total"){
	                  $scope.customersDetails.totalCustomers.text=largeLoad.length;
	                }
	              });
	          }, 100);
	      };
      
      $scope.getCustomerDetailsCount("Active");
      $scope.getCustomerDetailsCount("InActive");
      $scope.getCustomerDetailsCount("Total");
      
      $scope.openDemoModalForAllBranches = function (currentModelOpen, headerValue, activeFlag) {
          var emptyComplaintsArray = [];
          $scope.myComplaintsData = emptyComplaintsArray;
          $scope.pagingOptionsForComplaints.currentPage = 1;
          $scope.totalServerItemsForComplaints = 0;
          $scope.currentModel = currentModelOpen;
          $scope.filterOptionsForModal.filterText='';
          $scope.modalHeaderVal = headerValue;
          $scope.activeFlagForBranches=activeFlag;
          $scope.getPagedDataAsyncForAllBranches($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, "",activeFlag); 
          $scope.modalInstance = $modal.open({
            templateUrl: 'demoModalContent.html',
            scope: $scope
          });
        };
      
      $scope.getPagedDataAsyncForAllBranches = function (pageSize,
    	      page, searchText, activeFlag) {
    	      var url;
    	      url = '/RLMS/dashboard/getListOfBranchDtlsForDashboard';
    	      setTimeout(
    	        function () {
    	          var data;
    	          if (searchText) {
    	            var ft = searchText
    	              .toLowerCase();
    	            var dataToSend = $scope
    	              .constructDataToSendForAllLiftStatus();
    	            serviceApi
    	              .doPostWithData(url, dataToSend)
    	              .then(
    	              function (largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                if (activeFlag=="Active") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 1;
      	                  });
      	                }
    	                if (activeFlag=="InActive") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 0;
      	                  });
      	                }
    	                for (var i = 0; i < largeLoad.length; i++) {
    	                  var userDetailsObj = {};
    	                  if (!!largeLoad[i].id) {
      	                    userDetailsObj["No"] = largeLoad[i].id;
      	                  } else {
      	                    userDetailsObj["No"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].companyName) {
      	                    userDetailsObj["CompanyName"] = largeLoad[i].companyName;
      	                  } else {
      	                    userDetailsObj["CompanyName"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].branchName) {
        	                userDetailsObj["BranchName"] = largeLoad[i].branchName;
        	              } else {
        	                userDetailsObj["BranchName"] = " - ";
        	              }
      	                  if (!!largeLoad[i].city) {
          	                userDetailsObj["City"] = largeLoad[i].city;
          	              } else {
          	                userDetailsObj["City"] = " - ";
          	              }
    	                  userDetails
    	                    .push(userDetailsObj);
    	                }
    	                
    	                data = userDetails
    	                  .filter(function (
    	                    item) {
    	                    return JSON
    	                      .stringify(
    	                      item)
    	                      .toLowerCase()
    	                      .indexOf(
    	                      ft) !== -1;
    	                  });
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  data,
    	                  page,
    	                  pageSize);
    	              });
    	          } else {
    	            var dataToSend = $scope
    	              .constructDataToSendForAllLiftStatus();
    	            serviceApi
    	              .doPostWithData(url,
    	              dataToSend)
    	              .then(
    	              function (
    	                largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                if (activeFlag=="Active") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 1;
      	                  });
      	                }
    	                if (activeFlag=="InActive") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 0;
      	                  });
      	                }
    	                for (var i = 0; i < largeLoad.length; i++) {
    	                	var userDetailsObj = {};
    	                	if (!!largeLoad[i].id) {
          	                    userDetailsObj["No"] = largeLoad[i].id;
          	                  } else {
          	                    userDetailsObj["No"] = " - ";
          	                  }
          	                  if (!!largeLoad[i].companyName) {
          	                    userDetailsObj["CompanyName"] = largeLoad[i].companyName;
          	                  } else {
          	                    userDetailsObj["CompanyName"] = " - ";
          	                  }
          	                  if (!!largeLoad[i].branchName) {
            	                userDetailsObj["BranchName"] = largeLoad[i].branchName;
            	              } else {
            	                userDetailsObj["BranchName"] = " - ";
            	              }
          	                  if (!!largeLoad[i].city) {
              	                userDetailsObj["City"] = largeLoad[i].city;
              	              } else {
              	                userDetailsObj["City"] = " - ";
              	              }
      	                  userDetails
      	                    .push(userDetailsObj);
      	                };
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  userDetails,
    	                  page,
    	                  pageSize);
    	              });

    	          }
    	        }, 100);
    	    }; 
      
      $scope.getBranchesCount = function (liftStatus) {
	        setTimeout(
	          function () {
	            var dataToSend = $scope
	              .constructDataToSendForAllLiftStatus();
	            serviceApi
	              .doPostWithData(
	              '/RLMS/dashboard/getListOfBranchDtlsForDashboard',
	              dataToSend)
	              .then(
	              function (
	                largeLoad) {
	                if (liftStatus=="Active") {
	                  $scope.activeBranches = largeLoad.filter(function (item) {
	                    return item.activeFlag === 1;
	                  });
	                  $scope.branchDetails.activeBranches.text=$scope.activeBranches.length;
	                }
	                if(liftStatus=="InActive"){
	                	$scope.inactiveBranches = largeLoad.filter(function (item) {
	                    return item.activeFlag === 0;
	                  });
	                  $scope.branchDetails.inactiveBranches.text=$scope.inactiveBranches.length;
	                }
	                if(liftStatus=="Total"){
	                  $scope.branchDetails.total.text=largeLoad.length;
	                }
	              });
	          }, 100);
	      };
      
      $scope.getBranchesCount("Active");
      $scope.getBranchesCount("InActive");
      $scope.getBranchesCount("Total");
      
      $scope.openDemoModalForAllCompanies = function (currentModelOpen, headerValue, activeFlag) {
          var emptyComplaintsArray = [];
          $scope.myComplaintsData = emptyComplaintsArray;
          $scope.pagingOptionsForComplaints.currentPage = 1;
          $scope.totalServerItemsForComplaints = 0;
          $scope.currentModel = currentModelOpen;
          $scope.filterOptionsForModal.filterText='';
          $scope.modalHeaderVal = headerValue;
          $scope.activeFlagForCompanies=activeFlag;
          $scope.getPagedDataAsyncForAllCompanies($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, "",activeFlag); 
          $scope.modalInstance = $modal.open({
            templateUrl: 'demoModalContent.html',
            scope: $scope
          });
        };
      
      $scope.getPagedDataAsyncForAllCompanies = function (pageSize,
    	      page, searchText, activeFlag) {
    	      var url;
    	      url = '/RLMS/dashboard/getAllCompanyDetailsForDashboard';
    	      setTimeout(
    	        function () {
    	          var data;
    	          if (searchText) {
    	            var ft = searchText
    	              .toLowerCase();
    	            serviceApi
    	              .doPostWithData(url)
    	              .then(
    	              function (largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                if (activeFlag=="Active") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 1;
      	                  });
      	                }
    	                if (activeFlag=="InActive") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 0;
      	                  });
      	                }
    	                for (var i = 0; i < largeLoad.length; i++) {
    	                  var userDetailsObj = {};
    	                  if (!!largeLoad[i].companyId) {
      	                    userDetailsObj["No"] = largeLoad[i].companyId;
      	                  } else {
      	                    userDetailsObj["No"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].companyName) {
      	                    userDetailsObj["CompanyName"] = largeLoad[i].companyName;
      	                  } else {
      	                    userDetailsObj["CompanyName"] = " - ";
      	                  }
      	                  if (!!largeLoad[i].city) {
          	                userDetailsObj["City"] = largeLoad[i].city;
          	              } else {
          	                userDetailsObj["City"] = " - ";
          	              }
      	                  if (!!largeLoad[i].numberOfBranches) {
            	                userDetailsObj["TotalBranches"] = largeLoad[i].numberOfBranches;
            	              } else {
            	                userDetailsObj["TotalBranches"] = " - ";
            	              }

    	                  userDetails
    	                    .push(userDetailsObj);
    	                }
    	                
    	                data = userDetails
    	                  .filter(function (
    	                    item) {
    	                    return JSON
    	                      .stringify(
    	                      item)
    	                      .toLowerCase()
    	                      .indexOf(
    	                      ft) !== -1;
    	                  });
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  data,
    	                  page,
    	                  pageSize);
    	              });
    	          } else {
    	            serviceApi
    	              .doPostWithData(url)
    	              .then(
    	              function (
    	                largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                if (activeFlag=="Active") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 1;
      	                  });
      	                }
    	                if (activeFlag=="InActive") {
    	                	largeLoad = largeLoad.filter(function (item) {
      	                    return item.activeFlag === 0;
      	                  });
      	                }
    	                for (var i = 0; i < largeLoad.length; i++) {
    	                	var userDetailsObj = {};
    	                	if (!!largeLoad[i].companyId) {
          	                    userDetailsObj["No"] = largeLoad[i].companyId;
          	                  } else {
          	                    userDetailsObj["No"] = " - ";
          	                  }
          	                  if (!!largeLoad[i].companyName) {
          	                    userDetailsObj["CompanyName"] = largeLoad[i].companyName;
          	                  } else {
          	                    userDetailsObj["CompanyName"] = " - ";
          	                  }
          	                  if (!!largeLoad[i].city) {
              	                userDetailsObj["City"] = largeLoad[i].city;
              	              } else {
              	                userDetailsObj["City"] = " - ";
              	              }
          	                  if (!!largeLoad[i].numberOfBranches) {
                	                userDetailsObj["TotalBranches"] = largeLoad[i].numberOfBranches;
                	              } else {
                	                userDetailsObj["TotalBranches"] = " - ";
                	              }
      	                  userDetails
      	                    .push(userDetailsObj);
      	                };
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  userDetails,
    	                  page,
    	                  pageSize);
    	              });

    	          }
    	        }, 100);
    	    }; 
      
      $scope.getCompaniesCount = function (companyStatus) {
	        
	        setTimeout(
	          function () {
	            serviceApi
	              .doPostWithData(
	              '/RLMS/dashboard/getAllCompanyDetailsForDashboard')
	              .then(
	              function (
	                largeLoad) {
	                if (companyStatus=="Active") {
	                  $scope.activeCompanies = largeLoad.filter(function (item) {
	                    return item.activeFlag === 1;
	                  });
	                  $scope.companiesData.activeCompanies.text=$scope.activeCompanies.length;
	                }
	                if(companyStatus=="InActive"){
	                	$scope.inactiveCompanies = largeLoad.filter(function (item) {
	                    return item.activeFlag === 0;
	                  });
	                  $scope.companiesData.inactiveCompanies.text=$scope.inactiveCompanies.length;
	                }
	                if(companyStatus=="Total"){
	                  $scope.companiesData.totalCompanies.text=largeLoad.length;
	                }
	              });
	          }, 100);
	      };
      $scope.getCompaniesCount("Active");
      $scope.getCompaniesCount("InActive");
      $scope.getCompaniesCount("Total");
      
      $scope.getCountForEvent = function (eventType) {
	        setTimeout(
	          function () {
	        	  var dataToSend = $scope
	              .constructDataToSendForAllLiftStatus();
	            serviceApi
	              .doPostWithData(
	              '/RLMS/dashboard//getListOfEvents',
	              dataToSend)
	              .then(
	              function (
	                largeLoad) {
	            	  if (eventType=="Event") {
		                  $scope.inout = largeLoad.filter(function (item) {
		                    return item.eventType === "EVENT";
		                  });
		                  $scope.event.inout.text=$scope.inout.length;
		                }
	            	  if (eventType=="Error") {
		                  $scope.error = largeLoad.filter(function (item) {
		                    return item.eventType === "ERROR";
		                  });
		                  $scope.event.error.text=$scope.error.length;

	            	  }
	                //  $scope.event.inout.text=largeLoad.length;
	              });
	          }, 100);
	      };
      //add event api call testing
	       	   $http({method: 'GET',
    	        url: '/RLMS/API/addEvents',
    	        params: {from: "9423720625",message:" RLMS,*112233445566712,LMS ERROR,F14,STOP PRESSED,FLOOR No.13,12:17,14/05/18;"}
    	    })   .success(function(data) {
	           // $scope.names = eval(data);
	            console.log(data)
	        })
	        .error(function(data) {
	            alert(data);
	            console.log('Error: ' + data);
	        });
    	  
	      $scope.getCountForEvent("Event");
	      $scope.getCountForEvent("Error");

      $scope.getPagedDataAsyncForEvents = function (pageSize,
    	      page, searchText, eventType) {
    	      var url;
    	     // url = '/RLMS/dashboard/getAllInOutEventsData';
    	      var dataToSend = $scope
                .constructDataToSendForAllLiftStatus();
    	      url = '/RLMS/dashboard/getListOfEvents',
    	      setTimeout(
    	        function () {
    	          var data;
    	          if (searchText) {
    	            var ft = searchText
    	              .toLowerCase();
    	              serviceApi
    	              .doPostWithData(url,dataToSend)
    	              .then(
    	              function (largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                
    	                if (eventType=="Event") {
    	                	largeLoad = largeLoad.filter(function (item) {
  		                    return item.eventType === "EVENT";
  		                  });
  		                }
  	            	  	if (eventType=="Error") {
  	            		largeLoad= largeLoad.filter(function (item) {
  		                    return item.eventType === "ERROR";
  		                  });
  	            	  	}
          
    	                for (var i = 0; i < largeLoad.length; i++) {
        	                  var userDetailsObj = {};
        	                  if (!!largeLoad[i].eventId) {
          	                    userDetailsObj["No"] = i+1;
          	                  } else {
          	                    userDetailsObj["No"] = " - ";
          	                  }
        	                  if (!!largeLoad[i].date) {
     	                    	   userDetailsObj["EventType"] = largeLoad[i].eventType;
     	                       } else {
     	                    	   userDetailsObj["EventType"] = " - ";
     	                       }
        	                  if (!!largeLoad[i].eventCode) {
    	                    	   userDetailsObj["EventCode"] = largeLoad[i].eventCode;
    	                       } else {
    	                    	   userDetailsObj["EventType"] = " - ";
    	                       }
          	                  if (!!largeLoad[i].eventDescription) {
          	                    userDetailsObj["EventDescription"] = largeLoad[i].eventDescription;
          	                  } else {
          	                    userDetailsObj["EventDescription"] = " - ";
          	                  }
          	                  if (!!largeLoad[i].floorNo) {
              	                userDetailsObj["FloorNo"] = largeLoad[i].floorNo;
              	              } else {
              	                userDetailsObj["FloorNo"] = " - ";
              	              }
        	                  
          	                  if (!!largeLoad[i].date) {
              	                userDetailsObj["EventDate"] = largeLoad[i].date;
              	              } else {
              	                userDetailsObj["EventDate"] = " - ";
              	              }
          	               /*  if (!!largeLoad[i].generatedBy) {
              	                userDetailsObj["GeneratedBy"] = largeLoad[i].generatedBy;
              	              } else {
              	                userDetailsObj["GeneratedBy"] = " - ";
              	              }*/
        	                  userDetails
        	                    .push(userDetailsObj);
        	                }
    	                
    	                data = userDetails
    	                  .filter(function (
    	                    item) {
    	                    return JSON
    	                      .stringify(
    	                      item)
    	                      .toLowerCase()
    	                      .indexOf(
    	                      ft) !== -1;
    	                  });
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  data,
    	                  page,
    	                  pageSize);
    	              });
    	          } else {
    	            serviceApi
    	              .doPostWithData(url,dataToSend)
    	              .then(
    	              function (
    	                largeLoad) {
    	                $scope.complaints = largeLoad;
    	                $scope.showTable = true;
    	                var userDetails = [];
    	                if (eventType=="Event") {
    	                	largeLoad = largeLoad.filter(function (item) {
  		                    return item.eventType === "EVENT";
  		                  });
  		                }
  	            	  	if (eventType=="Error") {
  	            	  		largeLoad= largeLoad.filter(function (item) {
  		                    return item.eventType === "ERROR";
  		                  });
  	            	  	}
    	                for (var i = 0; i < largeLoad.length; i++) {
      	                  var userDetailsObj = {};
      	                  if (!!largeLoad[i].eventId) {
        	                    userDetailsObj["No"] = i+1;
        	                  } else {
        	                    userDetailsObj["No"] = " - ";
        	                  }
      	                       if (!!largeLoad[i].eventDescription) {
      	                    	   userDetailsObj["EventType"] = largeLoad[i].eventType;
      	                       } else {
      	                    	   userDetailsObj["EventType"] = " - ";
      	                       }
      	                       if (!!largeLoad[i].eventCode) {
      	                    	   userDetailsObj["EventCode"] = largeLoad[i].eventCode;
      	                       } else {
      	                    	   userDetailsObj["EventType"] = " - ";
      	                       }
        	                  if (!!largeLoad[i].eventDescription) {
        	                    userDetailsObj["EventDescription"] = largeLoad[i].eventDescription;
        	                  } else {
        	                    userDetailsObj["EventDescription"] = " - ";
        	                  }
        	                  if (!!largeLoad[i].floorNo) {
              	                userDetailsObj["FloorNo"] = largeLoad[i].floorNo;
              	              } else {
              	                userDetailsObj["FloorNo"] = " - ";
              	              }
        	                  
        	                  if (!!largeLoad[i].date) {
            	                userDetailsObj["EventDate"] = largeLoad[i].date;
            	              } else {
            	                userDetailsObj["EventDate"] = " - ";
            	              }
        	               /*  if (!!largeLoad[i].generatedBy) {
            	                userDetailsObj["GeneratedBy"] = largeLoad[i].generatedBy;
            	              } else {
            	                userDetailsObj["GeneratedBy"] = " - ";
            	              }*/
      	                  userDetails
      	                    .push(userDetailsObj);
      	                }
    	                $scope
    	                  .setPagingDataForComplaints(
    	                  userDetails,
    	                  page,
    	                  pageSize);
    	              });

    	          }
    	        }, 100);
    	    }; 
      
      $scope.openDemoModalForEvents = function (currentModelOpen, headerValue, activeFlag) {
          var emptyComplaintsArray = [];
          $scope.myComplaintsData = emptyComplaintsArray;
          $scope.pagingOptionsForComplaints.currentPage = 1;
          $scope.totalServerItemsForComplaints = 0;
          $scope.filterOptionsForModal.filterText='';
          $scope.currentModel = currentModelOpen;
          $scope.modalHeaderVal = headerValue;
          $scope.activeFlagForEvents = activeFlag;
          $scope.getPagedDataAsyncForEvents($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, "",activeFlag); 
          $scope.modalInstance = $modal.open({
            templateUrl: 'demoModalContent.html',
            scope: $scope
          });
        };
        $scope.getCountAmcSrviceCalls = function (eventName) {
	        setTimeout(
	          function () {
	            serviceApi
	              .doPostWithData(
	              '/RLMS/dashboard/getListOfAmcServiceCalls',$scope.construnctObjeToSendForAmcCalls())
	              .then(
	              function (
	                largeLoad) {
	                  $scope.amcSeriveCalls.text=largeLoad.length;
	              });
	          }, 100);
	      };
	      $scope.construnctObjeToSendForAmcCalls = function () {
	          var dataToSend = {
	            statusList: [],
	            companyId: $rootScope.loggedInUserInfoForDashboard.data.userRole.rlmsCompanyMaster.companyId
	          };
	          //dataToSend["statusList"] = complaintStatus;
	          return dataToSend;
	        };
        $scope.openDemoModalForAmcServiceCalls = function (currentModelOpen, headerValue, activeFlag) {
            var emptyComplaintsArray = [];
            $scope.myComplaintsData = emptyComplaintsArray;
            $scope.pagingOptionsForComplaints.currentPage = 1;
            $scope.totalServerItemsForComplaints = 0;
            $scope.filterOptionsForModal.filterText='';
            $scope.currentModel = currentModelOpen;
            $scope.modalHeaderVal = headerValue;
            $scope.activeFlagForTechnician = activeFlag;
            $scope.getPagedDataAsyncForAmcServiceCalls($scope.pagingOptionsForComplaints.pageSize, $scope.pagingOptionsForComplaints.currentPage, "",activeFlag); 
            $scope.modalInstance = $modal.open({
              templateUrl: 'demoModalContent.html',
              scope: $scope
            });
          };
            $scope.getCountAmcSrviceCalls("AmcServiceCall");
            $scope.getPagedDataAsyncForAmcServiceCalls = function (pageSize,
          	      page, searchText, activeFlag) {
          	      var url;
          	      var dataToSend = $scope
                      .construnctObjeToSendForAmcCalls();
          	      url = '/RLMS/dashboard/getListOfAmcServiceCalls',
          	      setTimeout(
          	        function () {
          	          var data;
          	          if (searchText) {
          	            var ft = searchText
          	              .toLowerCase();
          	              serviceApi
          	              .doPostWithData(url,dataToSend)
          	              .then(
          	              function (largeLoad) {
          	                $scope.complaints = largeLoad;
          	                $scope.showTable = true;
          	                var userDetails = [];
          	                           
          	                for (var i = 0; i < largeLoad.length; i++) {
              	                  var userDetailsObj = {};
              	                  if (!!largeLoad[i].eventId) {
                	                    userDetailsObj["No"] = i+1;
                	                  } else {
                	                    userDetailsObj["No"] = " - ";
                	                  }
              	                  if (!!largeLoad[i].customerName) {
           	                    	   userDetailsObj["CustomerName"] = largeLoad[i].customerName;
           	                       } else {
           	                    	   userDetailsObj["CustomerName"] = " - ";
           	                       }
              	                  if (!!largeLoad[i].liftAddress) {
          	                    	   userDetailsObj["LiftAddress"] = largeLoad[i].liftAddress;
          	                       } else {
          	                    	   userDetailsObj["LiftAddress"] = " - ";
          	                       }
                	                  if (!!largeLoad[i].registrationDateStr) {
                	                    userDetailsObj["RegistrationDate"] = largeLoad[i].registrationDateStr;
                	                  } else {
                	                    userDetailsObj["RegistrationDate"] = " - ";
                	                  }
                	                  if (!!largeLoad[i].serviceStartDateStr) {
                    	                userDetailsObj["ServiceStartDater"] = largeLoad[i].serviceStartDateStr;
                    	              } else {
                    	                userDetailsObj["ServiceStartDater"] = " - ";
                    	              }
              	                  
                	                  if (!!largeLoad[i].remark) {
                    	                userDetailsObj["Rmark"] = largeLoad[i].remark;
                    	              } else {
                    	                userDetailsObj["Rmark"] = " - ";
                    	              }
                	                 if (!!largeLoad[i].technicianDtls) {
                    	                userDetailsObj["TechnicianDetails"] = largeLoad[i].technicianDtls;
                    	              } else {
                    	                userDetailsObj["TechnicianDetails"] = " - ";
                    	              }
              	                  userDetails
              	                    .push(userDetailsObj);
              	                }
          	                
          	                data = userDetails
          	                  .filter(function (
          	                    item) {
          	                    return JSON
          	                      .stringify(
          	                      item)
          	                      .toLowerCase()
          	                      .indexOf(
          	                      ft) !== -1;
          	                  });
          	                $scope
          	                  .setPagingDataForComplaints(
          	                  data,
          	                  page,
          	                  pageSize);
          	              });
          	          } else {
          	            serviceApi
          	              .doPostWithData(url,dataToSend)
          	              .then(
          	              function (
          	                largeLoad) {
          	                $scope.complaints = largeLoad;
          	                $scope.showTable = true;
          	                var userDetails = [];
          	                for (var i = 0; i < largeLoad.length; i++) {
                	                  var userDetailsObj = {};
                	                
                  	                    userDetailsObj["No"] = i+1;
                  	               
                	                  if (!!largeLoad[i].customerName) {
             	                    	   userDetailsObj["CustomerName"] = largeLoad[i].customerName;
             	                       } else {
             	                    	   userDetailsObj["CustomerName"] = " - ";
             	                       }
                	                  if (!!largeLoad[i].liftAddress) {
            	                    	   userDetailsObj["LiftAddress"] = largeLoad[i].liftAddress;
            	                       } else {
            	                    	   userDetailsObj["LiftAddress"] = " - ";
            	                       }
                  	                  if (!!largeLoad[i].registrationDateStr) {
                  	                    userDetailsObj["RegistrationDate"] = largeLoad[i].registrationDateStr;
                  	                  } else {
                  	                    userDetailsObj["RegistrationDate"] = " - ";
                  	                  }
                  	                  if (!!largeLoad[i].serviceStartDateStr) {
                      	                userDetailsObj["ServiceStartDater"] = largeLoad[i].serviceStartDateStr;
                      	              } else {
                      	                userDetailsObj["ServiceStartDater"] = " - ";
                      	              }
                	                  
                  	                  if (!!largeLoad[i].remark) {
                      	                userDetailsObj["Rmark"] = largeLoad[i].remark;
                      	              } else {
                      	                userDetailsObj["Rmark"] = " - ";
                      	              }
                  	                 if (!!largeLoad[i].technicianDtls) {
                      	                userDetailsObj["TechnicianDetails"] = largeLoad[i].technicianDtls;
                      	              } else {
                      	                userDetailsObj["TechnicianDetails"] = " - ";
                      	              }
                	                  userDetails
                	                    .push(userDetailsObj);
                	                }
          	                $scope
          	                  .setPagingDataForComplaints(
          	                  userDetails,
          	                  page,
          	                  pageSize);
          	              });
          	          }
          	        }, 100);
          	    }; 
  }]);