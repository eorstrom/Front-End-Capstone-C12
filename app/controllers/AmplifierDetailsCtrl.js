"use strict";

soundApp.controller('AmplifierDetailsCtrl', 
    [
    "$http",
    "$scope",

    function($http, $scope) {
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

}])