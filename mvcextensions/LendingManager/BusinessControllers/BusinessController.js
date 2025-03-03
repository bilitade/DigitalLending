define([], function () { 
    function BusinessController() { 
        kony.mvc.Business.Delegator.call(this); 
        kony.print("BusinessController initialized");
    } 

    inheritsFrom(BusinessController, kony.mvc.Business.Delegator); 
    var serviceName = "DigitalLending";  
    BusinessController.prototype.fetchUserDetails = function(successCallback, errorCallback) {
       
        var operationName = "digitallending_GetUserDetails";  
        var data = {
            "user_email": "guturarie@gmail.com"
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
  
  BusinessController.prototype.fetchLoanDetails = function(custumerId,successCallback, errorCallback) {
         
        var operationName = "digitallending_CheckUserLoanStatus";  
        var data = {
            "p_customer_id": custumerId,
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
         
        var operationName = "digitallending_SetNewLoan"; 
        var custumerId = kony.store.getItem("customer_id");
        console.log("custumerId",custumerId);
        console.log("amount",amount);
        var data = {
            "p_customer_id": custumerId,
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
