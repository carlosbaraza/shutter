Posts = new Meteor.Collection('posts');

Schemas.Posts = new SimpleSchema({
  image: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        label: 'Choose file'
      }
    }
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
    label: 'Date',
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

Posts.attachSchema(Schemas.Posts)
