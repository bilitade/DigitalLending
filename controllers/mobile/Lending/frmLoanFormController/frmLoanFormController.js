

define([], function() {
  return {
    onContinueButtonClicked: function(){

      var self =this;
      if(self.view.agreetoTermsCheckBox.selectedKeyValues === null){
        self.showToast("Please read and accept the terms and agreement first");

      }
      else{
        navObj= new kony.mvc.Navigation("Lending/frmLoanCheck");
        navObj.navigate(null);
      }





    },
    onFormPreShow: function() {
      var self = this;
      var presController = kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager()
      .getModule("Lending")
      .presentationController;

      var userDetail= presController.fetchUserDetails();
      self.populateMainContainer(userDetail.profile);

    },

    showToast: function(message) {
      var toast = new kony.ui.Toast({
        text: message,
        duration: constants.TOAST_LENGTH_SHORT
      });
      toast.show();
    },
    populateMainContainer: function(userRecord) {
      var self =this;
      var primaryAddress = userRecord.Primary_Address || "{}";
      var allPhones = userRecord.All_Phones || "[]";
      var bankAccounts = userRecord.Bank_Accounts || "[]";
      self.view.nameFiledLabel.text = userRecord.Name || "N/A";
      self.view.phoneFieldLabel.text = userRecord.Primary_Phone || "N/A";
      self.view.emailFieldTextLabel.text = userRecord.Email || "N/A";
      self.view.cityFieldLabel.text = primaryAddress.city || "N/A";
      self.view.subcityFieldLabel.text = primaryAddress.subcity || "N/A";
      self.view.woredaFieldLabel.text = primaryAddress.woreda || "N/A";
      self.view.accountListBox.masterData = bankAccounts.map(function(account) {
        return [account.account_number, account.account_type + " - " + account.account_number];
      });

      if(bankAccounts.length > 0) {
        self.view.accountListBox.selectedKey = bankAccounts[0][0];
      }
      kony.print("mainContainer updated successfully with user data.");
    }

  };
});
