define(['UserSessionManager'], function (UserSessionManager) { 
  return{
    displayAccounts: function (){
      var self = this;
      var session = UserSessionManager.getInstance();
      var authUser = session.getUser();  
      var bankAccounts = authUser.profile.Bank_Accounts || "[]";
      var masterData = bankAccounts.map(function(account) {
        return [account.account_number, account.account_type + 
                " - " + account.account_number];
      });
      self.view.AccountListRadioButton.masterData = masterData;

      var storedAccount =  authUser.profile.Selected_Account_Number;
      if(storedAccount) {
        self.view.AccountListRadioButton.selectedKey = storedAccount;
      }
      console.log("storedAccount",storedAccount);
    },
    onAccountSelection: function (){
      var self = this;
      var selectedValue = self.view.AccountListRadioButton.selectedKey;
      var data = {
            account_number: selectedValue,
        };

    var presController = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("Dashboard")
    .presentationController;
    presController.saveSelectedAccount(data,
                                function(response) {

      if (response && response.records && response.records.length > 0) {
          alert(response.records[0].message);
          navObj= new kony.mvc.Navigation("Dashboard/frmPaymentMethod");       
          navObj.navigate();
      } else {
        kony.print("No records found in response.");

      }
    },
                                function(error) {
      alert("Failed to makeSchedule: " + JSON.stringify(error));
    }
                               );
    }};

});