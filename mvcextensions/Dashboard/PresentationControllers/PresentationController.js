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
    PresentationController.prototype.initializePresentationController = function() {
        
    };
     PresentationController.prototype.fetchLoanAccount = function (successCallback, errorCallback) {
        kony.print("Entering PresentationController.fetchLoanAccount");
    
        // Get the callbacks from this method’s parameters
        var DashboardModule = kony.mvc.MDAApplication.getSharedInstance()
                              .getModuleManager()
                              .getModule("DashBoardManager"); // Ensure this is the correct module name
        var businessController = DashboardModule.businessController;
    
        if (!businessController) {
            kony.print("BusinessController is not initialized.");
            return;
        }
    
        // Call the business controller and pass the callbacks
        businessController.fetchLoanAccount(
            function (response) {
                kony.print("fetchLoanAccount Success");
                if (successCallback && typeof successCallback === "function") {
                    successCallback(response);
                }
            },
            function (error) {
                kony.print("fetchLoanDetails Failed: " + JSON.stringify(error));
                if (errorCallback && typeof errorCallback === "function") {
                    errorCallback(error);
                }
            }
        );
    
        kony.print("Exiting PresentationController.fetchLoanAccount");
    };
    return PresentationController;
});