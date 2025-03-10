define({ 


  viewDetailBtnClicked: function (){
    var self=this;

    self.view.LoadingScreen.flexloading.setVisibility(true);
    kony.timer.schedule("loadingTimer", function() {
      self.view.LoadingScreen.flexloading.setVisibility(false);
      var navObj= new kony.mvc.Navigation("Dashboard/frmaccountOverview");
      navObj.navigate(); 

      kony.timer.cancel("loadingTimer"); 
    }, 3, false); 
  }



});