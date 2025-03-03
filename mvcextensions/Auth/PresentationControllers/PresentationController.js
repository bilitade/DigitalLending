define([], function() {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  PresentationController.prototype.
  initializePresentationController = function() {

  };

  var authManager = kony.mvc.MDAApplication
  .getSharedInstance()
  .getModuleManager()
  .getModule("AuthManager");

  var authBusinessController = authManager.businessController;
  

  PresentationController.prototype.authenticateUser =
    function (username, password) {

    kony.print("Entering Authentication."+
               "PresentationController.authenticateUser");


    var callbacks = {
      "success": this.authSuccessCallback,

      "error": this.authErrorCallback
    };



    authBusinessController.authenticateUser(username, password, callbacks);

    kony.print("Exiting Authentication."+
               "PresentationController.authenticateUser");
  };


  
  PresentationController.prototype.authSuccessCallback = function (response) {
    kony.print("Authentication Success");

    // Ensure user ID is retrieved from store before navigating
    var userid = kony.store.getItem("userid");

    if (!userid) {
      kony.print("Warning: User ID not found in store!");
    } else {
      kony.print("User ID retrieved: " + userid);
    }

    var navigationObject = new kony.mvc.Navigation("frmaccountOverview");
    navigationObject.navigate({
      "authSuccessResponse": response,

      "userid": userid
    });
  };

  

  PresentationController.prototype.authErrorCallback = function (response) {
    kony.print("Authentication Failed");

    var navigationObject = new kony.mvc.Navigation("frmLogin");
    navigationObject.navigate({
      "authErrorResponse": response
    });
  };




  return PresentationController;
});