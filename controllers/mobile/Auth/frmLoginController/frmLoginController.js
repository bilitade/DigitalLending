define({
  onLoginBtnClick: function() {
    var basicConfig = {
      message: "Invalid Credentials",
      alertTitle: "Login",
      alertType: constants.ALERT_TYPE_ERROR,
      yesLabel: "OK"
    };

    let email = this.view.emailTextBox.text;
    let password = this.view.passwordTextBox.text;

    if (email && password) {
      
       var authModule = kony.mvc.MDAApplication
                                 .getSharedInstance()
                                 .getModuleManager()
                                 .getModule("Auth");

        var authPresentationController = authModule.presentationController;

        authPresentationController.authenticateUser(email, password);
   
      
      
      
    } else {
      kony.ui.Alert(basicConfig, {});
    }
  }
});