define({ 

  onFormPreShow: function() {
    var self = this;
    var presController = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("Dashboard")
    .presentationController;
     var CreditChange= 0;
    // Call your fetchUserDetails or similar method
    presController.fetchCreditScore(
      function(response) {
       
        if (response && response.records && response.records.length > 0) {
          var CreditScore = response.records[0];

          self.view.creditScoreFieldlabel.text=CreditScore.CurrentCreditScore;
          var payment_due= kony.store.getItem("payment_due");
          self.view.payRecommend.text = "Pay at least ETB "+ payment_due +"/month";
          
           var lastupdate = CreditScore.LastUpdated;

    // Parse the datetime string into a Date object
    var paymentDate = new Date(lastupdate);

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

      lastupdate = formattedDate;

    } 
   self.view.ScoreUpdateLabel.text= "Score updated: "+ lastupdate;
          
          self.view.ScoreUpdateLabel.text= "Score updated: "+CreditScore.LastUpdated;
          
          console.log("CreditScore.CurrentCreditScore",CreditScore.CurrentCreditScore);
          
          self.view.scoreChangeField.text = CreditScore.CurrentCreditScore - CreditScore.PreviousCreditScore
          
          if (CreditScore.CurrentCreditScore > 0) {
           CreditChange = Math.round(
            ((parseFloat(CreditScore.CurrentCreditScore)-parseFloat(CreditScore.PreviousCreditScore)) / 
             (parseFloat(CreditScore.PreviousCreditScore) + parseFloat(CreditScore.CurrentCreditScore))) * 100
          );}
          
           
          self.view.CreditChangeField.text= CreditChange + "%" ;
          if (CreditScore.CurrentCreditScore > 400) {
            self.view.ScoreGradeLabel.text = "Score Grade : A";
            self.view.scoreRatignLabel.text = "Score Rating : Gold";
            
          } else if (CreditScore.CurrentCreditScore > 300) {
            self.view.ScoreGradeLabel.text = "Score Grade : B";
            self.view.scoreRatignLabel.text = "Score Rating : Platinium";
          } else if (CreditScore.CurrentCreditScore > 200) {
            self.view.ScoreGradeLabel.text = "Score Grade : C";
            self.view.scoreRatignLabel.text = "Score Rating : Silver";
          } else if (CreditScore.CurrentCreditScore > 100) {
            self.view.scoreRatignLabel.text = "Score Rating : Bronze";
          } else if (CreditScore.CurrentCreditScore >= 0) {
            self.view.ScoreGradeLabel.text = "Score Grade : E";
            self.view.scoreRatignLabel.text = "Score Rating : Keep Up";

          }

        } else {
          kony.print("No records found in response.");
        }
      },
      function(error) {
        alert("Failed to fetch credit score details: " + JSON.stringify(error));
      }
    );
  },

});