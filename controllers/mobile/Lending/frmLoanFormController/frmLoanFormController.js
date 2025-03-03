

define([], function() {
    return {
      onContinueButtonClicked: function(){
    
    navObj= new kony.mvc.Navigation("Lending/frmLoanCheck");
    navObj.navigate(null);
    
    
  },
        onFormPreShow: function() {
            var self = this;
            var presController = kony.mvc.MDAApplication.getSharedInstance()
                .getModuleManager()
                .getModule("Lending")
                .presentationController;

            // Call your fetchUserDetails or similar method
            presController.fetchUserDetails(
                function(response) {
                    // Assume response.records[0] contains the user info
                    if (response && response.records && response.records.length > 0) {
                        var userRecord = response.records[0];
                        var customerId = "1089348743";
                       kony.store.setItem("customer_id", customerId);
                       kony.store.setItem("user_record", userRecord); 
                        self.populateMainContainer(userRecord);
                    } else {
                        kony.print("No records found in response.");
                    }
                },
                function(error) {
                    alert("Failed to fetch user details: " + JSON.stringify(error));
                }
            );
        },

       
      populateMainContainer: function(userRecord) {
    var form = kony.application.getCurrentForm();
    if (!form) {
        kony.print("No current form available.");
        return;
    }

    // Parse JSON fields
    var primaryAddress = JSON.parse(userRecord.Primary_Address || "{}");
    var allPhones = JSON.parse(userRecord.All_Phones || "[]");
    var bankAccounts = JSON.parse(userRecord.Bank_Accounts || "[]");

    // Name
    form.mainContainer.nameGroupContainer.nameFiledLabel.text = userRecord.Name || "N/A";

    // Primary Phone
    form.mainContainer.phoneGroupContainer.phoneFieldLabel.text = userRecord.Primary_Phone || "N/A";
     console.log("userRecord.Primary_Phone",userRecord.Primary_Phone)
    // Email
    form.mainContainer.emailGroupContainer.emailFieldTextLabel.text = userRecord.Email || "N/A";

    // Address Fields
    
    // City
    form.mainContainer.addressGroupContainer.addressFieldsGroup.city.cityFieldLabel.text = primaryAddress.city || "N/A";

    // Subcity
    form.mainContainer.addressGroupContainer.addressFieldsGroup.subcity.subcityFieldLabel.text = primaryAddress.subcity || "N/A";

    // Woreda
    form.mainContainer.addressGroupContainer.addressFieldsGroup.woreda.woredaFieldLabel.text = primaryAddress.woreda || "N/A";

    // Bank Accounts (ListBox)
    form.mainContainer.accountGroupContainer.accountListBox.masterData = bankAccounts.map(function(account) {
        return [account.account_number, account.account_type + " - " + account.account_number];
    });
        

     if(bankAccounts.length > 0) {
    form.mainContainer.accountGroupContainer.accountListBox.selectedKey = bankAccounts[0][0];
}
    kony.print("mainContainer updated successfully with user data.");
}

    };
});
