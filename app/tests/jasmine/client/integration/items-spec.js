
describe('Items', function () {
  describe('creation', function () {
    beforeEach(function loadUserPage() {
      Router.go('/admin/items/new');
    });

    describe('when admin', function () {
      var itemId, imageId;
      beforeEach(loginWithDefaultAdminUser);

      it('can upload a new image', function (done) {
        image = Images.insert(Package.fixtures.files['example.png']);
        expect(Images.find().count()).toEqual(1);

        item = Items.insert({
          title: 'MyTitle',
          owner: Meteor.userId(),
          imageId: image._id,
          isCover: true
        }, function expectation(error, itemId) {
          expect(error).toEqual(undefined);
          done();
        });
      });
    });
  });
});
