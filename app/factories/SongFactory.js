"use strict";

soundApp.factory("songFactory", function ($q, $http) {
  return function () {
    return $q(function (resolve, reject) {
      return (   // Return a promise for our async XHR
        $http.get("https://front-end-capstone12.firebaseio.com/songs.json")
        .success(function (songCollection) {
          return resolve(songCollection);
        }, function (error) {
          return reject(error);
        })
      );
    });
  };
});
