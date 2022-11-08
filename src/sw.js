const CACHE_NAME = 'moviegate-v-3';
const DYNAMIC_CACHE_NAME = 'd-moviegate-v-3';

const assetUrls = [];

self.addEventListener('install', async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(assetUrls);
});

self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET') {
        return (
            async () => {
            await fetch(request);
        })();
    }

    const url = new URL(request.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }
})


async function cacheFirst(request) {
    const cached = await caches.match(request);
    return cached ?? await fetch(request);
}

async function networkFirst(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone());
        return response;
    } catch (e) {
        const cached = await cache.match(request);
        return cached ?? await caches.match('/offline.html');
    }
}
