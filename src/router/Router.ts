import { routes, ROOT } from '@config/config.js';
import { hrefRegExp } from '@config/regExp';
import { ShowMessage } from '@components/Message/message.js';
import { notFoundPage } from '@router/Page404/page404';

interface Class extends anyObject { 
    render :Function;
    componentWillUnmount :Function;
}

interface Router {
    root: Element;
    mapViews: Map<string, Class>;
    cachedUrls: Array<string>;
    pathBeforModal: string;
    prevUrl: string;
}

interface stateObject {
    path :string;
    props :string;
}
/**
* Осуществляет изменение приложения согласно его состояниям
*
*/
class Router {
    /**
     * Cохраняет root, создаёт Map для сопоставления путей views
     * @param {Element} root - div, через который происходит взаимодействие с html.
     */
    constructor(root :Element) {
        this.root = root;
        this.mapViews = new Map(); 
        this.cachedUrls = [];
    }

    /**
     * Получает получает путь для обработчика view и динамические параметры
     * @param {string} href - ccылка без домена и id
     */
    matchHref(href :string) {
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
     * @param {string} path - url
     * @param {Function} view - view
     */
    register({ path, view } :{path :string, view :any}) {
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
            if (target instanceof HTMLElement) {
                if (target.dataset.section) {
                    const matchedHref = this.matchHref(target.dataset.section);
                    if (this.mapViews.get(matchedHref[0])) {
                        e.preventDefault();
                        this.go({ path: matchedHref[0], props: matchedHref[1] }, { pushState: true, refresh: false  });
                    }
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

            const prevView = this.mapViews.get(this.prevUrl);

            if(prevView && 
                Object.getOwnPropertyNames(Object.getPrototypeOf(prevView))
                    .includes('componentWillUnmount')) {
                prevView.componentWillUnmount();
            }

            this.go({ path: matchedHref[0], props: matchedHref[1] }, { pushState: false, refresh: false });
            this.prevUrl = matchedHref[0];
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
            }, { pushState: true, refresh: true });
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
    go(stateObject :stateObject, { pushState, refresh } :{ pushState :boolean, refresh: boolean}) {
        const location = (window.location.href.match(hrefRegExp.host))
            ? window.location.href.replace(hrefRegExp.host, '')
            : window.location.href.replace(hrefRegExp.localhost, '');

        const prevStateLocation = this.matchHref(location);
        const prevView = this.mapViews.get(prevStateLocation[0]);

        if (
            prevView
            && Object.getOwnPropertyNames(Object.getPrototypeOf(prevView))
                   .includes('componentWillUnmount')
        ) {
            prevView.componentWillUnmount();
        }

        const view = this.mapViews.get(stateObject.path);

        // click login/signup after signup/login
        if (stateObject.path === '/login/' || stateObject.path === '/signup/') {
            if (refresh) {
                this.pathBeforModal = window.localStorage.getItem('pathBeforModal');
                if (!this.pathBeforModal) {
                    window.localStorage.setItem('pathBeforModal', '/');
                    this.mapViews.get('/').render();
                } else {
                    const prevState = this.matchHref(this.pathBeforModal);
                    const viewBeforModal = this.mapViews.get(prevState[0]);
                    viewBeforModal.render(prevState[1]);
                }
            } else if (location !== '/login/' && location !== '/signup/') {
                window.localStorage.setItem('pathBeforModal', location);
            }
        }

        // click no login/signup after login/signup
        if (stateObject.path !== '/login/' && stateObject.path !== '/signup/') {
            this.root.replaceChildren();
        }

        view.render(stateObject.props);
        this.navigate(stateObject, pushState);
    }

    /**
     * Изменение url
     * @param {string} path - относительный url
     * @param {string} props - состояние приложения
     */
    navigate({ path, props } :stateObject, pushState = false) {
        const location = (window.location.href.match(hrefRegExp.host))
            ? window.location.href.match(hrefRegExp.host)[0]
            : window.location.href.match(hrefRegExp.localhost)[0];

        if (pushState) {
            if (props) {
                window.history.pushState(props, null, `${location + path}${props}/`);
            } else {
                window.history.pushState(props, null, location + path);
            }
            this.prevUrl = path; 
        }

        this.cache();
    }

    cache(url = './') {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register('/sw.js', { scope: url });
            if (!this.cachedUrls.includes(url)) {
                this.cachedUrls.push(url);
            }
        }
    }
}

export const router = new Router(ROOT);
