const CACHE_NAME = 'moviegate-v-1';
const DYNAMIC_CACHE_NAME = 'd-moviegate-v-1';

const assetUrls = [];

this.addEventListener('install', async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(assetUrls);
});

this.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') {
        return (
            async () => {
                await fetch(request);
            })();
    }

    const url = new URL(request.url);
    if (url.origin === window.location.origin) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }
    return null;
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    return cached || fetch(request);
}

async function networkFirst(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone());
        return response;
    } catch (e) {
        const cached = await cache.match(request);
        return cached;
    }
}
