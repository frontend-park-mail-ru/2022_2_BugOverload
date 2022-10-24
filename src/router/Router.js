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
     * Обрабатывает перемещение между views,
     * добавляет стандартные пути приложения в mapViews и рендерит страницы ппри перезагрузке
     */
    start() {
        this.root.addEventListener('click', (e) => {
            if (this.mapViews.get(e.target.dataset.section)) {
                e.preventDefault();
                this.go({ path: e.target.dataset.section }, true);
            }
        });

        window.addEventListener('popstate', ({ state }) => setTimeout(() => {
            let matchedHref = [];
            matchedHref[0] = 
                (window.location.href.match(hrefRegExp.host))?
                    window.location.href.replace(hrefRegExp.host, ''):
                    window.location.href.replace(hrefRegExp.localhost, '');
                    

            if (matchedHref[0] !== '/') {
                matchedHref = this.matchHref(matchedHref[0]);
            }

            this.go({ path: matchedHref[0], renderView: state });
        }, 0));

        for (const rout of routes) {
            this.register(rout);
        }

        // рендерит страницы при перезагрузке
        let matchedHref = [];
        const location =
            (window.location.href.match(hrefRegExp.host))?
                window.location.href.replace(hrefRegExp.host, ''):
                window.location.href.replace(hrefRegExp.localhost, '');

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
     * Соопоставляет url и view
     * @param {String} path - url
     * @param {Function} renderView -функция рендера view
     */
    register({ path, renderView }) {
        this.mapViews.set(path, renderView);
    }

    /**
     * Переход на новую страницу
     * @param {Object} stateObject - объект состояния
     * @param {string} stateObject.path - относительный url
     * @param {string} stateObject.props - состояние приложения
     */
    go(stateObject, pushState = false) {
        const renderView = this.mapViews.get(stateObject.path);

        this.root.replaceChildren();
        renderView(stateObject.props);
        this.navigate(stateObject, pushState);
    }

    /**
     * Изменение url
     * @param {string} path - относительный url
     * @param {string} props - состояние приложения
     */
    navigate({ path, props }, pushState = false) {
        const location = 
            (window.location.href.match(hrefRegExp.host))?
                window.location.href.match(hrefRegExp.host, '')[0]:
                window.location.href.match(hrefRegExp.localhost, '')[0];

        if (pushState) {
            window.history.pushState(props, null, location + path);
        }
    }
}

export const router = new Router(ROOT);
