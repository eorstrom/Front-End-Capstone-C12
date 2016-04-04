"use strict";

let soundApp = angular.module("soundApp", ['ngRoute'])
  .constant('firebaseURL', 'https://front-end-capstone12.firebaseio.com/');  // ngRoute object from angular-route is dependency -- needed to run

/*
    Define a promise for any view that needs an authenticated user
    before it will resolve (see below)
*/
let isAuth = function (authFactory) { 
    new Promise(function(resolve, reject) {
        if (authFactory.isAuthenticated()) {
            console.log("User is authenticated, resolve route promise");
        resolve();
        } else {
            console.log("User is not authenticated, reject route promise");
        reject();
        }
    }
)};

    soundApp.config(['$routeProvider',  // $routeProvider object is given to us by ngRoute
    function($routeProvider) {
        $routeProvider.  // note similarity of this syntax to switch/case
            when('/', {
            templateUrl: 'partials/songs-list.html',
            controller: 'SongsListCtrl',
            resolve: { isAuth }
            }).   // songs list
            when('/songs-list', {
            templateUrl: 'partials/songs-list.html',
            controller: 'SongsListCtrl',
            resolve: { isAuth }
            }).   // all gear view
            when('/my-gear', {
            templateUrl: 'partials/gear.html',
            controller: 'GearCtrl',
            resolve: { isAuth }
            }).   // add new song
            when('/add-song', {
            templateUrl: 'partials/add-song.html',
            controller: 'AddSongCtrl',
            resolve: { isAuth }
            }).   // add new guitar
            when('/add-guitar', {
            templateUrl: 'partials/add-guitar.html',
            controller: 'AddGuitarCtrl',
            resolve: { isAuth }
            }).   // add new pedal
            when('/add-pedal', {
            templateUrl: 'partials/add-pedal.html',
            controller: 'AddPedalCtrl',
            resolve: { isAuth }
            }).   // add new amplifier
            when('/add-amplifier', {
            templateUrl: 'partials/add-amplifier.html',
            controller: 'AddAmplifierCtrl',
            resolve: { isAuth }
            }).   // add gear to section
            when('/add-gear', {
            templateUrl: 'partials/add-gear.html',
            controller: 'AddGearCtrl',
            resolve: { isAuth }
            }).   // song detail
            when('/songs/:songid', {
            templateUrl: 'partials/song-details.html',
            controller: 'SongDetailsCtrl',
            resolve: { isAuth }
            }).   // amplifier detail
            when('/amplifiers/:amplifierid', {
            templateUrl: 'partials/amplifier-details.html',
            controller: 'AmplifierDetailsCtrl',
            resolve: { isAuth }
            }).   // guitar detail
            when('/guitars/:guitarid', {
            templateUrl: 'partials/guitar-details.html',
            controller: 'GuitarDetailsCtrl',
            resolve: { isAuth }
            }).   // pedal detail
            when('/pedals/:pedalid', {
            templateUrl: 'partials/pedal-details.html',
            controller: 'PedalDetailsCtrl',
            resolve: { isAuth }
            }).   // login page
            when('/login', {
            templateUrl: 'partials/login.html',
            controller: "LoginCtrl"
            }).   // login page
            when('/logout', {
            templateUrl: 'partials/login.html',
            controller: "LoginCtrl"
            }).
            otherwise({
            redirectTo: '/'
            });
    }]);

/*
    When the application first loads, redirect the user to the login
    form if there is no authentication
*/
    soundApp.run([
        "$location",

        function ($location) {
            let soundAppRef = new Firebase("https://front-end-capstone12.firebaseio.com/");
            soundAppRef.onAuth(function(authData) {
                console.log("authData",authData);

                if (!authData) {
                    window.location.replace("/#/login");
                } else {
                    window.location.replace("/#/");

                }
            });
        }   
    ]);