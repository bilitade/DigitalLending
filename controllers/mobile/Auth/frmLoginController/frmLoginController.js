define({


  onNavigate(params){

    if ( params && params.authErrorResponse){

      alert("Login Failed"+ JSON.stringify( params.authErrorResponse));

    }
    else if ( params && params.authSuccessResponse) { 
      alert(JSON.stringify( params.authSuccessResponse));

    }
  },

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