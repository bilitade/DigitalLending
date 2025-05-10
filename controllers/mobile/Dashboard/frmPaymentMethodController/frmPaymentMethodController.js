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

      self.view.AccountListRadioButton.selectedKey = storedAccount;

      console.log("storedAccount1",storedAccount);
    },
    showToast: function(message) {
    var toast = new kony.ui.Toast({
      text: message,
      duration: constants.TOAST_LENGTH_SHORT
    });
    toast.show();
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
         
          var session = UserSessionManager.getInstance();
          var authUser = session.getUser();  
          self.view.AccountListRadioButton.selectedKey = authUser.profile.Selected_Account_Number;
          self.showToast(response.records[0].message);
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