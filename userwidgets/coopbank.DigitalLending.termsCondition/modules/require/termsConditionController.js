define(function() {

  return {
    navigateback: function() {
         var previousForm = kony.application.getPreviousForm();
        if (previousForm) {
            var previousFormId = previousForm.id;
            var navObj = new kony.mvc.Navigation(previousFormId);
            navObj.navigate();
        } else {
            kony.print("No previous form available.");
        }
    
    }
  };
}


      );