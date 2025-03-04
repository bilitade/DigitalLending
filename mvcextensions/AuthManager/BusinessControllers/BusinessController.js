define([], function () { 
    
    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function BusinessController() { 

        kony.mvc.Business.Delegator.call(this); 

    } 

    inheritsFrom(BusinessController, kony.mvc.Business.Delegator); 
  
    var serviceName = "Authentication"; 
    var client = kony.sdk.getCurrentInstance();
    var identitySvc = client.getIdentityService(serviceName);

 
    BusinessController.prototype.authenticateUser =
    function (username, password, callbacks) {
    kony.print("Entering AuthManager.BusinessController.authenticateUser");

  
    var options = {
      "userid": username,

      "password": password,

      "loginOptions": {
        "include_profile": true,

        "isSSOEnabled": false,

        "continueOnRefreshError": false,

        "persistLoginResponse": false,

        "isOfflineEnabled": false
      }
    };
    identitySvc.login(
      options,
      function (response) {
        kony.print("Login Success: " + JSON.stringify(response));

        // Store the email (username) as "userid" in Kony Store
        kony.store.setItem("userid", username);

        // Verify storage
        kony.print("User ID Stored Successfully: " + 
                   username);
        kony.print("Retrieved User ID from Store: " +
                   kony.store.getItem("userid"));
        
        kony.print("store the id on Session Manager");
//         var UserSessionManager = require('UserSessionManager');
//         var session = UserSessionManager.getInstance();
//         session.setAuthUser({ userid: username });
//         kony.print("stored Variable session"+ session.getUser().userid);
        callbacks.success(response);
      },
      function (error) {
        kony.print("Login Failure: " + JSON.stringify(error));
        callbacks.error(error);
      }
    );




    kony.print("Exiting AuthManager.BusinessController.authenticateUser");
  };

  
  
  
  

    return BusinessController;

});