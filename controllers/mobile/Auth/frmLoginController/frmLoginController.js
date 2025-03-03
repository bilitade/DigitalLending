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
      kony.ui.Alert({
        message: "Login credentials are correct!",
        alertTitle: "Login",
        alertType: constants.ALERT_TYPE_INFO,
        yesLabel: "OK"
      }, {});
    } else {
      kony.ui.Alert(basicConfig, {});
    }
  }
});