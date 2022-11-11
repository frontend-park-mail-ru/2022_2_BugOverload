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

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assetUrls);
        })
    )
});

this.addEventListener('fetch', (event) => {
    const { request } = event;
    console.log(request.url);

    const url = new URL(request.url);

    if (request.method !== 'GET') {
        const response = event.waitUntil( fetch(request));
        return response;
    }

    let flag = false;
    whiteDynamicUrls.forEach( (partUrl) => {
        if (url.pathname.match(partUrl)) {
            flag = true;
        }
    });
    blackSearchUrls.forEach( (searchUrl) => {
        if (url.search.match(searchUrl)) {
            flag = false;
        }
    });
    if (!flag) {
        //здесь некэшируемые Get запросы
        console.log(flag);

        event.respondWith(cacheFirst(request));
        return false;
    }

    let exit = cahedOnline.forEach( (partUrl) => {
        if (url.pathname.match(partUrl)) {
            if(navigator.onLine) {
                event.respondWith(networkFirst(request));
            } else {
                event.respondWith(cacheFirst(request));
            }
            return false;
        }
        return true;
    });

    if(!exit) {
        return false;
    }

    event.respondWith(cacheFirst(request), true);
});

async function cacheFirst(request, isCached = false) {
    const cached = await caches.match(request);
    if (cached) {
        console.log('cahcereturn',cached )
        return cached;
    }

    const response = await fetch(request);

    if(isCached) {
        const cache = await caches.open(DYNAMIC_CACHE_NAME);
        console.log('putCache',isCached,navigator.onLine,)
        if(navigator.onLine) {
            console.log('putCache')
            await cache.put(request, response.clone());
        }
    }
    return response;
}

async function networkFirst(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    try {
        const response = await fetch(request);

        if(navigator.onLine) {
            await cache.put(request, response.clone());
            console.log('putCacheNet')
        }

        return response;
    } catch (e) {
        let cached;
        try {
            cached = await cache.match(request);
        } catch {
            return new Response(null, { status: 404, statusText: 'Not Found' });
        }
        console.log('cahcereturn',cached )
        return cached;
    }
}
