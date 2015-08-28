/*****************************************************************************/
/* AdminCollectionsNew: Event Handlers */
/*****************************************************************************/
Template.AdminCollectionsNew.events({
});

/*****************************************************************************/
/* AdminCollectionsNew: Helpers */
/*****************************************************************************/
Template.AdminCollectionsNew.helpers({
  collection: function () {
    return Collections;
  },
  images: function () {
    return Images.find();
  },
  urlS: function () {
    return this.url({ store: 'S' })
  }
});

/*****************************************************************************/
/* AdminCollectionsNew: Lifecycle Hooks */
/*****************************************************************************/
Template.AdminCollectionsNew.onCreated(function () {
});

Template.AdminCollectionsNew.onRendered(function () {
  $("select").imagepicker({
    // show_label: true
  });
});

Template.AdminCollectionsNew.onDestroyed(function () {
});
