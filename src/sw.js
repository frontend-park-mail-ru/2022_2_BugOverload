const CACHE_NAME = 'moviegate-v-1';
const DYNAMIC_CACHE_NAME = 'd-moviegate-v-1';

const whiteDynamicUrls = [
    '/film/',
    '/person/',
    '/profile/',
    '/api/v1/image',
    '/api/v1/collection/popular',
    '/api/v1/collection/in_cinema',
    '/api/v1/recommendation',
];

const blackSearchUrls = [
    '?object=user_avatar&key=avatar',
];

const assetUrls = [];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(assetUrls)),
    );
});

this.addEventListener('fetch', (event) => {
    const { request } = event;

    const url = new URL(request.url);

    if (request.method !== 'GET') {
        const response = event.waitUntil(fetch(request));
        return response;
    }

    if(url.pathname.match(/\d+\/$/)) {
        url.pathname = url.pathname.replace(/\d+\/$/,'');
    }

    if (whiteDynamicUrls.includes(url.pathname) && !blackSearchUrls.includes(url.search)) {
        event.respondWith(networkFirst(request));
    } else {
        event.respondWith(cacheFirst(request));
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

        if (navigator.onLine) {
            await cache.put(request, response.clone());
        }

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
