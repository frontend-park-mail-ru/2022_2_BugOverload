const CACHE_NAME = 'moviegate-1';

const whiteDynamicUrls = [
    '/api/v1/image',
    '/api/v1/collection/popular',
    '/api/v1/collection/in_cinema',
    '/api/v1/recommendation',
    '/api/v1/premieres',
];

const blackSearchUrls = /object=user_avatar|user\/\d+/;

const assetUrls = [];

const cachedReg = /\/api|(.png|.ttf|.woff2|.js|.css|\/)$/

this.addEventListener('activate', (event) => {
    const expectedCacheNames = Object.keys(CACHE_NAME).map((key) => CACHE_NAME[key]);

    // Delete out of date cahes
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (expectedCacheNames.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
                return null;
            }),
        )),
    );

    event.waitUntil(clients.claim());
});

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(assetUrls)),
    )
    this.skipWaiting();
});

this.addEventListener('fetch', (event) => {
    const { request } = event;

    const url = new URL(request.url);
    if (event.request.method !== 'GET' || !cachedReg.test(url.pathname) || blackSearchUrls.test(url.search)) {
        return;
    }

    event.respondWith(networkFirst(request, (/\/$/).test(url.pathname)));
});

async function networkFirst(request, html) {
    const cache = await caches.open(CACHE_NAME);
    try {
        const response = await fetch(request);


        await cache.put(html? '/': request, response.clone());

        return response;
    } catch (e) {
        let cached;
        try {
            cached = await cache.match(html? '/': request);
        } catch {
            return new Response(null, { status: 404, statusText: 'Not Found' });
        }
        return cached;
    }
}
