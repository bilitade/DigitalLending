define(['UserSessionManager'], function (UserSessionManager) { 
    function BusinessController() { 
        kony.mvc.Business.Delegator.call(this); 
        kony.print("BusinessController initialized");
    } 

    inheritsFrom(BusinessController, kony.mvc.Business.Delegator); 
    
    var serviceName = "DigitalLending";  
    BusinessController.prototype.fetchUserDetails = function() {
       var session = UserSessionManager.getInstance();
       var authUser = session.getUser();  
       return authUser;
      
    };
  
  BusinessController.prototype.fetchLoanDetails = function(custumerId,successCallback, errorCallback) {
       var session = UserSessionManager.getInstance();
       var authUser = session.getUser();  
        console.log("authUser.profile.Customer_Id",authUser.profile.Customer_Id);
        var operationName = "digitallending_CheckUserLoanStatus";  
        var data = {
            "p_customer_id": authUser.profile.Customer_Id,
        };  

        var sdkInstance = kony.sdk.getCurrentInstance();
        var service = sdkInstance.getIntegrationService(serviceName);

        service.invokeOperation(operationName, {}, data,
            function(response) {  
                kony.print("Service call successful: " + JSON.stringify(response));
                if (successCallback) successCallback(response);
            },
            function(error) {  
                kony.print("Service call failed: " + JSON.stringify(error));
                if (errorCallback) errorCallback(error);
            }
        );
    };
  
    BusinessController.prototype.saveLoadDetails = function(amount,successCallback, errorCallback) {
         var session = UserSessionManager.getInstance();
         var authUser = session.getUser();  
        var operationName = "digitallending_SetNewLoan"; 
        var data = {
            "p_customer_id": authUser.profile.Customer_Id,
            "p_loan_amount":amount,
        };  

        var sdkInstance = kony.sdk.getCurrentInstance();
        var service = sdkInstance.getIntegrationService(serviceName);

        service.invokeOperation(operationName, {}, data,
            function(response) {  
                kony.print("Service call successful: " + JSON.stringify(response));
                if (successCallback) successCallback(response);
            },
            function(error) {  
                kony.print("Service call failed: " + JSON.stringify(error));
                if (errorCallback) errorCallback(error);
            }
        );
    };
  

    return BusinessController;
});
