define(['UserSessionManager'], function (UserSessionManager) { 

  /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
  function BusinessController() { 

    kony.mvc.Business.Delegator.call(this); 

  } 

  inheritsFrom(BusinessController, kony.mvc.Business.Delegator); 

  
 
  var serviceName = "DigitalLending";  
  
  BusinessController.prototype.fetchLoanAccount = function(successCallback, errorCallback) {
    var session = UserSessionManager.getInstance();
    var authUser = session.getUser();
    var operationName = "digitallending_LoanOverview";  
    var data = {
        "p_customer_id": authUser.profile.Customer_Id,
    };  

    var sdkInstance = kony.sdk.getCurrentInstance();
    var service = sdkInstance.getIntegrationService(serviceName);

    service.invokeOperation(operationName, {}, data,
        function(response) {  
            kony.print("Service call successful: " + JSON.stringify(response));

            // Attach authUser to the response
            response.authUser = authUser;

            if (successCallback) successCallback(response);
        },
        function(error) {  
            kony.print("Service call failed: " + JSON.stringify(error));
            if (errorCallback) errorCallback(error);
        }
    );
};

  BusinessController.prototype.makePayment = 
    function(combinedData,successCallback, errorCallback) {

 var session = UserSessionManager.getInstance();
  var authUser = session.getUser();
    var operationName = "digitallending_MakePayment";  
    var data = {
      "p_customer_id" : authUser.profile.Customer_Id,
      "p_saving_account_number": combinedData.s_account,
      "p_amount": parseFloat(combinedData.due_amount)*100,
    };  
     console.log("due_amount from business",data.p_amount);
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
  BusinessController.prototype.fetchCreditScore = 
    function(successCallback, errorCallback) {
 var session = UserSessionManager.getInstance();
  var authUser = session.getUser();

    var operationName = "digitallending_CalculateCreditScore";  
   
    var data = {
      "p_customer_id" : authUser.profile.Customer_Id,
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
  BusinessController.prototype.makeSchedule = function(combinedData,successCallback, errorCallback) {
          var session = UserSessionManager.getInstance();
  var authUser = session.getUser();
        var operationName = "digitallending_SchedulePaymentControl";  
        var data = {
            "p_customer_id": authUser.profile.Customer_Id,
            "p_account_number":combinedData.account,
            "p_control_flag":combinedData.toggleValue,
        };  
        console.log("data",data);
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