"use strict";

soundApp.controller("AmplifierListCtrl", 
    [
    "$http",
    "$scope",

    function($http, $scope) {
        $scope.amplifiers = [];
        $http.get('https://front-end-capstone12.firebaseio.com/amplifiers.json')
        .then(
        function(data) {
             var ampsArray = [];
              for (var key in data.data) {
                data.data[key].id = key;
                $scope.amplifiers.push(data.data[key]);
              }
            console.log("$scope.amplifiers", $scope.amplifiers);
        })
}]);