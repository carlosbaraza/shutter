Package.describe({
  name: 'fixtures',
  version: '0.0.1',
  summary: 'Fixtures for the application tests',
  documentation: 'README.md',
  debugOnly: true,
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.addFiles('database-reset.js', 'server');
  api.addFiles('fixtures.js');
  api.export('files');
  api.addFiles('example.png', 'client', {asset: true});
});
