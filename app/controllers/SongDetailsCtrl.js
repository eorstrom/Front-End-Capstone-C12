"use strict";

soundApp.controller("SongDetailsCtrl",
[
  "$scope",
  "$routeParams",
  "$http",
  "$location",
  "songFactory",

  function($scope, $routeParams, $http, $location, songFactory) {

    // Default properties for bound variables
    $scope.songs = [];
    $scope.selectedSong = {};

    // Invoke the promise that reads from Firebase
    songFactory().then(

      // Handle resolve() from the promise
        function(songCollection) {
            console.log("songCollection", songCollection);
            Object.keys(songCollection).forEach(function (key) {
                songCollection[key].id = key;
                $scope.songs.push(songCollection[key]);
        });
        $scope.selectedSong = $scope.songs.filter(function (song) {
            console.log("song.id", song.id);
            console.log("$routeParams.songId", $routeParams.songid);
            return song.id === $routeParams.songid;
        })[0];
        console.log("$scope.selectedSong", $scope.selectedSong);
      },

      // Handle reject() from the promise
      function(err) {
        console.log(err)
      });

    /*
      This function is bound to an ng-click directive
      on the button in the view
    */
    $scope.deleteSong = function(){ $http
        .delete(`https://front-end-capstone12.firebaseio.com/songs/${$routeParams.songid}.json`)
        .then(() => $location.url("/songs-list"));
      }
  }
]);
