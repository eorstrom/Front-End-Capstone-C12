"use strict";

soundApp.factory("sectionFactory", ['$q', '$http', function ($q, $http) {
    return {

        function (whatever) {
            return $q(function (resolve, reject) {
            // return (   // Return a promise for our async XHR
            $http.get("https://front-end-capstone12.firebaseio.com/songs/" + whatever + "/songSections/")
            .success(function (sectionCollection) {
                console.log("sectionCollection", sectionCollection);
                resolve(sectionCollection);
            }, function (error) {
                reject(error);
            })
        });
      }
    }
}]);
