import { routes } from '../../config/config.js';
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

    /**
     * Обрабатывает перемещение между views, доб. стандартные пути приложения в mapViews и рендерит страницы ппри перезагрузке
     */
    start() {
        this.root.addEventListener('click', (e) => {
            if (this.mapViews.get(e.target.dataset.section)) {
                e.preventDefault();
                this.go({ path: e.target.dataset.section }, true);
            }
        });

        window.addEventListener('popstate', ({ state }) => setTimeout(() => {
            const path = window.location.href
                .replace(/^\w+:\/\/\w+/i, '');
            this.go({ path, renderView: state });
        }, 0));

        for (const rout of routes) {
            this.register(rout);
        }

        //рендерит страницы ппри перезагрузке
        let location = window.location.href
            .replace(/\w+:\/\/\w+/i,'');
        if(location !== '/') {
            location = location.replace(/\/$/i,'');
        }

        if (this.mapViews.get(location)) {
            this.go({path: location});
        } else {
            //тут будет рендер 404 страницы
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
