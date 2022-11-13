import { routes, ROOT } from '@config/config.js';
import { hrefRegExp } from '@config/regExp.js';
import { ShowMessage } from '@components/Message/message.js';
import { notFoundPage } from '@router/Page404/page404.js';
/**
* Осуществляет изменение приложения согласно его состояниям
*
*/
class Router {
    /**
     * Cохраняет root, создаёт Map для сопоставления путей views
     * @param {Element} root - div, через который происходит взаимодействие с html.
     */
    constructor(root) {
        this.root = root;
        this.mapViews = new Map();
        this.lastView = null;
        this.cachedUrls = new Map();
    }

    /**
     * Получает получает путь для обработчика view и динамические параметры
     * @param {String} href - ccылка без домена и id
     */
    matchHref(href) {
        let newHref = href;
        if (newHref !== '/') {
            newHref = href.replace(hrefRegExp.endSlash, '');
        }
        let reg = new RegExp(`^${newHref.replace(hrefRegExp.idFilms, hrefRegExp.filmProps)}?$`);

        let matchHref = newHref.match(reg);
        if (matchHref) {
            if (matchHref[1]) {
                matchHref[0] = matchHref[0].replace(hrefRegExp.idFilms, '');
            } else {
                reg = new RegExp(`^${href.replace(hrefRegExp.idFilms, hrefRegExp.filmProps)}?$`);
                matchHref = href.match(reg);
            }
        }
        return matchHref;
    }

    /**
     * Соопоставляет url и view
     * @param {String} path - url
     * @param {Function} view - view
     */
    register({ path, view }) {
        this.mapViews.set(path, view);
    }

    /**
     * Обрабатывает перемещение между views,
     * добавляет стандартные пути приложения в mapViews и рендерит страницы при перезагрузке
     */
    start() {
        for (const rout of routes) {
            this.register(rout);
        }

        document.addEventListener('click', (e) => {
            const { target } = e;
            if (target.dataset.section) {
                const matchedHref = this.matchHref(target.dataset.section);
                if (this.mapViews.get(matchedHref[0])) {
                    e.preventDefault();
                    this.go({ path: matchedHref[0], props: matchedHref[1] }, true);
                }
            }
        });

        window.addEventListener('popstate', () => setTimeout(() => {
            let matchedHref = [];
            matchedHref[0] = (window.location.href.match(hrefRegExp.host))
                ? window.location.href.replace(hrefRegExp.host, '')
                : window.location.href.replace(hrefRegExp.localhost, '');

            if (matchedHref[0] !== '/') {
                matchedHref = this.matchHref(matchedHref[0]);
            }
            this.go({ path: matchedHref[0], props: matchedHref[1] });
        }, 0));
        this.refresh();
    }

    /**
     * Рендерит страницы при перезагрузке
     */
    refresh() {
        window.addEventListener('offline', () => {
            ShowMessage('Проблемы с интернет соединением', 'negative');
        });

        const location = (window.location.href.match(hrefRegExp.host))
            ? window.location.href.replace(hrefRegExp.host, '')
            : window.location.href.replace(hrefRegExp.localhost, '');

        let matchedHref = [];
        matchedHref[0] = location;

        if (location !== '/') {
            matchedHref = this.matchHref(location);
        }
        if (this.mapViews.get(matchedHref[0])) {
            this.cache();
            this.go({
                path: matchedHref[0],
                props: matchedHref[1],
            }, true);
        } else {
            notFoundPage.render();
        }
    }

    /**
     * Переход на новую страницу
     * @param {Object} stateObject - объект состояния
     * @param {string} stateObject.path - относительный url
     * @param {string} stateObject.props - состояние приложения
     */
    go(stateObject, pushState = false) {
        const view = this.mapViews.get(stateObject.path);
        const loginView = this.mapViews.get('/login/');
        const signupView = this.mapViews.get('/signup/');
        if (stateObject.path !== '/login/' && stateObject.path !== '/signup/') {
            this.root.replaceChildren();
            if (this.lastView !== loginView && this.lastView !== signupView) {
                this.beforStateObject = stateObject;
            } else {
                if (this.beforStateObject) {
                    this.navigate(this.beforStateObject);
                    this.lastView = this.mapViews.get(stateObject.path);
                    this.mapViews.get(this.beforStateObject.path)
                        .render(this.beforStateObject.props);
                } else {
                    this.navigate({ path: '/' });
                    this.lastView = this.mapViews.get('/');
                    this.mapViews.get('/').render();
                }

                return;
            }
        } else if (!this.lastView || this.lastView === loginView || this.lastView === signupView) {
            const currentView = this.mapViews.get(stateObject.path.replace(hrefRegExp.auth, ''));
            currentView.render(window.history.state);
        } else if (this.beforStateObject) {
            this.mapViews.get(this.beforStateObject.path).render(this.beforStateObject.props);
        }

        if (
            this.lastView
            && Object.getOwnPropertyNames(
                Object.getPrototypeOf(this.lastView),
            )
                .includes('componentWillUnmount')
        ) {
            this.lastView.componentWillUnmount();
        }
        view.render(stateObject.props);
        this.navigate(stateObject, pushState);
        this.lastView = view;
    }

    /**
     * Изменение url
     * @param {string} path - относительный url
     * @param {string} props - состояние приложения
     */
    navigate({ path, props }, pushState = false) {
        const location = (window.location.href.match(hrefRegExp.host))
            ? window.location.href.match(hrefRegExp.host, '')[0]
            : window.location.href.match(hrefRegExp.localhost, '')[0];

        if (pushState) {
            if (props) {
                window.history.pushState(props, null, `${location + path}${props}/`);
            } else {
                window.history.pushState(props, null, location + path);
            }

            this.cache();
        } else {
            if (props) {
                window.history.replaceState(props, null, `${location + path}${props}/`);
            } else {
                window.history.replaceState(props, null, location + path);
            }

            this.cache();
        }
    }

    cache(url = './') {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register('/sw.js', { scope: url });
            if (!this.cachedUrls.get(url)) {
                this.cachedUrls.set(url);
            }
        }
    }
}

export const router = new Router(ROOT);
