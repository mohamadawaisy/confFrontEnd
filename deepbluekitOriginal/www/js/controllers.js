/*
  
  DeepBlue Starter Kit - version 1.1
  Copyright (c) 2015 INMAGIK SRL - www.inmagik.com
  All rights reserved

  written by Mauro Bianchi
  bianchimro@gmail.com  
  
  file: controllers.js
  description: this file contains all controllers of the DeepBlue app.

*/


//controllers are packed into a module
angular.module('deepBlue.controllers', [])

    //top view controller
.controller('AppCtrl', function ($scope, $rootScope, $state) {

    // #SIMPLIFIED-IMPLEMENTATION:
    // Simplified handling and logout function.
    // A real app would delegate a service for organizing session data
    // and auth stuff in a better way.
    $rootScope.user = {};

    $scope.logout = function () {
        $rootScope.user = {};
        $state.go('app.start')
    };

})


    // This controller is bound to the "app.account" view
.controller('AccountCtrl', function ($scope, $rootScope) {

    //readonly property is used to control editability of account form
    $scope.readonly = true;

    // #SIMPLIFIED-IMPLEMENTATION:
    // We act on a copy of the root user
    $scope.accountUser = angular.copy($rootScope.user);
    var userCopy = {};

    $scope.startEdit = function () {
        $scope.readonly = false;
        userCopy = angular.copy($scope.user);
    };

    $scope.cancelEdit = function () {
        $scope.readonly = true;
        $scope.user = userCopy;
    };

    // #SIMPLIFIED-IMPLEMENTATION:
    // this function should call a service to update and save 
    // the data of current user.
    // In this case we'll just set form to readonly and copy data back to $rootScope.
    $scope.saveEdit = function () {
        $scope.readonly = true;
        $rootScope.user = $scope.accountUser;
    };

})

 
// Feeds controller.
.controller('FeedsCtrl', function($scope, BackendService) {

  // #SIMPLIFIED-IMPLEMENTATION:
  // In this example feeds are loaded from a json file.
  // (using "getFeeds" method in BackendService, see services.js)
  // In your application you can use the same approach or load 
  // feeds from a web service.
  
  $scope.doRefresh = function(){
      BackendService.getFeeds()
      .success(function(newItems) {
        $scope.feeds = newItems;
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  // Triggering the first refresh
  $scope.doRefresh();

})


.controller("HttpGetController", function ($scope, $http) {

    $scope.SendData = function (myConf) {

        // onSuccess Callback
        //   This method accepts a `Position` object, which contains
        //   the current GPS coordinates
        //
        var onSuccess = function (position) {
            alert('Latitude: ' + position.coords.latitude + '\n' +
                  'Longitude: ' + position.coords.longitude + '\n' +
                  'Altitude: ' + position.coords.altitude + '\n' +
                  'Accuracy: ' + position.coords.accuracy + '\n' +
                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                  'Heading: ' + position.coords.heading + '\n' +
                  'Speed: ' + position.coords.speed + '\n' +
                  'Timestamp: ' + new Date(position.timestamp) + '\n');
        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                  'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        // use $.param jQuery function to serialize data from JSON 
        var data = $.param({
            longitude: $scope.firstName,
            latitude: $scope.lastName,
            confessionTxt: myConf
        });
        
        
        BackendService.postConfession(data);

        
    };

})

// Shop controller.
.controller('ShopCtrl', function($scope, $ionicActionSheet, BackendService) {
  
  // In this example feeds are loaded from a json file.
  // (using "getProducts" method in BackendService, see services.js)
  // In your application you can use the same approach or load 
  // products from a web service.



  // private method to add a product to cart
  var addProductToCart = function(product){
    BackendService.postConfession(product);
  };

  // method to add a product to cart via $ionicActionSheet
  $scope.addProduct = function(product){

           addProductToCart(product);
           return true;

       }
     });