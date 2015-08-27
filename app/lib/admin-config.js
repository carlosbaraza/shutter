AdminConfig = {
  name: 'Gallerit',
  adminEmails: ['carlos.baraza@ieee.org'],
  skin: 'black-light',
  dashboard: {
  },
  collections: {
    Items: {},
    Collections: {
      routes: {
        new: {
          waitOn: function () {
            return Meteor.subscribe('images');
          }
        },
        edit: {
          waitOn: function () {
            return Meteor.subscribe('images');
          }
        }
      },
      templates: {
        new: {
          name: 'AdminCollectionsNew'
        }
      }
    }
  }
};
