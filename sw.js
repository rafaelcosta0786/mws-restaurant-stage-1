// Cache Definition
let staticCacheName = 'mws-restaurant-rcosta-v1';

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                'index.html',
                'restaurant.html',
                '/css/device.css',
                '/css/styles.css',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/register.js',
                '/js/restaurant_info.js',
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
                        cacheName != staticCacheName;
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
                                            caches.open(staticCacheName)
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
