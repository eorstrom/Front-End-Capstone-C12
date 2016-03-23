soundApp.controller("AddSongCtrl", [
  "$scope",
  "$location",
  "$http",

  function ($scope, $location, $http) {

    // Default property values for keys bound to input fields
    $scope.newSong = {
      name: "",
      duration: ""
    };

    // Function bound to the Add Song button in the view template
    $scope.addSong = function () {

      // POST the song to Firebase
      $http.post(
        "https://front-end-capstone12.firebaseio.com/",

        // Remember to stringify objects/arrays before
        // sending them to an API
        JSON.stringify({
          name: $scope.newSong.name,
          duration: $scope.newSong.duration
        })

      // The $http.post() method returns a promise, so you can use then()
      ).then(
        function() { $location.url("/songs-list/"),      // Handle resolve
            function(response) {
            console.log(response)  // Handle reject
            };
        });
    };
}]);