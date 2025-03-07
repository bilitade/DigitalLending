define({ 

 displayTransactionHistory: function(){
   var self = this;
    var presController = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("Dashboard")
    .presentationController;
    presController.fetchTransactionHistory(
      function(response) {
        if (response && response.records) {
              self.populateMainContainer(response);

        } else {
          kony.print("No records found in response.");
           
        }
      },
      function(error) {
        alert("Failed to show  Transaction history: " + JSON.stringify(error));
      }
    );
   
 },
    
  populateMainContainer: function(response) {
    var self = this;
    var data = response.records;
   
    var formattedData = data.map(function(item) {
        return {
            "txntype": item.transaction_type || "N/A",     
            "txnref": "Ref: " + (item.reference || "N/A"),   
            "date": "Date: " + (item.transaction_date || "N/A"), 
            "amount": item.amount || "N/A",                  
            "currency": "ETB"                               
        };
    });
    self.view.acctSegement.setData(formattedData);
    

    

  }
 });