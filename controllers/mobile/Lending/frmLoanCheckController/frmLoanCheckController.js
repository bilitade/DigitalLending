define({ 

  onAcceptButtonClicked: function(){
    var self =this;
    if(self.view.signContract.selectedKeyValues === null){
      self.showToast("Please read and accept the Contract first");

    }
    else{
      var amountText = self.view.amountLabel.text;  
      var customAmount = self.view.amount.text; 
      console.log("customAmount",customAmount);
      
      var amountNumber = amountText.replace(/[^\d.]/g, ''); 
      var amount = parseFloat(amountNumber);  
     if (customAmount > amount || customAmount < 500) {
    alert("Manual amount should be less than you are eligible for and greater than 500");
    return;
}
      var realamount=(parseFloat(customAmount) * 0.07) + parseFloat(customAmount);
      var presController = kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager()
      .getModule("Lending")
      .presentationController;
      console.log("realamount",realamount);
      presController.saveLoadDetails(realamount,
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
      self.view.LoadingScreen.flexloading.setVisibility(true);
      kony.timer.schedule("loadingTimer", function() {
        self.view.LoadingScreen.flexloading.setVisibility(false);
        navObj= new kony.mvc.Navigation("Lending/frmLoanApproved");
        navObj.navigate(null);

        kony.timer.cancel("loadingTimer"); 
      }, 1, false); 


    }


  },
  showToast: function(message) {
    var toast = new kony.ui.Toast({
      text: message,
      duration: constants.TOAST_LENGTH_SHORT
    });
    toast.show();
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
        self.view.amount.text=loanRecord;
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