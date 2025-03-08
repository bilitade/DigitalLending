define({ 
  onNavigate: function(){
  },
  onFormPostShow: function() {

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
          self.view.nameLabel.text=response.authUser.profile.Name;
          console.log("LoadAccountDetails",response);
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
    this.view.forceLayout();
    console.log("LoadAccountDetails",LoadAccountDetails);
    var self = this;
    self.view.amountLabel.text ="Loan Amount "+ LoadAccountDetails.loan_amount;
    self.view.remainingBalanceField.text= LoadAccountDetails.remaining_balance;
    let payment_due = JSON.parse(LoadAccountDetails.payment_due);
    self.view.dueFieldLabel.text= payment_due.due_amount;
    let last_payment = JSON.parse(LoadAccountDetails.last_payment);
    self.view.loanStatusFieldLabel.text= LoadAccountDetails.loan_status;
    self.view.creditScoreFieldLabel.text= LoadAccountDetails.credit_score;
    if(last_payment.payment_date === null){
      last_payment.payment_date="Pending";
      last_payment.amount_paid ="Pending";
    }
    self.view.dueFieldDate.text="By "+payment_due.due_date;
    self.view.LastPaymentLabel.text=last_payment.amount_paid;
    var paymentDateTimeString = last_payment.payment_date;

    // Parse the datetime string into a Date object
    var paymentDate = new Date(paymentDateTimeString);

    // Check if the Date object is valid
    if (!isNaN(paymentDate.getTime())) {
      // Extract the date components
      var year = paymentDate.getFullYear();
      var month = paymentDate.getMonth() + 1; // Months are zero-based
      var day = paymentDate.getDate();

      // Format the date as YYYY-MM-DD
      var formattedDate = year + '-' +
          (month < 10 ? '0' + month : month) + '-' +
          (day < 10 ? '0' + day : day);

      last_payment.payment_date= formattedDate;

    } 
    self.view.lastPaymentDate.text = "On "+ last_payment.payment_date;
    var loanAmount = parseFloat(LoadAccountDetails.loan_amount);
    var remainingBalance = parseFloat(LoadAccountDetails.remaining_balance);
    var paidAmount = loanAmount - remainingBalance;

    var paidPercentage = ((paidAmount / loanAmount) * 100).toFixed(1);
    var duePercentage = (100 - paidPercentage).toFixed(1);
    console.log("paidPercentage",paidPercentage);
    console.log("duePercentage",duePercentage);
    if (parseInt(paidPercentage) === 0){

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