define({ 

  onNavigate: function(data) {
    var self = this;
    self.view.accountIdLabel.text=data.s_account;
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
});