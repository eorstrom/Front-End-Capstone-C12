"use strict";

soundApp.controller("GuitarListCtrl", 
    [
    "$http",
    "$scope",

    function($http, $scope) {
        $scope.guitars = [];
        $http.get('https://front-end-capstone12.firebaseio.com/guitars.json')
        .then(
        function(data) {
            // loop over each guitar in the Firebase and add them to the guitars array
            for (var key in data.data) {
                data.data[key].id = key;
                $scope.guitars.push(data.data[key]);
            }
            console.log("$scope.guitars", $scope.guitars);
        })
}]);