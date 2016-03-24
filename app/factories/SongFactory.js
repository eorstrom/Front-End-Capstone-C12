"use strict";

soundApp.factory("songFactory", function($q, $http) {
  function() {
    $q(function(resolve, reject) { // Return a promise for our async XHR
      $http
        .get("https://front-end-capstone12.firebaseio.com/")
        .success(
          songCollection function() { resolve(songCollection)},
          error function() { reject(error) }
        )}
    )}
});