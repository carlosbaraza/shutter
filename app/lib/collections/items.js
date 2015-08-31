Items = new Meteor.Collection('items');

Schemas.Items = new SimpleSchema({
  imageId: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        label: 'Choose file'
      }
    }
  },
  isCover: {
    type: Boolean
  },
  title: {
    type: String,
    label: 'Title *',
    max: 60
  },
  content: {
    type: String,
    label: 'Content/Description',
    autoform: {
      rows: 5
    },
    optional: true
  },
  createdAt: {
    label: 'Created at (If left blank, it will be current moment)',
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      type: 'select',
      options: function () {
        return _.map(Meteor.users.find().fetch(), function (user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  }
});

Items.attachSchema(Schemas.Items);

// Hooks

Items.before.remove(function beforeRemoveItem(userId, doc) {
  Images.remove(doc.imageId);
});

// Helpers

Items.helpers({
  image: function getImage() {
    return Images.findOne(this.imageId);
  },
  imageName: function imageName() {
    var image = this.image();
    if (image) return image.name();
  }
});
