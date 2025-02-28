define([], function () {
    function PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }
    
    inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);
    
    PresentationController.prototype.initializePresentationController = function () {
        kony.print("PresentationController initialized");
    };
    
    // Now fetchUserDetails accepts success and error callbacks
    PresentationController.prototype.fetchUserDetails = function (successCallback, errorCallback) {
        kony.print("Entering PresentationController.fetchUserDetails");
    
        // Get the callbacks from this method’s parameters
        var lendingModule = kony.mvc.MDAApplication.getSharedInstance()
                              .getModuleManager()
                              .getModule("LendingManager"); // Ensure this is the correct module name
        var businessController = lendingModule.businessController;
    
        if (!businessController) {
            kony.print("BusinessController is not initialized.");
            return;
        }
    
        // Call the business controller and pass the callbacks
        businessController.fetchUserDetails(
            function (response) {
                kony.print("fetchUserDetails Success");
                // Directly call the success callback provided by the Form Controller
                if (successCallback && typeof successCallback === "function") {
                    successCallback(response);
                }
            },
            function (error) {
                kony.print("fetchUserDetails Failed: " + JSON.stringify(error));
                if (errorCallback && typeof errorCallback === "function") {
                    errorCallback(error);
                }
            }
        );
    
        kony.print("Exiting PresentationController.fetchUserDetails");
    };
    
    return PresentationController;
});
