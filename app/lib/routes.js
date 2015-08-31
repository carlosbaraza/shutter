Router.onBeforeAction(function() {
  BodyClass.run();
  this.next();
});

Router.onStop(function() {
  BodyClass.cleanup();
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client',
  waitOn: function () {
    return [
      Meteor.subscribe('images'),
      Meteor.subscribe('items')
    ];
  }
});
