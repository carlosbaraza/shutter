var createThumb = function (fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('100', '100').stream().pipe(writeStream);
};

var createS = function (fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('240', '240').stream().pipe(writeStream);
};

var createM = function (fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('800', '800').stream().pipe(writeStream);
};

var createL = function (fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('1600', '1600').stream().pipe(writeStream);
};

Images = new FS.Collection('images', {
  stores: [
    new FS.Store.FileSystem("thumb", {
      transformWrite: createThumb,
      path: '~/tmp/uploads/images/thumb'
    }),
    new FS.Store.FileSystem("S", {
      transformWrite: createS,
      path: '~/tmp/uploads/images/S'
    }),
    new FS.Store.FileSystem("M", {
      transformWrite: createM,
      path: '~/tmp/uploads/images/M'
    }),
    new FS.Store.FileSystem("L", {
      transformWrite: createL,
      path: '~/tmp/uploads/images/L'
    }),
    new FS.Store.FileSystem('images', {
      path: '~/tmp/uploads/images/orig'
    })
  ],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
    }
  }
});
