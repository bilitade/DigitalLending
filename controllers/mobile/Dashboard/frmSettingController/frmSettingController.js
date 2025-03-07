define(['UserSessionManager'], function (UserSessionManager) { 
  return {
    
    onFormPostShow: function() {
      var self = this;
      var presController = kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager()
      .getModule("Lending")
      .presentationController;

      // Call your fetchUserDetails or similar method
      var userDetail= presController.fetchUserDetails();
      console.log("userDetail",userDetail);
     self.populateMainContainer(userDetail);

    },


    populateMainContainer: function(userRecord) {
      var self =this;      
      self.view.phoneLabel.text = userRecord.profile.Primary_Phone || "[]";
      self.view.profileEmailLabel.text = userRecord.id || "N/A";
      self.view.profileUserrnameLabel.text = userRecord.profile.Name || "N/A";
      
    },
    
    onClickSignout: function(){
       var session = UserSessionManager.getInstance();
       var authUser = session.clearSessionData();
      navObj= new kony.mvc.Navigation("Auth/frmLogin");
      navObj.navigate({ authSuccessResponse: " Successfully logged out" });
      
    }

  };
});
