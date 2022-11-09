/*const CACHE_NAME = 'moviegate-v-1';
const DYNAMIC_CACHE_NAME = 'd-moviegate-v-1';

const assetUrls = [];

this.addEventListener('install', async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(assetUrls);
});

this.addEventListener('activate', async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames
            .filter((name) => name !== CACHE_NAME)
            .filter((name) => name !== DYNAMIC_CACHE_NAME)
            .map((name) => caches.delete(name)),
    );
});

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then((res) => caches.open(DYNAMIC_CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request.url, res.clone());
                            return res;
                        }));
            }),
    );
});*/
const CACHE_NAME = 'moviegate-v-3';

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

        // undefined или данные из кэша
        return response;
    })());
});
