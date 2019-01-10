// Cache Definition
let cacheName = 'mws-restaurant-rcosta-';
const randomId = Math.floor(Math.random() * 30000);
cacheName += randomId;

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll([
                'index.html',
                'restaurant.html',
                '/css/',
                '/js/',
                '/img/',
            ]);
        }));
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('mws-restaurant-rcosta-') &&
                        cacheName != cacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch',
    function (event) {
        event.respondWith
            (
                caches.match(event.request)
                    .then
                    (
                        function (response) {
                            if (response !== undefined) {
                                return response;
                            }
                            else {
                                return fetch(event.request).then
                                    (
                                        function (response) {
                                            let responseClone = response.clone();
                                            caches.open(cacheName)
                                                .then(
                                                    function (cache) {
                                                        cache.put(event.request, responseClone);
                                                    }
                                                );
                                            return response;
                                        }
                                    );
                            }
                        }
                    )

            );

    }
);
