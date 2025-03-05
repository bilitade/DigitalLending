define({ 

 displayAccounts: function(){
   var self = this;
   var userRecord = kony.store.getItem("user_record");
   var bankAccounts = JSON.parse(userRecord.Bank_Accounts || "[]");
   var masterData = bankAccounts.map(function(account) {
       return [account.account_number, account.account_type + " - " + account.account_number];
   });
   self.view.AccountListRadioButton.masterData = masterData;

   var storedAccount = kony.store.getItem("selected_account");
   if(storedAccount) {
       self.view.AccountListRadioButton.selectedKey = storedAccount;
   }
},
  
onAccountSelection: function(){
   var self = this;
   var selectedValue = self.view.AccountListRadioButton.selectedKey;
   kony.store.setItem("selected_account", selectedValue);
   kony.print("Selected account saved: " + selectedValue);
}
 });