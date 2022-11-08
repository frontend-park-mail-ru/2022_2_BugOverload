const CACHE_NAME = 'moviegate-v-5';
const DYNAMIC_CACHE_NAME = 'd-moviegate-v-5'

const assetUrls = [];

this.addEventListener('install', async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(assetUrls);
});

/*this.addEventListener('activate', async event => {
    const cacheNames = await caches.keys()
    await Promise.all(
        cacheNames
            .filter(name => name !== CACHE_NAME)
            .filter(name => name !== DYNAMIC_CACHE_NAM)
            .map(name => caches.delete(name))
    )
});*/

/*
this.addEventListener('fetch', (event) => {
    const { request } = event;

    event.respondWith((async () => {
        if (navigator.onLine) {
            console.log(request)
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
});*/

this.addEventListener('fetch', event => {
    const { request } = event

    const url = new URL(request.url)
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request))
    } else {
        event.respondWith(networkFirst(request))
    }
})


async function cacheFirst(request) {
    const cached = await caches.match(request)
    return cached ?? await fetch(request)
}

async function networkFirst(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    try {
        const response = await fetch(request)
        await cache.put(request, response.clone())
        return response
    } catch (e) {
        const cached = await cache.match(request)
        return cached ?? await caches.match('/offline.html')
    }
}
