define(['UserSessionManager'], function(UserSessionManager) {
  var session = UserSessionManager.getInstance();

  function PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

  PresentationController.prototype.initializePresentationController = function() {};

  var authBusinessController = kony.mvc.MDAApplication
  .getSharedInstance()
  .getModuleManager()
  .getModule("AuthManager")
  .businessController;

  PresentationController.prototype.authenticateUser = function(username, password) {
    kony.print("Entering PresentationController.authenticateUser");

    authBusinessController.authenticateUser(username, password, {
      success: this.authSuccessCallback,
      error: this.authErrorCallback
    });
    kony.print("Exiting PresentationController.authenticateUser");
  };

  PresentationController.prototype.authSuccessCallback = function(response) {
    kony.print("Authentication Success");

    var user = session.getUser();
    var navBacktoLogin = new kony.mvc.Navigation("frmLogin");
    var navtoGetLoan = new kony.mvc.Navigation("frmLoanHome");
    var navtoAccountReview = new kony.mvc.Navigation("frmaccountOverview");

    if (!user || !user.id) {
      navBacktoLogin.navigate({ authErrorResponse: "Invalid session" });
      kony.print("Warning: User ID not found in session");
      return;
    }

    if (!user.profile) {
      navBacktoLogin.navigate({ authErrorResponse: "User profile not found" });
      return;
    }
    var getform= kony.application.getCurrentForm();
    if (user.profile.Active_Loan) {
      getform.LoadingScreen.flexloading.setVisibility(true);
      kony.timer.schedule("loadingTimer", function() {
        getform.LoadingScreen.flexloading.setVisibility(false);
        navtoAccountReview.navigate();
        kony.timer.cancel("loadingTimer"); 
      }, 1, false); 


    } else {
      getform.LoadingScreen.flexloading.setVisibility(true);
      kony.timer.schedule("loadingTimer", function() {
        getform.LoadingScreen.flexloading.setVisibility(false);
        navtoGetLoan.navigate();
        kony.timer.cancel("loadingTimer"); 
      }, 1, false); 

    }

    kony.print("User ID retrieved: " + user.id);
  };

  PresentationController.prototype.authErrorCallback = function(response) {
    kony.print("Authentication Failed");
    var navigationObject = new kony.mvc.Navigation("frmLogin");
    navigationObject.navigate({ authErrorResponse: response });
  };

  return PresentationController;
});
