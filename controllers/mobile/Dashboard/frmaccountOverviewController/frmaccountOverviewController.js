define({ 

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
                       var LoadAccountDetails = response.records[0];
                       console.log("LoadAccountDetails",LoadAccountDetails);
                        self.populateMainContainer(LoadAccountDetails);
                    } else {
                        kony.print("No records found in response.");
                    }
                },
                function(error) {
                    alert("Failed to fetch LoadAccountDetails details: " + JSON.stringify(error));
                }
            );
        },
  
     
      populateMainContainer: function(LoadAccountDetails) {
         var self = this;
        self.view.remainingBalanceField.text= LoadAccountDetails.remaining_balance;
        let payment_due = JSON.parse(LoadAccountDetails.payment_due);
        self.view.dueFieldLabel.text= payment_due.due_amount;
        let last_payment = JSON.parse(LoadAccountDetails.last_payment);
        self.view.lastPaymentFieldLabel.text= last_payment.amount_paid;
        self.view.loanStatusFieldLabel.text= LoadAccountDetails.loan_status;
        self.view.creditScoreFieldLabel.text= LoadAccountDetails.credit_score;
        
        var loanAmount = parseFloat(LoadAccountDetails.loan_amount);
        var remainingBalance = parseFloat(LoadAccountDetails.remaining_balance);
        var paidAmount = loanAmount - remainingBalance;

        var paidPercentage = (paidAmount / loanAmount) * 100;
        var duePercentage = 100 - paidPercentage;
        console.log("paidPercentage",paidPercentage);
        console.log("duePercentage",duePercentage);
         if (paidPercentage === 0){
         this.view.donutchart.chartData =

      {

        "data":

        [
          {"colorCode": "#E38524", "label": "Due", "value": 100},
        ]

      };

}
else{
  this.view.donutchart.chartData =

      {

        "data":

        [
          {"colorCode": "#00ADEF", "label": "Paid", "value": paidPercentage},
          {"colorCode": "#E38524", "label": "Due", "value": duePercentage},
        ]

      };
  
}



      
}
  
  

 });