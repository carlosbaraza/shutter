AdminConfig = {
  name: 'Gallerit',
  adminEmails: ['carlos.baraza@ieee.org'],
  skin: 'black-light',
  dashboard: {
  },
  collections: {
    Items: {
      routes: {
        view: { waitOn: subscribeImages },
        new: { waitOn: subscribeImages },
        edit: { waitOn: subscribeImages }
      },
      tableColumns: [
        { label: 'ID', name: '_id' },
        { label: 'Image name', name: 'imageName()' },
        { label: 'Is cover image', name: 'isCover' }
      ],
      extraFields: ['imageId']
    },
    Collections: {
      routes: {
        new: { waitOn: subscribeImages },
        edit: { waitOn: subscribeImages }
      },
      templates: {
        new: {
          name: 'AdminCollectionsNew'
        }
      }
    }
  }
};

function subscribeImages() {
  return Meteor.subscribe('images');
}
