import { routes, ROOT } from '@config/config.js';
import { hrefRegExp } from '@config/regExp.js';
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
    }

    /**
     * Получает получает путь для обработчика view и динамические параметры
     * @param {String} href - ccылка без домена и id
     */
    matchHref(href) {
        const reg = new RegExp(`^${href.replace(hrefRegExp.idFilms, hrefRegExp.filmProps)}?$`);
        const matchHref = href.match(reg);
        matchHref[0] = matchHref[0].replace(hrefRegExp.idFilms, '');
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

        this.root.addEventListener('click', (e) => {
            const { target } = e;
            if (target instanceof HTMLAnchorElement || target instanceof HTMLImageElement) {
                if (this.mapViews.get(target.dataset.section)) {
                    e.preventDefault();
                    this.go({ path: target.dataset.section }, true);
                }
            }
        });

        window.addEventListener('popstate', ({ state }) => setTimeout(() => {
            let matchedHref = [];
            matchedHref[0] = (window.location.href.match(hrefRegExp.host))
                ? window.location.href.replace(hrefRegExp.host, '')
                : window.location.href.replace(hrefRegExp.localhost, '');

            if (matchedHref[0] !== '/') {
                matchedHref = this.matchHref(matchedHref[0]);
            }

            this.go({ path: matchedHref[0], props: state });
        }, 0));
        this.refresh();
    }

    /**
     * Рендерит страницы при перезагрузке
     */
    refresh() {
        const location = (window.location.href.match(hrefRegExp.host))
            ? window.location.href.replace(hrefRegExp.host, '')
            : window.location.href.replace(hrefRegExp.localhost, '');

        if (window.history.length <= 2 && (location === '/login/' || location === '/signup/')) {
            this.go({ path: '/' });
            this.go({ path: location }, true);
            return;
        }

        let matchedHref = [];
        matchedHref[0] = location;

        if (location !== '/') {
            matchedHref = this.matchHref(location);
        }

        if (this.mapViews.get(location)) {
            this.go({
                path: matchedHref[0],
                props: matchedHref[1],
            });
        } else {
            // TODO рендер 404 страницы
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
        if (stateObject.path !== '/login/' && stateObject.path !== '/signup/') {
            this.root.replaceChildren();
        } else {
            const currentView = this.mapViews.get(stateObject.path.replace(hrefRegExp.auth, ''));
            currentView.render(window.history.state);
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
            window.history.pushState(props, null, location + path);
        }
    }
}

export const router = new Router(ROOT);
