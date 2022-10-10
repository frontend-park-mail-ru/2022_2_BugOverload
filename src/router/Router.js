import { renderMainPage } from './views/MainPage/mainPage.js';
/**
* Осуществляет измениние приложения согласно его состояниям
*
*/
class Router {
    constructor(root) {
        this.root = root;
        this.mapViews = new Map();
    }

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
        view.render;
    }

    back() {

    }

    forward() {

    }
}
