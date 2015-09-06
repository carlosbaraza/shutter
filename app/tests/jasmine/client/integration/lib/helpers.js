/* globals
 deferAfterFlush: true,
 resetTestingEnvironment: true,
 createDefaultTeam: true,
 createDefaultUser: true,
 loginWithDefaultUser: true,
 waitForRouter: true,
 goToRoute: true,
 goToDefaultTeamPage: true
 */

// You can call this helper functions with:
// `beforeEach(<Helper function name>);`
// E.g. `beforeEach(createDefaultOrganization);`

var createMethodResultHandler = function (done, hook) {
  return function (error, result) {
    if (error) {
      console.error(error);
    }
    if (hook) {
      hook(error, result);
    }
    done(error, result);
  };
};

deferAfterFlush = function (callback) {
  Tracker.afterFlush(function () {
    Meteor.defer(callback);
  });
};

resetTestingEnvironment = function (done) {
  Meteor.call('clearDB', createMethodResultHandler(done));
};


// Users

createDefaultUser = function (done) {
  var self = this;

  Meteor.call(
    'fixtures/users/createDefault',
    createMethodResultHandler(done, function (error, user) {
      self.user = user;
    })
  );
};

createDefaultAdminUser = function (done) {
  var self = this;

  Meteor.call(
    'fixtures/users/createDefaultAdmin',
    createMethodResultHandler(done, function (error, user) {
      self.user = user;
    })
  );
};

loginWithDefaultUser = function (done) {
  Meteor.loginWithPassword(
    'test',
    'test',
    createMethodResultHandler(done)
  );
};

loginWithDefaultAdminUser = function (done) {
  Meteor.loginWithPassword(
    'admin',
    'admin',
    createMethodResultHandler(done)
  );
};


// Router

waitForRouter = function (done) {
  Tracker.autorun(function (computation) {
    if (FlowRouter.subsReady()) {
      computation.stop();
      deferAfterFlush(done);
    }
  });
};

goToRoute = function (pathDef, params, queryParams) {
  return function (done) {
    queryParams = queryParams || {};
    queryParams.jasmine = true;
    FlowRouter.go(pathDef, params, queryParams);
    waitForRouter(done);
  };
};
