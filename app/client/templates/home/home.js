/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
  images: function () {
    return Images.find();
  },
  imageDataSize: function () {
    try {
      var ratio = this.metadata.height / this.metadata.width;
      if (ratio) return '1024x' + 1024 * ratio;
      throw "Wrong ratio";
    } catch(error) {
      return '1024x1024';
    }
  }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.onCreated(function () {
});

Template.Home.onRendered(function () {
  var backgroundImageUrl = Images.findOne().url({ store: 'L' });
  $('header').css('backgroundImage', "url(" + backgroundImageUrl + ")");

  initPortfolioGallery();
});

Template.Home.onDestroyed(function () {
});

/*****************************************************************************/
/* Home: Hoisted functions */
/*****************************************************************************/

function initPortfolioGallery() {
  var $gallery = $('#portfolio .gallery');
  $gallery.imagesLoaded(function startPackery() {
    $gallery.packery({
      itemSelector: 'figure'
    });
  });

  initPhotoSwipeFromDOM('#portfolio .gallery');
}

function initPhotoSwipeFromDOM(gallerySelector) {
  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll( gallerySelector );

  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoSwipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }

  // Find nearest parent element
  function closest(el, fn) {
    return el && ( fn(el) ? el : closest(el.parentNode, fn) );
  };

  // Triggers when user clicks on thumbnail
  function onThumbnailsClick(e) {
    handleClickEvent()

    var clickedListItem = findRootElementOfSlide();
    if(!clickedListItem) { return; }

    var clickedGallery = clickedListItem.parentNode;
    var index = findIndexClickedItem();
    if(index >= 0) { openPhotoSwipe( index, clickedGallery ); }

    return false;

    function handleClickEvent() {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }

    function findRootElementOfSlide() {
      var eTarget = e.target || e.srcElement;

      return closest(eTarget, function(el) {
        return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
      });
    }

    function findIndexClickedItem() {
      var childNodes = clickedListItem.parentNode.childNodes,
          numChildNodes = childNodes.length,
          nodeIndex = 0,
          index;

      for (var i = 0; i < numChildNodes; i++) {
        if(childNodes[i].nodeType !== 1) { continue }
        if(childNodes[i] === clickedListItem) { index = nodeIndex; break; }
        nodeIndex++;
      }
      return index;
    }
  };

  // Parse picture index and gallery index from URL (#&pid=1&gid=2)
  function photoSwipeParseHash() {
    var hash = window.location.hash.substring(1),
        params = {};
    if (!hash.length < 5) parseHash();
    return params;

    function parseHash() {
      var args = hash.split('&');

      for (var i = 0; i < args.length; i++) {
        if (!args[i]) continue;
        var pair = args[i].split('=');
        if (pair.length < 2) continue;
        params[pair[0]] = pair[1];
      }
      if (params.gid) params.gid = parseInt(params.gid, 10);
    }
  };

  function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
        items = parseThumbnailElements(galleryElement),
        options,
        gallery;

    setOptions();

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();

    function setOptions() {
      options = {
        // define gallery index (for URL)
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

        getThumbBoundsFn: function getThumbBoundsFn(index) {
          var thumbnail = items[index].el.getElementsByTagName('img')[0],
              pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
              rect = thumbnail.getBoundingClientRect();

          return { x:rect.left, y:rect.top + pageYScroll, w:rect.width };
        }
      };

      setOptionsIndex();

      // exit if index not found
      if ( isNaN(options.index) ) return;
      if (disableAnimation) options.showAnimationDuration = 0;

      function setOptionsIndex() {
        // PhotoSwipe opened from URL
        if (fromURL) {
          if (options.galleryPIDs) {
            // parse real index when custom PIDs are used
            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
            for (var j = 0; j < items.length; j++) {
              if (items[j].pid == index) {
                options.index = j;
                break;
              }
            }
          } else {
            // in URL indexes start from 1
            options.index = parseInt(index, 10) - 1;
          }
        } else {
          options.index = parseInt(index, 10);
        }
      }
    }

    // Parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    function parseThumbnailElements(el) {
      var thumbElements = el.childNodes,
          numNodes = thumbElements.length,
          items = [],
          figureEl,
          linkEl,
          size,
          item;

      for (var i = 0; i < numNodes; i++) {
        figureEl = thumbElements[i]; // <figure> element
        if (figureEl.nodeType !== 1) continue; // include only element nodes
        linkEl = figureEl.children[0]; // <a> element

        size = linkEl.getAttribute('data-size').split('x');

        // create slide object
        item = {
          src: linkEl.getAttribute('href'),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };

        if (figureEl.children.length > 1) {
          // <figcaption> content
          item.title = figureEl.children[1].innerHTML;
        }

        if (linkEl.children.length > 0) {
          // <img> thumbnail element, retrieving thumbnail url
          item.msrc = linkEl.children[0].getAttribute('src');
        }

        item.el = figureEl; // save link to element for getThumbBoundsFn
        items.push(item);
      }

      return items;
    };
  };
};
