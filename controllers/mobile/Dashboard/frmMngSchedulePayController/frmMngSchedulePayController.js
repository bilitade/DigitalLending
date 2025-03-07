define(['UserSessionManager'], function (UserSessionManager) { 
  return {
    onFormPreShow: function(){
      var self = this;
      var session = UserSessionManager.getInstance();
      var authUser = session.getUser();
      var toggle= 1;
      if(authUser.profile.Active_Scheduled_Payment === "Yes")
      {
        toggle= 0;
      }
      self.view.schedulePaySwitch.selectedIndex = toggle;


    },
    onScheduleToggle: function(){
       var self = this;
       var toggleValue = self.view.schedulePaySwitch.selectedIndex
       var prompt =  "Are you sure you want to start Scheduled Payment";
       if(toggleValue===1){
         prompt = "Are you sure you want to stop Scheduled Payment";
       }
      var basicConf = {
      
        message: prompt,
        alertType: constants.ALERT_TYPE_CONFIRMATION,
        alertTitle: "Exit Confirmation",
        yesLabel: "Yes",
        noLabel: "Cancel",
        alertHandler: function(response) {
          if (response === true) {
           
           
            console.log("toggleValue",toggleValue);
            if(toggleValue === 0){
              toggleValue="on";

            }
            else {
              toggleValue="off";
            }

            var combinedData = {
              toggleValue: toggleValue,
            };

            var presController = kony.mvc.MDAApplication.getSharedInstance()
            .getModuleManager()
            .getModule("Dashboard")
            .presentationController;
            presController.makeSchedule(combinedData,
                                        function(response) {

              if (response && response.records && response.records.length > 0) {
                var transaction_id = response.records[0];
                combinedData.transaction_id = transaction_id.TransactionReference;
                navObj= new kony.mvc.Navigation("Dashboard/frmLoanPayment");
                navObj.navigate(combinedData);


              } else {
                kony.print("No records found in response.");

              }
            },
                                        function(error) {
              alert("Failed to makeSchedule: " + JSON.stringify(error));
            }
                                       );
          } else {
            // User clicked "Cancel"
            kony.print("User chose to stay.");
          }
        }
      };
      var pspConf = {};
      kony.ui.Alert(basicConf, pspConf);




    },


  };
});