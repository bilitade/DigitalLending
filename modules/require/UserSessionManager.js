define('UserSessionManager', [], function () {
  var instance = null;  // Singleton instance

  // Private constructor
  function UserSessionManager() {
    if (instance) {
      return instance;  // Prevent creating multiple instances
    }
    this.user = {
      id: null,
      profile: null
    };
    instance = this;  // Set the instance to the newly created object
  }

  // Get the Singleton Instance
  UserSessionManager.getInstance = function () {
    if (instance === null) {
      instance = new UserSessionManager();
    }
    return instance;
  };

  // Setters for user data
  UserSessionManager.prototype.setAuthUser = function (user) {
    this.user = {
      id: (user && user.id) ? user.id : this.user.id,
      profile: (user && user.profile) ? user.profile : this.user.profile
    };
  };

  // Getter methods to retrieve user data
  UserSessionManager.prototype.getUser = function () {
    return this.user;
  };

  // Method to clear session data
  UserSessionManager.prototype.clearSessionData = function () {
    this.user = {
      id: null,
      profile: null
    };
  };

  return UserSessionManager;
});
