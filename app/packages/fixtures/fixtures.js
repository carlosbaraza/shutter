// Image files

if (Meteor.isClient) {
  files = {};

  var fixtureNames = ['example.png'];
  fixtureNames.forEach(function setFixture(filename) {
    setFixtureFile(filename);
  });
}

function setFixtureFile(filename) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/packages/fixtures/' + filename + '.png', true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = function(e) {
    if (this.status == 200) {
      var file = new File([this.response], filename, { type: 'image/png' });
      Package.fixtures.files[filename] = file;
    }
  };

  xhr.send();
}


// Users

var createUser = function (userData) {
  var user = Meteor.users.findOne({username: userData.username});

  if (!user) {
    var userId = Accounts.createUser(userData);
    user = Meteor.users.findOne(userId);
  }

  return user;
};

var createDefaultUser = function () {
  var user = createUser({
    email: 'test@test.com',
    password: 'test',
    username: 'test'
  });

  return user;
};

var createDefaultAdminUser = function () {
  var user = createUser({
    email: 'admin@admin.com',
    password: 'admin',
    username: 'admin'
  });

  Roles.addUsersToRoles(user._id, 'admin', Roles.GLOBAL_GROUP);

  return user;
};

Meteor.methods({
  'fixtures/users/create': createUser,
  'fixtures/users/createDefault': createDefaultUser,
  'fixtures/users/createDefaultAdmin': createDefaultAdminUser
});
