"use strict";

soundApp.controller("GearCtrl",

    [
    "$http",
    "$scope",

    function($http, $scope) {

        $scope.pedals = [];
        $http.get('https://front-end-capstone12.firebaseio.com/pedals.json')
        .then(
        function(data) {
            // loop over each pedal in the Firebase and add them to the pedals array
            for (var key in data.data) {
                data.data[key].id = key;
                $scope.pedals.push(data.data[key]);
            }
            console.log("$scope.pedals", $scope.pedals);
        })


        $scope.amplifiers = [];
        $http.get('https://front-end-capstone12.firebaseio.com/amplifiers.json')
        .then(
        function(data) {
            // loop over each amplifier in the Firebase and add them to the amplifiers array
            for (var key in data.data) {
                data.data[key].id = key;
                $scope.amplifiers.push(data.data[key]);
            }
            console.log("$scope.amplifiers", $scope.amplifiers);
        })

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