const CACHE_NAME = 'moviegate-v-1';

const assetUrls = [];

this.addEventListener('install', async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(assetUrls);
});

this.addEventListener('fetch', (event) => {
    const { request } = event;

    event.respondWith((async () => {
        if (navigator.onLine) {
            const response = await fetch(request);
            if (request.method !== 'GET') {
                return response;
            }

            const clone = response.clone();
            caches.open(CACHE_NAME)
                .then((cache) => {
                    cache.put(request, clone);
                });
            return response;
        }

        const response = await caches.match(request);
        return response || caches.match('/offline.html');
    })());
});
