"use strict";

soundApp.controller('AddGearCtrl', [
    '$scope', 

    function($scope){
        
        $scope.amplifiers = [
            { 
            id: 1, 
            brand: "Fender", 
            model: "Super Champ", 
            settings_input: 
                ["bass", 
                "reverb", 
                "lead level", 
                "master"],
            // settings_toggle: toggle settings "volume" and "treble" need to be added
            }, 
            { 
            id: 2, 
            brand: "Fender", 
            model: "Blues Junior", 
            settings_input: 
                ["reverb", 
                "master", 
                "middle", 
                "bass", 
                "treble", 
                "volume"],
            settings_toggle: ["fat"]   
            }, 
            { 
            id: 3, 
            brand: "Soldono", 
            model: "Astroverb 16", 
            settings: 
                ["prevamp", 
                "reverb", 
                "bass", 
                "middle", 
                "treble", 
                "volume", 
                "presence"]
            }
        ];

        $scope.showAmplifierOptions = false;
        $scope.showAmplifiers = function() {
            console.log("showAmplifiers was clicked");
            $scope.showAmplifierOptions = !$scope.showAmplifierOptions;
        };

        $scope.linkAmplifierSettings = function(amplifier) {
            console.log(amplifier.settings);
            $scope.settings = amplifier;
            console.log("amplifier.key", amplifier.key);
        }

        $scope.guitars = [
            { 
                id: 1, 
                brand: "Gibson", 
                model: "Les Paul, Standard", 
                bridge_pickup_settings: 
                    {
                        initial: true,
                        bp_settings: 
                            ["volume", "tone"]
                    },
                neck_pickup_settings: 
                    {
                        initial: true,
                        bp_settings: 
                            ["volume", "tone"]
                    }
            }, 
            { 
                id: 2, 
                brand: "Fender", 
                model: "Stratocaster", 
                pickup_switch: 
                [
                    {
                        position: 1,
                        name: "bridge",
                        active: true
                    },
                    {
                        position: 2,
                        name: "bridge and middle",
                        active: false
                    },
                    {
                        position: 3,
                        name: "middle",
                        active: false
                    },
                    {
                        position: 4,
                        name: "middle and neck",
                        active: false
                    },
                    {
                        position: 5,
                        name: "neck",
                        active: false
                    }
                ],
                settings: 
                    ["volume", 
                    "tone1", 
                    "tone2"]
            }, 
            { 
                id: 3, 
                brand: "Fender", 
                model: "Telecaster", 
                pickup_switch: 
                [
                    {
                        position: 1,
                        name: "bridge",
                        active: true
                    },
                    {
                        position: 2,
                        name: "bridge and neck",
                        active: false
                    },
                    {
                        position: 3,
                        name: "neck",
                        active: false
                    }
                ],
                settings: 
                    ["volume", 
                    "tone"]
            }
        ];

        $scope.showGuitarOptions = false;
        $scope.showGuitars = function() {
            console.log("showGuitars was clicked");
            $scope.showGuitarOptions = !$scope.showGuitarOptions;
        };

        $scope.linkGuitarSettings = function(guitar) {
            console.log(guitar.settings);
            $scope.settings = guitar;
            console.log("guitar.key", guitar.key);
        }

        $scope.pedals = [
            { 
            id: 1, 
            brand: "MXR", 
            model: "Dynacomp", 
            settings: 
                ["output", 
                "sensitivity"]
            }, 
            {   
            id: 2, 
            brand: "Electro-Harmonix", 
            model: "Soulfood", 
            settings: 
                ["volume", 
                "treble", 
                "drive"]
            }, 
            { 
            id: 3, 
            brand: "Boss", 
            model: "Adaptive Distortion DA_2", 
            settings: 
                ["level", 
                "low", 
                "high", 
                "a_dist"]
            }
        ];
        console.log("$scope.pedals", $scope.pedals);


        $scope.showPedalOptions = false;
        $scope.showPedals = function() {
            console.log("showPedals was clicked");
            $scope.showPedalOptions = !$scope.showPedalOptions;
        };

        $scope.linkPedalSettings = function(pedal) {
            console.log(pedal.settings);
            $scope.settings = pedal;
            console.log("pedal.id", pedal.id);
        }

        // $scope.saveGear() = function() {

        // }
}]);