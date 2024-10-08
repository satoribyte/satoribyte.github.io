// service-worker.js
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/index.html',
                '/global.css',
                './icon.ico',
                'tailwindscss.js',
                'backsound.ogg',
                'herobg.avif',
                'firacode.ttf',
                'roboto.ttf'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
