

define([], function() {
  return {
    onContinueButtonClicked: function(){

      var self =this;
      if(self.view.agreetoTermsCheckBox.selectedKeyValues === null){
        self.showToast("Please read and accept the terms and agreement first");

      }
      else{
        navObj= new kony.mvc.Navigation("Lending/frmLoanCheck");
        navObj.navigate(null);
      }





    },
    onuploadclicked:function(){

      try {
        // Define query context for selecting only images
        var queryContext = { mimeType: ["image/*"] };

        // Open the media gallery to select an image
        kony.phone.openMediaGallery(
          function onSuccess(selectedMedia) {
            if (selectedMedia && selectedMedia.rawBytes) {
              alert("Image Selected: " + selectedMedia.fileName);

              // Convert the selected image to Base64 if needed
              var base64String = kony.convertToBase64(selectedMedia.rawBytes);
              alert("Base64 Image: " + base64String.substring(0, 50) + "..."); // Show first 50 chars
            }
          },
          function onFailure(error) {
            alert("Error: " + JSON.stringify(error));
          },
          queryContext // Pass the query context properly
        );
      } catch (e) {
        alert("Exception: " + e.message);
      }




    },
    onFormPreShow: function() {
      var self = this;
      var presController = kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager()
      .getModule("Lending")
      .presentationController;

      var userDetail= presController.fetchUserDetails();
      self.populateMainContainer(userDetail.profile);

    },

    showToast: function(message) {
      var toast = new kony.ui.Toast({
        text: message,
        duration: constants.TOAST_LENGTH_SHORT
      });
      toast.show();
    },
    populateMainContainer: function(userRecord) {
      var self =this;
      var primaryAddress = userRecord.Primary_Address || "{}";
      var All_Addresses = userRecord.All_Addresses || "{}";
      var allPhones = userRecord.All_Phones || "[]";
      var bankAccounts = userRecord.Bank_Accounts || "[]";
      console.log("userRecord",userRecord);
      self.view.nameFiledLabel.text = userRecord.Name || "N/A";
      self.view.phoneFieldLabel.text = userRecord.Primary_Phone || "N/A";
      self.view.emailFieldTextLabel.text = userRecord.Email || "N/A";
      self.view.cityFieldLabel.text = primaryAddress.city || "N/A";
      self.view.subcityFieldLabel.text = All_Addresses.subcity || "N/A";
      self.view.woredaFieldLabel.text = All_Addresses[0].street || "N/A";
      
    
       var formattedData = bankAccounts.map(function(item) {
        return {
            "accountList": item.account_type + " - " + item.account_number || "N/A",   
                              
        };
    });
    self.view.AccSegment.setData(formattedData);
      kony.print("mainContainer updated successfully with user data.");
    }

  };
});
