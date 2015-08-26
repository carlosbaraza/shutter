
Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client',
  waitOn: function () {
    return Meteor.subscribe('images');
  }
});
