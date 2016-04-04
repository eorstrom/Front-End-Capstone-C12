"use strict";

soundApp.controller('AddGearCtrl', [
    '$scope', 

    function($scope){
        $scope.pedals = [
            { id: 1, brand: "MXR", model: "Dynacomp", settings: ["output", "sensitivity"]}, 
            { id: 2, brand: "Electro-Harmonix", model: "Soulfood", 
                settings: ["volume", "treble", "drive"]}, 
            { id: 3, brand: "Voss", model: "Adaptive Distortion DA_2", 
                settings: ["level", "low", "high", "a_dist"]}
        ];
        console.log("$scope.pedals", $scope.pedals);


        $scope.showPedalOptions = false;
        $scope.showPedals = function() {
            console.log("showPedals was clicked");
            $scope.showPedalOptions = !$scope.showPedalOptions;
        };

        $scope.linkSettings = function(pedal) {
            console.log(pedal.settings);
            $scope.settings = pedal;
            console.log("pedal.key", pedal.key);
        }

        // $scope.saveGear() = function() {

        // }
}]);