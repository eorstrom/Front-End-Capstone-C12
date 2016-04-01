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
        }
    );

    $scope.sections = ["Intro", "Verse", "Chorus", "Bridge", "Outro", "Solo"];
    
    // Sets the addSongSections div to false, rendering the div hidden on page load
    $scope.showSongSections = false;
    // Sets the addSongSections div to true, showing a div when the Add Sections button is clicked 
    // the button acts like a toggle for showing and hiding the div
    $scope.showSections = function() {
        $scope.showSongSections = !$scope.showSongSections;
    };

    // $scope.addSection = function() {

    // };

    $scope.showSectionLength = false;
    $scope.sectionLength = function() {
        $scope.showSectionLength = !$scope.showSectionLength;
    }

    /*
      This function is bound to an ng-click directive on the button in the view
      Function deletes the current song from Firebase, then redirects back to the song list
    */
    $scope.deleteSong = function(){ $http
        .delete(`https://front-end-capstone12.firebaseio.com/songs/${$routeParams.songid}.json`)
        .then(() => $location.url("/songs-list"));
      }
  }
]);
