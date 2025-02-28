define([], function () { 
    function BusinessController() { 
        kony.mvc.Business.Delegator.call(this); 
        kony.print("BusinessController initialized");
    } 

    inheritsFrom(BusinessController, kony.mvc.Business.Delegator); 

    BusinessController.prototype.fetchUserDetails = function(successCallback, errorCallback) {
        var serviceName = "DigitalLending";  
        var operationName = "digitallending_GetUserDetails";  
        var data = {
            "user_email": "user1@example.com"
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
