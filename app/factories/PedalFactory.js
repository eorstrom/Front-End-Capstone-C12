"use strict";

soundApp.factory("pedalFactory", function ($q, $http) {
  return function () {
    return $q(function (resolve, reject) {
      return (// Return a promise for our async XHR
        $http.get("https://front-end-capstone12.firebaseio.com/pedals.json").success(function (pedalCollection) {
          return resolve(pedalCollection);
        }, function (error) {
          return reject(error);
        })
      );
    });
  };
});

