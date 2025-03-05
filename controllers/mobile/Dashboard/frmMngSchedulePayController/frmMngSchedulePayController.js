define({ 
onFormPreShow: function(){
   var self = this;
   
},
 onFormPostShow: function(){
   var self = this;
   var toggleValue = self.view.schedulePaySwitch.selectedIndex;
    var presController = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("Dashboard")
    .presentationController;
     presController.makePayment(combinedData,
      function(response) {

        if (response && response.records && response.records.length > 0) {
             var transaction_id = response.records[0];
             combinedData.transaction_id = transaction_id.TransactionReference;
             console.log("combinedData",combinedData);
             navObj= new kony.mvc.Navigation("Dashboard/frmLoanPayment");
             navObj.navigate(combinedData);
          

        } else {
          kony.print("No records found in response.");
           
        }
      },
      function(error) {
        alert("Failed to make payment: " + JSON.stringify(error));
      }
    );
},
 });