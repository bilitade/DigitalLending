define({ 

onAcceptButtonClicked: function(){
    
    navObj= new kony.mvc.Navigation("Lending/frmLoanApproved");
    navObj.navigate(null);
    
    
  },
  
  onFormPreShow: function() {
            var self = this;
            var presController = kony.mvc.MDAApplication.getSharedInstance()
                .getModuleManager()
                .getModule("Lending")
                .presentationController;
            var CustomerId = kony.store.getItem("customer_id");


            // Call your fetchUserDetails or similar method
            presController.fetchLoanDetails(CustomerId,
                function(response) {
                    // Assume response.records[0] contains the user info
                  console.log("response2",response);
                    if (response && response.records && response.records.length > 0) {
                        var loanRecord = response.records[0];
                      
                        
                    } else {
                        kony.print("No records found in response.");
                    }
                },
                function(error) {
                    alert("Failed to fetch Loan details: " + JSON.stringify(error));
                }
            );
        },


 });