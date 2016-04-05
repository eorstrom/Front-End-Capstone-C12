"use strict";

soundApp.factory("amplifierFactory", function ($q, $http) {
  return function () {
    return $q(function (resolve, reject) {
      return (// Return a promise for our async XHR
        $http.get("https://front-end-capstone12.firebaseio.com/amplifiers.json").success(function (amplifierCollection) {
          return resolve(amplifierCollection);
        }, function (error) {
          return reject(error);
        })
      );
    });
  };
});

