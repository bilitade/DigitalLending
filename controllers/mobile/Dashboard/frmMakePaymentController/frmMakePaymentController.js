define({ 
  onMakePaymentClick: function() {
    var self = this;
    var combinedData = {
      s_account: self.view.accountListBox.selectedKey,
      due_amount: parseFloat(self.view.dueAmountLabel.text),
      customer_id: kony.store.getItem("customer_id")
    };
    console.log("due_amount",combinedData.due_amount);
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
  
  
  onLoanPayClick: function() {
    
    var self = this;
    var combinedData = {
      s_account: self.view.accountListBox.selectedKey,
      due_amount: parseFloat(self.view.remainingBalance.text),
      customer_id: kony.store.getItem("customer_id")
    };
    console.log("due_amount",combinedData.due_amount);
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
  onFormPreShow: function() {
    var self = this;
    var presController = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("Dashboard")
    .presentationController;

    // Call your fetchUserDetails or similar method
    presController.fetchLoanAccount(
      function(response) {

        if (response && response.records && response.records.length > 0) {
          var LoadAccountDetails = response.records[0];
          console.log("LoadAccountDetails",LoadAccountDetails);
          self.populateMainContainer(LoadAccountDetails);
        } else {
          kony.print("No records found in response.");
        }
      },
      function(error) {
        alert("Failed to fetch LoadAccountDetails details: " + JSON.stringify(error));
      }
    );
  },
  populateMainContainer: function(LoadAccountDetails) {
    userRecord=kony.store.getItem("user_record");
    var self = this;
    var bankAccounts = JSON.parse(userRecord.Bank_Accounts || "[]");
    var masterData = bankAccounts.map(function(account) {
      return [account.account_number, account.account_type + " - " + account.account_number];
    });

    self.view.accountListBox.masterData = masterData;

    // If there is at least one item, select the first one.
    if(masterData.length > 0) {
      self.view.accountListBox.selectedKey = masterData[0][0];
    }
    self.view.remainingBalance.text = LoadAccountDetails.remaining_balance;
    let payment_due = JSON.parse(LoadAccountDetails.payment_due);
    self.view.dueAmountLabel.text = payment_due.due_amount; 
    console.log("payment_due.due_amount",payment_due.due_amount);
    self.view.dueDateLabel.text= payment_due.due_date;



  }

});