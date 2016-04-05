"use strict";

soundApp.controller('GuitarDetailsCtrl', 
    [
    "$http",
    "$scope",

    function($http, $scope) {
    $scope.guitars = [];
        $http.get('https://front-end-capstone12.firebaseio.com/guitars.json')
        .then(
        function(data) {
            // loop over each amplifier in the Firebase and add them to the amplifiers array
            for (var key in data.data) {
                data.data[key].id = key;
                $scope.guitars.push(data.data[key]);
            }
            console.log("$scope.guitars", $scope.guitars);
        })

}])