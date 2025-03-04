define({ 

  onFormPreShow: function() {
    var self = this;
    var presController = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("Dashboard")
    .presentationController;

    // Call your fetchUserDetails or similar method
    presController.fetchCreditScore(
      function(response) {

        if (response && response.records && response.records.length > 0) {
          var CreditScore = response.records[0];

          self.view.creditScoreFieldlabel.text=CreditScore.CurrentCreditScore;
          console.log("CreditScore.CurrentCreditScore",CreditScore.CurrentCreditScore);
          
          self.view.scoreChangeField.text = CreditScore.PreviousCreditScore-CreditScore.CurrentCreditScore
          var CreditChange= 0;
          if (CreditScore.CurrentCreditScore > 0) {
           CreditChange = Math.round(
            (parseFloat(CreditScore.CurrentCreditScore) / 
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
        alert("Failed to fetch LoadAccountDetails details: " + JSON.stringify(error));
      }
    );
  },

});