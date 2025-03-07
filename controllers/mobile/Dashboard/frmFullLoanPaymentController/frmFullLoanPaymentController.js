define({ 

  onNavigate: function(data) {
    var self = this;
    self.view.accountIdLabel.text=data.s_account;
    self.view.payamount.text=data.due_amount;
    self.view.txnrefid.text=data.transaction_id;  
  },

  onReapplyClick: function(){
    var self = this;
    navObj= new kony.mvc.Navigation("Lending/frmLoanHome");       
    navObj.navigate();

  }
});