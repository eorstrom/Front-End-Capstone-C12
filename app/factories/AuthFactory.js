"use strict";

soundApp.factory("authFactory", function(firebaseURL) {
  let ref = new Firebase(firebaseURL);

  return {
    /*
      Determine if the client is authenticated
     */
    isAuthenticated () {
      let authData = ref.getAuth();

      if (authData) {
        return true;
      } else {
        return false;
      }
    },
    /*
      Authenticate the client via Firebase
     */
    authenticate (credentials) {
      console.log("authenticate");
      return new Promise(function(resolve, reject) {
        ref.authWithPassword({
          "email": credentials.email,
          "password": credentials.password
        }, function(error, authData) {
          if (error) {
            if (error == "Error: The specified user does not exist."){
              alert("This user does not exist, try again.");
            }
            if (error == "Error: The specified password is incorrect."){
              alert("Password not recognized, please try again.");
            }
            reject(error);
          } else {
            console.log("authWithPassword method completed successfully");
            resolve(authData);
          }
        });
      });
    }
  };
});