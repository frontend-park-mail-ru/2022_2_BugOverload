import { routes } from '../config/config.js';
import { idRedExp } from '../config/regExp.js';
/**
* Осуществляет измениние приложения согласно его состояниям
*
*/
export class Router {
    /**
     * Cохраняет root, создаёт Map для сопоставления путей views
     * @param {Element} root - div, через который происходит взаимодействие с html.
     */
    constructor(root) {
        this.root = root;
        this.mapViews = new Map();
    }

    matchHref(href) {
        const reg = new RegExp(`^${href.replace(idRedExp.idFilms, '(\\w+)')}?$`);
        const matchHref = href.match(reg);
        matchHref[0] = matchHref[0].replace(idRedExp.idFilms, '');
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
            matchedHref[0] = window.location.href
                .replace(/^\w+:\/\/\w+/i, '');

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
        let location = window.location.href
            .replace(/\w+:\/\/\w+/i, '');

        matchedHref[0] = location;
        if (location !== '/') {
            location = location.replace(/\/$/i, '');

            matchedHref = this.matchHref(location);
        }

        if (this.mapViews.get(location)) {
            this.go({
                path: matchedHref[0].replace(/\d+$/, ''),
                props: matchedHref[1],
            });
        } else {
            // тут будет рендер 404 страницы
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
        const location = window.location.href
            .match(/\w+:\/\/\w+/i)[0];
        if (pushState) {
            window.history.pushState(props, null, location + path);
        }
    }
}
