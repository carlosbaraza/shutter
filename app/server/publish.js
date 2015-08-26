// All the publications are declared here.

// Images
Meteor.publish('images', function () {
  return Images.find();
});
