const CACHE_NAME = 'moviegate-v-2';
const DYNAMIC_CACHE_NAME = 'd-moviegate-v-2';

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
    /object=user_avatar/,
    /user\/\d+/,
];

const assetUrls = [];

this.addEventListener('activate', (event) => {
    const expectedCacheNames = Object.keys(CACHE_NAME).map((key) => CACHE_NAME[key]);
    // Delete out of date cahes
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (expectedCacheNames.indexOf(cacheName) == -1) {
                    console.log('Deleting out of date cache:', cacheName);
                    return caches.delete(cacheName);
                }
            }),
        )),
    );
});

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(assetUrls)),
    );
});

this.addEventListener('fetch', (event) => {
    const { request } = event;

    const url = new URL(request.url);

    if (request.method !== 'GET') {
        return false;
    }

    if (url.pathname.match(/\d+\/$/)) {
        url.pathname = url.pathname.replace(/\d+\/$/, '');
    }

    if (
        whiteDynamicUrls.includes(url.pathname)
        && !url.search.match(blackSearchUrls[0])
        && !url.pathname.match(blackSearchUrls[1])
    ) {
        event.respondWith(networkFirst(request));
    } else {
        event.respondWith(cacheFirst(request, url.search.match(blackSearchUrls[0])));
    }

    return true;
});

async function cacheFirst(request, watchCache = false) {
    if (!watchCache) {
        const cached = await caches.match(request);
        if (cached) {
            return cached;
        }
    }

    let response;

    try {
        response = await fetch(request);
    } catch (e) {
        return;
    }

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
