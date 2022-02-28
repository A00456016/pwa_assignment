self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('my-cache-name-02')
            .then(function (cache) {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/script.js'
                ])
            })
    );
    return self.clients.claim();
});

self.addEventListener('activate', function (event) {
    console.log('Service worker activated', event);
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (res) {
                return res;
            })
    );
});
