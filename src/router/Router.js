/**
* Осуществляет измениние приложения согласно его состояниям
*
*/
export class Router {
    /**
     * Cохраняет root, создаёт Map для сопоставления путей views и стэк для истории переходов
     * @param {Element} root - div, через который происходит взаимодействие с html.
     */
    constructor(root) {
        this.root = root;
        this.mapViews = new Map();
        this.history = [];
    }

    /**
     * Соопоставляет url и view
     * @param {String} path - url
     * @param {Function} renderView -функция рендера view
     */
    register(path, renderView ) {
        this.mapViews.set(path, renderView);
    }

    /**
     * Переход на новую страницу
     * @param {Object} stateObject - объект состояния
     * @param {string} stateObject.path - относительный url
     * @param {string} stateObject.props - состояние приложения
     */
    go(stateObject) {
        this.history.push({ 
            path: stateObject.path, 
            view: this.mapViews.get(stateObject.path),
            props: stateObject.props,
        });

        this.current = this.history.length - 1;

        const renderView = this.mapViews.get(stateObject.path);
        this.root.replaceChildren();
        renderView(this.history[this.current].props);
        this.navigate(stateObject.path);
    }

    navigate(path) {
        if(path !== '/') {
            const location = window.location.href
                .match(/\w+:\/\/\w+/i)[0];
            history.replaceState( null, null, location + path)
        }
    }
 
    flush() {
        this.history = [];
    }

    back() {
        if(this.current && this.current > 0) {
            this.current--;

            const renderView = this.history[this.current].view;
            this.root.replaceChildren();
            renderView(this.history[this.current].props);
            this.navigate(this.history[this.current].path);
        }
    }

    forward() {
        if(this.current && this.current < this.history.length - 1) {
            this.current++;

            const renderView = this.history[this.current];
            this.root.replaceChildren();
            renderView(this.history[this.current].props);
            this.navigate(this.history[this.current].path);
        }
    }
}
