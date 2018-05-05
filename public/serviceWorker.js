const staticAssets = [
    './',
    './login',
    './manifest.json',
    '/dist/app.css',
    '/bower_components/bootstrap/dist/css/bootstrap.min.css',
    '/bower_components/font-awesome/css/font-awesome.min.css',
    '/dist/expandedPatch.svg',
    '/dist/GSHPD-patch.png',
    '/dist/bundle.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('xcite').then(cache => {
      return cache.addAll(staticAssets);
    })
  );
});
