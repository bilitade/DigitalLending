define(['UserSessionManager'], function (UserSessionManager) { 
  return{
    onNavigate: function(data) {
      var self = this;
      var session = UserSessionManager.getInstance();
      var authUser = session.getUser();
      console.log("dataa",data);
      self.view.nameplaceholder.text=authUser.profile.Name;
      self.view.refplaceholder.text = data.transaction_id;
      var currentDate = new Date();
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1; // Months are zero-based
      var year = currentDate.getFullYear();
      var formattedDate = day + "/" + month + "/" + year;
      self.view.dateplaceholder.text = formattedDate;
      self.view.accountIdLabel.text=data.s_account;
      self.view.paidfromplaceholder.text=data.s_account;
      self.view.amountplaceholder.text=data.due_amount;
      self.view.payamount.text=data.due_amount;
      self.view.txnrefid.text=data.transaction_id;




    },
    ongetreceiptclicked:function(){
      this.view.flexreceipt.setVisibility(true);
    },
    onexitclicked:function(){
      this.view.flexreceipt.setVisibility(false);
    },
    onsaveclicked:function(){
      this.showToast("Saving Image to Gallery");
      this.view.flexreceipt.setVisibility(false);


    },
    showToast: function(message) {
      var toast = new kony.ui.Toast({
        text: message,
        duration: constants.TOAST_LENGTH_SHORT
      });
      toast.show();
    },
  };
});