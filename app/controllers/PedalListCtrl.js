"use strict";

soundApp.controller("PedalListCtrl", 
    [
    "$http",
    "$scope",

    function($http, $scope) {
        $scope.pedals = [];
        $http.get('https://front-end-capstone12.firebaseio.com/pedals.json')
        .then(
        function(data) {
            for (var key in data.data) {
                data.data[key].id = key;
                $scope.pedals.push(data.data[key]);
            }
            console.log("$scope.pedals", $scope.pedals);
        })
}]);