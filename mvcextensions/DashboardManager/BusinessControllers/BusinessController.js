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


  var serviceName = "DigitalLending";  
  var custumerId = kony.store.getItem("customer_id");
  BusinessController.prototype.fetchLoanAccount = function(successCallback, errorCallback) {

    var operationName = "digitallending_LoanOverview";  
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
  BusinessController.prototype.makePayment = 
    function(combinedData,successCallback, errorCallback) {


    var operationName = "digitallending_MakePayment";  
    var data = {
      "p_customer_id" : combinedData.customer_id,
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


    var operationName = "digitallending_CalculateCreditScore";  
    var custumerId = kony.store.getItem("customer_id");
    var data = {
      "p_customer_id" : custumerId,
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