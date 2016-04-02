"use strict";

soundApp.controller("SongDetailsCtrl",
[
  "$scope",
  "$routeParams",
  "$http",
  "$location",
  "songFactory",

  function($scope, $routeParams, $http, $location, songFactory) {


    // code structure to display gear items retrieved from Firebase on 'add gear to song section' view
    /*
    GuitarFactory().then(
        (guitars) => {
            $scope.guitars = guitars;
            
            // Do something with guitars
            return AmplifierFactory();
        }
    ).then(
        (amplifiers) => {
            $scope.amplifiers = amplifiers;
            // Do something with amps
            return PedalFactory();
        }
    ).then(
        (pedals) => {

            // We know we have ALL the data;
            $scope.
        }
    )
    */

    // Default properties for bound variables
    $scope.songs = [];
    $scope.selectedSong = {};
    $scope.songDuration;

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

    // song sections to add dynamically to song-details view
    $scope.sections = [
        { id: "intro", visible: false, length: 0 }, 
        { id: "verse", visible: false, length: 0 }, 
        { id: "chorus", visible: false, length: 0 },
        { id: "bridge", visible: false, length: 0 },
        { id: "outro", visible: false, length: 0 },
        { id: "solo", visible: false, length: 0 }
    ];
    
    // Sets the addSongSections div to false, rendering the div hidden on page load
    $scope.showSongSections = false;

    /* 
    Sets the addSongSections div to true, showing a div when the Add Sections button is clicked 
    The button acts like a toggle for showing and hiding the div
    */
    $scope.showSections = function() {
        $scope.showSongSections = !$scope.showSongSections;
    };


    $scope.showSectionLength = false;
    $scope.sectionLength = function(section) {
        let selectedSection = $scope.sections.filter((s) => {
            return s.id === section.id;
        })[0];
        selectedSection.visible = !selectedSection.visible;
        // console.log("selectedSection", selectedSection);
        // $scope.sections[section.id].visible = !$scope.sections[section.id].visible;
    }

    // function to loop over each section length being added to the song to calculate the song duration
    $scope.calculateDuration = function(){
        console.log("calculateDuration was fired");
        $scope.songDuration = 0;

        $scope.sections.forEach((s) => {
            $scope.songDuration += s.length;
            console.log("$scope.songDuration");
        })
    }

    /*
      This function is bound to an ng-click directive on the delete button in the view
      Function deletes the current song from Firebase, then redirects back to the song list
    */
    $scope.deleteSong = function(){ $http
        .delete(`https://front-end-capstone12.firebaseio.com/songs/${$routeParams.songid}.json`)
        .then(() => $location.url("/songs-list"));
      }
  }
]);
