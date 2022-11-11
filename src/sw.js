const CACHE_NAME = 'moviegate-v-1';
const DYNAMIC_CACHE_NAME = 'd-moviegate-v-1';

const whiteSubUrls = [
    '/image',
]

const blackSubUrls = [
    'object=user_avatar',
]

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

this.addEventListener('fetch', async (event) => {
    const { request } = event;

    const url = new URL(request.url);
    console.log(url);
    console.log(url.pathname.match(whiteSubUrls[0]));
    console.log(url.search.match(blackSubUrls[0]))

    if (!url.pathname.match(whiteSubUrls[0]) || url.search.match(blackSubUrls[0])) {
        return false;
    }

    if (request.method !== 'GET') {
        const response = await fetch(request);
        return response;
    }

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) {
        return cached;
    }
    const response = await fetch(request);
    return response;
}

async function networkFirst(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    try {
        const response = await fetch(request);

        await cache.put(request, response.clone());
        return response;
    } catch (e) {
        let cached;
        try {
            cached = await cache.match(request);
        } catch {
            return new Response(null, { status: 404, statusText: 'Not Found' });
        }
        return cached;
    }
}
