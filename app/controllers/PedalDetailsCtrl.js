"use strict";

soundApp.controller("PedalDetailsCtrl",
[
  "$scope",
  "$routeParams",
  "$http",
  "$location",
  "pedalFactory",

  function($scope, $routeParams, $http, $location, pedalFactory) {

    // Default properties for bound variables
    $scope.pedals = [];
    $scope.selectedPedal = {};

    // Invoke the promise that reads from Firebase
    pedalFactory().then(

      // Handle resolve() from the promise
        function(pedalCollection) {
            console.log("pedalCollection", pedalCollection);
            Object.keys(pedalCollection).forEach(function (key) {
                pedalCollection[key].id = key;
                $scope.pedals.push(pedalCollection[key]);
        });
        $scope.selectedPedal = $scope.pedals.filter(function (pedal) {
            console.log("pedal.id", pedal.id);
            console.log("$routeParams.pedalid", $routeParams.pedalid);
            return pedal.id === $routeParams.pedalid;
        })[0];
        console.log("$scope.selectedPedal", $scope.selectedPedal);
      },

      // Handle reject() from the promise
      function(err) {
        console.log(err)
      });

    /*
      This function is bound to an ng-click directive
      on the button in the view
    */
    $scope.deletePedal = function(){ $http
        .delete(`https://front-end-capstone12.firebaseio.com/pedals/${$routeParams.pedalid}.json`)
        .then(() => $location.url("/pedal-list"));
      }
  }
]);
