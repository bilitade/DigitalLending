define({ 

  onAcceptButtonClicked: function(){
    var self=this; 
    navObj= new kony.mvc.Navigation("Lending/frmLoanApproved");
    navObj.navigate(null);
   var amountText = self.view.amountLabel.text;  // Example: "ETB  5000"
    var amountNumber = amountText.replace(/[^\d.]/g, '');  // Removes non-numeric characters
    var amount = parseFloat(amountNumber);  // Convert string to number

    console.log("amount",amount);  // Output: 5000
     var presController = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("Lending")
    .presentationController;
    presController.saveLoadDetails(amount,
                                   function(response) {

      // Assume response.records[0] contains the user info
      if (response && response.records && response.records.length > 0) {
        alert("saved");
      } else {
        kony.print("No records found in response.");
      }
    },
                                   function(error) {
      alert("Failed to fetch Loan details: " + JSON.stringify(error));
    }
                                  );


  },

  onFormPreShow: function() {
    var self = this;
    var presController = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("Lending")
    .presentationController;
    var CustomerId = kony.store.getItem("customer_id");


    // Call your fetchUserDetails or similar method
    presController.fetchLoanDetails(CustomerId,
                                    function(response) {

      // Assume response.records[0] contains the user info
      if (response && response.records && response.records.length > 0) {
        console.log("loan respnse",response);
        var loanRecord = response.records1[0].Result;
        
        self.view.amountLabel.text=  "ETB" + " " + loanRecord;
      } else {
        kony.print("No records found in response.");
      }
    },
                                    function(error) {
      alert("Failed to fetch Loan details: " + JSON.stringify(error));
    }
                                   );
  },


});