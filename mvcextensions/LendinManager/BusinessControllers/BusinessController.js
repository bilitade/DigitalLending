define([], function () { 
    /**
     * User defined Business Controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function BusinessController() { 
        kony.mvc.Business.Delegator.call(this); 
        kony.print("BusinessController initialized");
    } 

    inheritsFrom(BusinessController, kony.mvc.Business.Delegator); 

    
    
    BusinessController.prototype.fetchUserDetails = function(successCallback, errorCallback) {
        var serviceName = "DigitalLending";  
        var operationName = "digitallending_GetUserDetails";  

        // Retrieve user_email from store if available, otherwise use default.
        var userEmail = kony.store.getItem("userid") || "user1@example.com";
        var data = {
            "user_email": userEmail
        };  

        var sdkInstance = kony.sdk.getDefaultInstance();
        if(!sdkInstance) {
            kony.print("Error: kony.sdk instance is not available.");
            if(errorCallback) errorCallback({errmsg:"SDK not initialized"});
            return;
        }
        
        var service = sdkInstance.getIntegrationService(serviceName);
        if(!service) {
            kony.print("Error: Integration service " + serviceName + " is not available.");
            if(errorCallback) errorCallback({errmsg:"Integration service not found"});
            return;
        }

        service.invokeOperation(operationName, {}, data,
            function(response) {  
                kony.print("Service call successful: " + JSON.stringify(response));
                if(successCallback) {
                    successCallback(response);
                }
            },
            function(error) {  
                kony.print("Service call failed: " + JSON.stringify(error));
                if(errorCallback) {
                    errorCallback(error);
                }
            }
        );
    };

    return BusinessController;
});
