"use strict";

soundApp.factory("sectionFactory", function ($q, $http) {
  return function () {
    return $q(function (resolve, reject) {
      return (   // Return a promise for our async XHR
        $http.get("https://front-end-capstone12.firebaseio.com/songs/${$scope.selectedSong.id}/sections/")
        .success(function (sectionCollection) {
          return resolve(sectionCollection);
        }, function (error) {
          return reject(error);
        })
      );
    });
  };
});
