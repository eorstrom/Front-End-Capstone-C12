"use strict";

soundApp.controller("SongsListCtrl", 
    [
    "$http",
    "$scope",

    function($http, $scope) {
        $scope.songs = [];
        $http.get('https://front-end-capstone12.firebaseio.com/songs.json')
        .then(
        function(data) {
            for (var key in data.data) {
                data.data[key].id = key;
                $scope.songs.push(data.data[key]);
            }
            console.log("$scope.songs", $scope.songs);
        })
}]);