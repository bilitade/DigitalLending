define(function() {
    return {
        ontermconditionCLick: function() {
            var navObj=new kony.mvc.Navigation('Lending/frmTermsCondition');
             navObj.navigate();
        },
      onprivacyClick: function(){
        
          var navObj=new kony.mvc.Navigation('Lending/frmPrivacyPolicy');
             navObj.navigate();
      },
      
      onContactUSClick: function(){
        
         var navObj=new kony.mvc.Navigation('Lending/frmContactUs');
             navObj.navigate();
        
      }
    };
});