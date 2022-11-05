const CACHE_NAME = 'moviegate-v-1';

const assetUrls = ['02b236eda8f21d7abde0.eot', '2a92491841121db3bded.woff2', '32729db711a4593681ac.woff', '5d7e08c2b3c5dc65e9ef.woff2', '66344f727541a750ea56.woff2', '663e6b67cdf048525861.woff', '7099e6e4b40044714441.png', '86b3d1767790e6bcef1b.eot', '8d6d971731acd7e42d5a.png', '9150e214ac10c4bab263.woff', '9389f113b5fd9bed636d.woff2', '99c02586fb46ca3232a6.eot', '9e2cb8460bc1bd00a1a0.eot', 'android-chrome-192x192.png', 'android-chrome-512x512.png', 'app.d8759317a352068ac08c.js', 'app.d8a1234e09a79d857600.css', 'apple-touch-icon.png', 'arrow-drop.png', 'assets/img/actor_photos/KBeil.png', 'assets/img/auth/login.png', 'assets/img/auth/signup.png', 'assets/img/films_hor/trueDetective.jpg', 'assets/img/posters/1.png', 'assets/img/posters/10.png', 'assets/img/posters/11.png', 'assets/img/posters/12.png', 'assets/img/posters/13.png', 'assets/img/posters/14.png', 'assets/img/posters/15.png', 'assets/img/posters/16.png', 'assets/img/posters/17.png', 'assets/img/posters/18.png', 'assets/img/posters/19.png', 'assets/img/posters/2.png', 'assets/img/posters/20.png', 'assets/img/posters/21.png', 'assets/img/posters/22.png', 'assets/img/posters/23.png', 'assets/img/posters/24.png', 'assets/img/posters/25.png', 'assets/img/posters/26.png', 'assets/img/posters/27.png', 'assets/img/posters/28.png', 'assets/img/posters/29.png', 'assets/img/posters/3.png', 'assets/img/posters/30.png', 'assets/img/posters/31.png', 'assets/img/posters/32.png', 'assets/img/posters/33.png', 'assets/img/posters/34.png', 'assets/img/posters/4.png', 'assets/img/posters/5.png', 'assets/img/posters/6.png', 'assets/img/posters/7.png', 'assets/img/posters/8.png', 'assets/img/posters/9.png', 'assets/img/posters/dune_poster.jpg', 'assets/img/previews/dune.jpg', 'assets/img/previews/joker_hor.jpg', 'assets/img/previews/space_odyssey_hor.jpg', 'assets/img/previews/StarWars.jpeg', 'assets/img/users/invisibleMan.jpeg', 'bookmark.png', 'btn-slider-left.png', 'btn-slider-right.png', 'c98b9212f174f7c8d583.png', 'check.png', 'd1597a732339999cb9ce.woff2', 'dc248741b0c67a6fd65f.woff', 'director.png', 'dislike.png', 'edit.png', 'f1da18a2d60e1756554d.eot', 'f913eb3db93fe43b9b64.woff', 'favicon-16x16.png', 'favicon-32x32.png', 'favicon.ico', 'fc4640b7ac0a65202adf.png', 'icon-active-search.png', 'icon-search.png', 'index.html', 'like.png', 'LogoMOVIEGATE.png', 'offline.html', 'play-big.png', 'play.png', 'plus-review.png', 'plus-save.png', 'refresh.png', 'shtrih.png', 'similar.png', 'site.webmanifest', 'star-empty.png', 'star-fill.png', '/', 'vendors-node_modules_babel_polyfill_lib_index_js-node_modules_handlebars_runtime_js.a7317ac8144e4bb9271b.js'];

this.addEventListener('install', async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(assetUrls);
});

this.addEventListener('fetch', (event) => {
    const { request } = event;

    event.respondWith((async () => {
        if (navigator.onLine) {
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
        return response || caches.match('/offline.html');
    })());
});
