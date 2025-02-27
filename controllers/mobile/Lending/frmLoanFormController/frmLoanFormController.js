define({ 

 onNavigate:function(params){
   
   params.username
   
 }
  
  onContinueButtonClicked: function(){
    
    navObj= new kony.mvc.Navigation("Lending/frmLoanCheck");
    navObj.navigate(null);
    
    
  }
  

 });