define(function() {

	return {
      
       homeNavButtonClicked: function(){
        let homenav= new kony.mvc.Navigation('frmaccountOverview');
        homenav.navigate(null);
      },
      payNavButtonClicked: function(){
        let paynav= new kony.mvc.Navigation('frmPayments');
        paynav.navigate(null);
      },
      scoreNavButtonClicked: function(){
        let scorenav= new kony.mvc.Navigation('frmCreditScore');
        scorenav.navigate(null);
      },
      offersButtonClicked: function(){
        let offernav= new kony.mvc.Navigation('frmOffer');
        offernav.navigate(null);
      },
      
       settingButtonClicked: function(){
        let settingnav= new kony.mvc.Navigation('frmSetting');
        settingnav.navigate(null);
      },
      
      
      

	};
});