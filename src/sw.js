const CACHE_NAME = 'moviegate-v-1';
const DYNAMIC_CACHE_NAME = 'd-moviegate-v-1';

const whiteDynamicUrls = [
    '/image',
    '/collection',
    '/recommendation',
]

const cahedOnline = [
    '/recommendation',
]

const blackSearchUrls = [
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

this.addEventListener('fetch', (event) => {
    const { request } = event;
    console.log(request.url);

    const url = new URL(request.url);
    console.log(url);

    if (request.method !== 'GET') {
        const response = fetch(request);
        return response;
    }

    let flag = false;
    whiteDynamicUrls.forEach( (partUrl) => {
        console.log(url.pathname.match(partUrl));
        if (!url.pathname.match(partUrl)) {
            console.log(url.pathname.match(partUrl));
            flag = true;
        }
    });
    blackSearchUrls.forEach( (searchUrl) => {
        console.log(url.search.match(searchUrl))
        if (url.search.match(searchUrl)) {
            console.log(url.search.match(searchUrl))
            flag = true;
        }
    });
    if (flag) {
        event.respondWith(networkFirst(request, false));
        return false;
    }

    cahedOnline.forEach( (partUrl) => {
        console.log(url.pathname.match(partUrl))
        if (url.pathname.match(partUrl)) {
            if(navigator.onLine) {
                event.respondWith(networkFirst(request));
            } else {
                event.respondWith(cacheFirst(request));
            }
            return false;
        }
    });

    const cached = caches.match(request);
    if (cached) {
        event.respondWith(cached);
        return false;
    }
    event.respondWith(networkFirst(request));
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) {
        return cached;
    }
    const response = await fetch(request);
    return response;
}

async function networkFirst(request, isCached = true) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    try {
        if(!isCached) {
            const cached = await caches.match(request);
            return cached;
        }
        const response = await fetch(request);

        if(isCached) {
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
