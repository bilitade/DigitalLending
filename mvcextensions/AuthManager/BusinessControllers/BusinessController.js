define(['UserSessionManager'], function (UserSessionManager) { 

  var session = UserSessionManager.getInstance();
  var serviceName = "Authentication"; 
  var client = kony.sdk.getCurrentInstance();
  var identitySvc = client.getIdentityService(serviceName);
  var IntegServiceName = "DigitalLending";  
  var operationName = "digitallending_GetUserDetails";  
  var service = client.getIntegrationService(IntegServiceName);

  /**
   * User defined business controller
   * @constructor
   * @extends kony.mvc.Business.Delegator
   */
  function BusinessController() { 
    kony.mvc.Business.Delegator.call(this); 
  } 

  inheritsFrom(BusinessController, kony.mvc.Business.Delegator); 

  BusinessController.prototype.authenticateUser = 
    function (username, password, callbacks) {
    kony.print("Authenticating user: " + username);

    var authOptions = {
      userid: username,
      password: password,
      loginOptions: {
        include_profile: true,
        isSSOEnabled: false,
        continueOnRefreshError: false,
        persistLoginResponse: false,
        isOfflineEnabled: false
      }
    };

    identitySvc.login(authOptions, function (response) {
      kony.print("Login Success: " + JSON.stringify(response));
      kony.store.setItem("userid", username);
      session.setAuthUser({ id: username });

      var user = session.getUser();
      if (user && user.id) {
        kony.print("Fetching user profile for: " + user.id);
        var data = { user_email: user.id };

        service.invokeOperation(operationName, 
                                {}, data, function (profileResponse) {
          if (profileResponse.records && profileResponse.records.length > 0) {
            var profile = profileResponse.records[0];

            var cleanedDataProfile = {
              Name: profile.Name || "N/A",
              Email: profile.Email || "N/A",
              Customer_Id: profile.Customer_Id || "N/A",
              Primary_Phone: profile.Primary_Phone || "N/A",
              Active_Loan: profile.Active_Loan === "Yes",
              Active_Scheduled_Payment: profile.Active_Scheduled_Payment === "Yes",
              All_Addresses: JSON.parse(profile.All_Addresses || "[]"),
              Bank_Accounts: JSON.parse(profile.Bank_Accounts || "[]"),
              All_Phones: JSON.parse(profile.All_Phones || "[]"),
              Primary_Address: JSON.parse(profile.Primary_Address || "{}")
            };

            session.setAuthUser({ profile: cleanedDataProfile });
            kony.print("User profile stored: " + JSON.stringify(cleanedDataProfile));
            if (callbacks.success) callbacks.success(profileResponse);
          } else {
            kony.print("No valid profile data found.");
            if (callbacks.error) callbacks.error("No profile data found.");
          }
        }, function (profileError) {
          kony.print("Profile fetch error: " + JSON.stringify(profileError));
          if (callbacks.error) callbacks.error(profileError);
        });

      } else {
        kony.print("Error: User ID not found in session.");
        if (callbacks.error) callbacks.error("User ID not found in session.");
      }
    }, function (error) {
      kony.print("Login Failure: " + JSON.stringify(error));
      if (callbacks.error) callbacks.error(error);
    });

    kony.print("Exiting authenticateUser");
  };

  return BusinessController;
});
