import { renderMainPage } from './views/MainPage/mainPage.js';
/**
* Осуществляет измениние приложения согласно его состояниям
*
*/
class Router {
    /**
     * Cохраняет root, создаёт Map для сопоставления путей views и стэк для истории переходов
     * @param {Element} root - div, через который происходит взаимодействие с html.
     */
    constructor(root) {
        this.root = root;
        this.mapViews = new Map();
        this.historyStack = [];
    }

    /**
     * Соопоставляет url и view
     * @param {String} path - url
     * @param {Class} view - класс view
     */
    register(path, view) {
        this.mapViews.set(path, view);
    }

    /**
     * Переход на новую страницу
     * @param {Object} stateObject - объект состояния
     * @param {string} stateObject.path - относительный url
     * @param {string} stateObject.props - состояние приложения
     */
    go(stateObject) {
        const view = new this.mapViews.get(stateObject.path)(this.root);
        this.root.replaceChildren();
        view.render(this);
    }

    back() {

    }

    forward() {

    }
}


class Router {
    /**
     * Cохраняет root, создаёт массив routes 
     * @param {Element} root - div, через который происходит взаимодействие с html.
     */
    constructor(root) {
        this.root = options.root;
        this.routes = [];
        this.listen();
    }
  
    /**
     * Соопоставляет url и view
     * @param {String} path - url
     * @param {Class} classView - класс view
     */
    add = (path, classView) => {
        this.routes.push({ path, classView });
        return this;
    };
  
    /**
     * Удаляет url и view
     * @param {String} path - url
     */
    remove = path => {
        for (let i = 0; i < this.routes.length; i += 1) {
            if (this.routes[i].path === path) {
            this.routes.slice(i, 1);
            return this;
            }
        }
        return this;
    };
  
    /**
     * Очищает историю
     */
    flush = () => {
        this.routes = [];
        return this;
    };
  
    /**
     * Убирает / из url
     */
    clearSlashes = path =>
        path
            .toString()
            .replace(/\/$/, '')
            .replace(/^\//, '');
  
    getFragment = () => {
        let fragment = '';

        fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
        return this.clearSlashes(fragment);
    };
  
    navigate = (path = '') => {
        window.history.pushState(null, null, this.root + this.clearSlashes(path));
        return this;
    };
  
    listen = () => {
        clearInterval(this.interval);
        this.interval = setInterval(this.interval, 50);
    };
  
    interval = () => {
        if (this.current === this.getFragment()) return;
        this.current = this.getFragment();
    
        this.routes.some(route => {
            const match = this.current.match(route.path);
            if (match) {
            match.shift();
            route.classView.apply({}, match);
            return match;
            }
            return false;
        });
    };
}
