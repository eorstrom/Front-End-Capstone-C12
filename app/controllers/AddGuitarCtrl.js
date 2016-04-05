"use strict";

soundApp.controller("AddGuitarCtrl", [
  "$scope",
  "$location",
  "$http",

  function ($scope, $location, $http) {

    // Default property values for keys bound to input fields
    $scope.newGuitar = {
      brand: "",
      model: ""
    };

    // Function bound to the Add Song button in the view template
    $scope.addGuitar = function () {

      // POST the guitar to Firebase
      $http.post(
        "https://front-end-capstone12.firebaseio.com/guitars.json",

        // Remember to stringify objects/arrays before
        // sending them to an API
        JSON.stringify({
          brand: $scope.newGuitar.brand,
          model: $scope.newGuitar.model
        })

      // The $http.post() method returns a promise, so you can use then()
      ).then(
        function() { $location.url("/my-gear//"),      // Handle resolve
            function(response) {
            console.log(response)  // Handle reject
            };
        });
    };
}]);