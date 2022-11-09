const CACHE_NAME = 'moviegate-v-1';
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
                            event.waitUntil(cache.put(event.request.url, res.clone()));
                            return res;
                        }));
            }),
    );
});
