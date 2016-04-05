"use strict";

soundApp.factory("guitarFactory", function ($q, $http) {
  return function () {
    return $q(function (resolve, reject) {
      return (// Return a promise for our async XHR
        $http.get("https://front-end-capstone12.firebaseio.com/guitars.json").success(function (guitarCollection) {
          return resolve(guitarCollection);
        }, function (error) {
          return reject(error);
        })
      );
    });
  };
});

