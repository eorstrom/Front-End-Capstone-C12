"use strict";

soundApp.controller("AddPedalCtrl", [
  "$scope",
  "$location",
  "$http",

  function ($scope, $location, $http) {

    // Default property values for keys bound to input fields
    $scope.newPedal = {
      brand: "",
      model: ""
    };

    // Function bound to the Add Song button in the view template
    $scope.addPedal = function () {

      // POST the pedal to Firebase
      $http.post(
        "https://front-end-capstone12.firebaseio.com/pedals.json",

        // Remember to stringify objects/arrays before
        // sending them to an API
        JSON.stringify({
          brand: $scope.newPedal.brand,
          model: $scope.newPedal.model
        })

      // The $http.post() method returns a promise, so you can use then()
      ).then(
        function() { $location.url("/my-gear/"),      // Handle resolve
            function(response) {
            console.log(response)  // Handle reject
            };
        });
    };
}]);