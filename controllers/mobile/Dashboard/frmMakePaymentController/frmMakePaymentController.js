define({ 
  onMakePaymentClick: function() {
    var self = this;
    var basicConf = {
      message: "you are about to  make payment, Do you want to continue?",
      alertType: constants.ALERT_TYPE_CONFIRMATION,
      alertTitle: "Exit Confirmation",
      yesLabel: "Yes",
      noLabel: "Cancel",
      alertHandler: function(response) {
        if (response === true) {
         
          var combinedData = {
            s_account: self.view.accountListBox.selectedKey,
            due_amount: parseFloat(self.view.dueAmountLabel.text),
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
              if(transaction_id.FullyPaid === "Yes"){
                navObj= new kony.mvc.Navigation("Dashboard/frmFullLoanPayment");   
                navObj.navigate(combinedData);
              }
              else{
                navObj= new kony.mvc.Navigation("Dashboard/frmLoanPayment");   
                navObj.navigate(combinedData);
              }

            } else {
              kony.print("No records found in response.");

            }
          },
                                     function(error) {
            alert("Failed to make payment: " + JSON.stringify(error));
          }
                                    );

        } else {
          navObj= new kony.mvc.Navigation("Dashboard/frmMakePayment");       
          navObj.navigate();

        }
      }
    };
    var pspConf = {};
    kony.ui.Alert(basicConf, pspConf);





  },


  onLoanPayClick: function() {
    var self = this;

    var basicConf = {
      message: "You are about fully pay your loan, do you want to continue?",
      alertType: constants.ALERT_TYPE_CONFIRMATION,
      alertTitle: "Exit Confirmation",
      yesLabel: "Yes",
      noLabel: "Cancel",
      alertHandler: function(response) {
        if (response === true) {
         
          var combinedData = {
            s_account: self.view.accountListBox.selectedKey,
            due_amount: parseFloat(self.view.remainingBalance.text),
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
              navObj= new kony.mvc.Navigation("Dashboard/frmFullLoanPayment");       
              navObj.navigate(combinedData);
            } else {
              kony.print("No records found in response.");

            }
          },
                                     function(error) {
            alert("Failed to make payment: " + JSON.stringify(error));
          }
                                    );


        } else {


        }
      }
    };
    var pspConf = {};
    kony.ui.Alert(basicConf, pspConf);






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
          self.populateMainContainer(response);
        } else {
          kony.print("No records found in response.");
        }
      },
      function(error) {
        alert("Failed to fetch LoadAccountDetails details: " + JSON.stringify(error));
      }
    );
  },

  populateMainContainer: function(response) {
    var self = this;
    
    var LoadAccountDetails = response.records[0];
    var bankAccounts = response.authUser.profile.Bank_Accounts || "[]";
    var masterData = bankAccounts.map(function(account) {
      return [account.account_number, account.account_type + " - " + account.account_number];
    });

    self.view.accountListBox.masterData = masterData;
    if (response.authUser.profile.Active_Scheduled_Payment === "Yes"){
          self.view.scheduleLabel.text = "ON";

    } else {
          self.view.scheduleLabel.text = "OFF";

    }
    
    // If there is at least one item, select the first one.
    if(masterData.length > 0) {
      self.view.accountListBox.selectedKey = masterData[0][0];
    }
    self.view.remainingBalance.text =LoadAccountDetails.remaining_balance;
    let payment_due = JSON.parse(LoadAccountDetails.payment_due);
    self.view.dueAmountLabel.text =payment_due.due_amount; 
    console.log("payment_due.due_amount",payment_due.due_amount);
    self.view.dueDateLabel.text= "Payment due by " +payment_due.due_date;



  }

});