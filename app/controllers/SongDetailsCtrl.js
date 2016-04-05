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
        $scope.songDuration;
        $scope.sectionsArray = [];

        // Invoke the promise that reads songs collection from Firebase
        songFactory().then(

            // Handle resolve() from the promise
            function(songCollection) {
                console.log("songCollection", songCollection);
                Object.keys(songCollection).forEach(function (key) {
                    songCollection[key].id = key;
                    $scope.songs.push(songCollection[key]);
            });
            $scope.selectedSong = $scope.songs.filter(function (song) {
                return song.id === $routeParams.songid;
            })[0];
            console.log("$scope.selectedSong", $scope.selectedSong);
            },

            // Handle reject() from the promise
            function(err) {
            console.log(err);
            }
        );

            // let titleRef = new Firebase(`https://front-end-capstone12.firebaseio.com/songs/${$routeParams.songid}/title`);   
            // let newTitle;

            // $scope.title; 
            // // $scope.title = $scope.selectedSong.title;
            // $scope.editorEnabled = false;

            // $scope.enableEditor = function() {
            //     console.log("enable editor was fired");
            //     $scope.editorEnabled = true;
            //     $scope.editableTitle = $scope.selectedSong.title;
            // };

            // $scope.disableEditor = function() {
            //     $scope.editorEnabled = false;
            // };

            // $scope.save = function() {
            //     $scope.selectedSong.title = $scope.editableTitle;
            //     newTitle = $scope.editableTitle;
            //     titleRef.update(newTitle)
            //     $scope.disableEditor();
            // };
            
        

        // song sections to add dynamically to song-details view
        $scope.sections = [
            { id: "Intro", visible: false, length: 0 }, 
            { id: "Verse", visible: false, length: 0 }, 
            { id: "Chorus", visible: false, length: 0 },
            { id: "Bridge", visible: false, length: 0 },
            { id: "Outro", visible: false, length: 0 },
            { id: "Solo", visible: false, length: 0 }
        ]; 
        
        // Sets the addSongSections div to false, rendering the div hidden on page load until Add Sections button is clicked
        $scope.showSongSections = false;

        /* 
            Sets the addSongSections div to true, showing a div when the Add Sections button is clicked 
            The button acts like a toggle for showing and hiding the div
        */
        $scope.showSections = function() {
            $scope.showSongSections = !$scope.showSongSections;
        };

        $scope.showSectionLength = false;   // All section length input boxes are initially hidden
        $scope.sectionLength = function(section) {
            let selectedSection = $scope.sections.filter((s) => {
                return s.id === section.id;
            })[0];
            selectedSection.visible = !selectedSection.visible;
        };

        // function to loop over each section length being added to the song to calculate the total song duration
        $scope.calculateDuration = function(){
            $scope.songDuration = 0;    // set initial value of songDuration to 0
            $scope.settings = [];   // create an array to push added song sections to
            
            let sectionsRef = new Firebase(`https://front-end-capstone12.firebaseio.com/songs/${$routeParams.songid}/songSections`);   

            let sections = {};
            // let durationRef = new Firebase(`https://front-end-capstone12.firebaseio.com/songs/${$routeParams.songid}/duration`);   

            // loop over each object in sections to check for a value in length to add to total songDuration

            $scope.sections.forEach((s) => {
                $scope.songDuration += parseInt(s.length);  // parseInt input for section length to turn into a number
                $scope.duration = true;    // show songDuration in view when true
                
                sections[s.id] = {};
                sections[s.id].id = s.id;
                sections[s.id].length = s.length;
                $scope.showSongSections = false;
            });
            sectionsRef.update(sections);
            // durationRef.update($scope.songDuration);
        };


        /*
          This function is bound to an ng-click directive on the delete button in the view
          Function deletes the current song from Firebase, then redirects back to the song list
        */
        $scope.deleteSong = function(){ 
            let confirmDelete = confirm("Are you sure you want to delete this song?");
            if (confirmDelete === true) {
                $http
                .delete(`https://front-end-capstone12.firebaseio.com/songs/${$routeParams.songid}.json`)
                .then(() => $location.url("/songs-list"));
            } else {
                $location.url("#/songs/{{ song.id }}");
            }
        };

        $scope.deleteSection = function(){ 
            let confirmDelete = confirm("Are you sure you want to delete this section?");
            if (confirmDelete === true) {
                $http
                .delete(`https://front-end-capstone12.firebaseio.com/songs/${$routeParams.songid}/songSections/${$routeParams.sectionid}`)
                .then(() => $location.url("#/songs/{{ song.id }}"));
            } else {
                $location.url("#/songs/{{ song.id }}");
            }
        };
    }
]);