"use strict";

soundApp.controller("SongDetailsCtrl",
[
  "$scope",
  "$routeParams",
  "$http",
  "$location",
  "songFactory",
  "sectionFactory",

    function($scope, $routeParams, $http, $location, songFactory, sectionFactory) {

        // Default properties for bound variables
        $scope.songs = [];
        $scope.selectedSong = {};
        $scope.sectionsArray = [];
        // $scope.selectedSection;
        // console.log("$scope.selectedSection", $scope.selectedSection);
        $scope.songDuration;

        // Invoke the promise that reads songs collection from Firebase
        songFactory().then(

            // Handle resolve() from the promise
            function(songCollection) {
                console.log("songCollection", songCollection);
                Object.keys(songCollection).forEach(function (key) {
                    songCollection[key].id = key;
                    $scope.songs.push(songCollection[key]);

                    // console.log("songCollection[key].songSections", songCollection[key].songSections);
                    // $scope.sectionsArray.push(songCollection[key].songSections);
                    // console.log("$scope.sectionsArray", $scope.sectionsArray);
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

        // $scope.getSections = function() {
        // sectionFactory(  $scope.selectedSong.id   ).then(
        //     // Handle resolve() from the promise
        //     function(sectionCollection) {
        //         console.log("sectionCollection", sectionCollection);
        //         // Object.keys(sectionCollection).forEach(function (key) {
        //         //     sectionCollection[key].id = key;
        //         //     $scope.sectionsArray.push(sectionCollection[key]);
        //         // });
        //     $scope.selectedSection = $scope.sectionsArray.filter(function (section) {
        //         return section.id === $routeParams.sectionid;
        //     })[0];
        //     console.log("$scope.selectedSection", $scope.selectedSection);
        //     },

        //     // Handle reject() from the promise
        //     function(err) {
        //     console.log("ERROR", err);
        //     }
        // );
        // // }
        // console.log("$scope.getSections", $scope.getSections());

        // let getSectionData = new Firebase(`https://front-end-capstone12.firebaseio.com/songs/${$routeParams.songid}/songSections`);
        // getSectionData.then(

        //     )
        // console.log("getSectionData", getSectionData);

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
            // console.log("selectedSection", selectedSection);
            // $scope.sections[section.id].visible = !$scope.sections[section.id].visible;
        };

        // function to loop over each section length being added to the song to calculate the total song duration
        $scope.calculateDuration = function(){
            $scope.songDuration = 0;    // set initial value of songDuration to 0
            $scope.settings = [];   // create an array to push added song sections to
            let sections = {};

            let sectionsRef = new Firebase(`https://front-end-capstone12.firebaseio.com/songs/${$routeParams.songid}/songSections`);   
            let durationRef = new Firebase(`https://front-end-capstone12.firebaseio.com/songs/${$routeParams.songid}/duration`);   

            // loop over each object in sections to check for a value in length to add to total songDuration

            $scope.sections.forEach((s) => {
                // console.log("s", s);
                $scope.songDuration += parseInt(s.length);  // parseInt input for section length to turn into a number
                $scope.duration = true;    // show songDuration in view when true
                
                sections[s.id] = {};
                sections[s.id].id = s.id;
                sections[s.id].length = s.length;
                $scope.showSongSections = false;
            });
            // durationRef.update($scope.songDuration);
            sectionsRef.update(sections);

            // get song key, write sections to song on Firebase
            // setSections(userRef);
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
                .delete(`https://front-end-capstone12.firebaseio.com/songs/${$routeParams.songid}/sections/${$routeParams.sectionid}`)
                .then(() => $location.url("#/songs/{{ song.id }}"));
            } else {
                $location.url("#/songs/{{ song.id }}");
            }
        };
    }
]);


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