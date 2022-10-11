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
     * Обрабатывает перемещение между views, доб. стандартные пути в приложении и рендерит главную
     */
    start() {
        root.addEventListener('click', (e) => {
            if (this.mapViews.get(e.target.dataset.section)) {
                e.preventDefault();
                this.go(e.target.dataset.section);
            }
        });

        for (const rout of routes) {
            this.register(rout);
        }
        
        this.go(routes[0]); // рендер главной страницы
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
    go(stateObject) {
        const renderView = this.mapViews.get(stateObject.path);

        this.root.replaceChildren();
        renderView(stateObject.props);
        this.navigate(stateObject);
    }

    /**
     * Изменение url
     * @param {string} path - относительный url
     * @param {string} props - состояние приложения
     */
    navigate({ path, props }) {
        const location = window.location.href
            .match(/\w+:\/\/\w+/i)[0];
        window.history.pushState(props, null, location + path);
    }
}
