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
            var newArray = [];
                for (var key in data.data) {
                    data.data[key].id = key;
                    $scope.guitars.push(data.data[key]);
                }
            console.log("$scope.guitars", $scope.guitars);
            console.log("newArray", newArray);
        })
}]);