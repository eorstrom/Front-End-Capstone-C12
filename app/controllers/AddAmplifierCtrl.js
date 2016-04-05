"use strict";

soundApp.controller("AddAmplifierCtrl", [
  "$scope",
  "$location",
  "$http",

  function ($scope, $location, $http) {

    // Default property values for keys bound to input fields
    $scope.newAmplifier = {
      brand: "",
      model: ""
    };

    // Function bound to the Add Amplifier button in the view template
    $scope.addAmplifier = function () {

      // POST the amplifier to Firebase
      $http.post(
        "https://front-end-capstone12.firebaseio.com/amplifiers.json",

        // Remember to stringify objects/arrays before
        // sending them to an API
        JSON.stringify({
          brand: $scope.newAmplifier.brand,
          model: $scope.newAmplifier.model
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