define({ 
  onFormPreShow: function(){
    var self = this;

  },
  onScheduleToggle: function(){
    var self = this;
    var toggleValue = self.view.schedulePaySwitch.selectedIndex;
    if(toggleValue === 0){
      toggleValue="on";
    
    }
    else {
      toggleValue="off";
    }
    var userRecord=kony.store.getItem("user_record");
    console.log("userRecord",userRecord);
    var selectedAccount=  kony.store.getItem("selected_account");

    var combinedData;

if (selectedAccount) {
    combinedData = {
        toggleValue: toggleValue,
        account: selectedAccount,
        customer_id: userRecord.Customer_Id
    };
} else {
    // Parse Bank_Accounts JSON string; assume it's a valid JSON string
    var bankAccountsArray = JSON.parse(userRecord.Bank_Accounts || "[]");
    
    if (bankAccountsArray.length > 0) {
        var bestAccount = bankAccountsArray.reduce(function(acc, current) {
            return (parseFloat(current.account_balance) > parseFloat(acc.account_balance)) ? current : acc;
        }, bankAccountsArray[0]);

        combinedData = {
            toggleValue: toggleValue,
            account: bestAccount.account_number,
            customer_id: userRecord.Customer_Id
        };
    } 
}
console.log("Combined Data:", combinedData);



    var presController = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("Dashboard")
    .presentationController;
    presController.makeSchedule(combinedData,
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
      alert("Failed to makeSchedule: " + JSON.stringify(error));
    }
                               );
  },
});