import { renderTemplate } from '../../utils/renderTemplate.js';
import { Userbar } from '../Userbar/userbar.js';
import { config } from '../../config/config.js';
import { store } from '../../store/Store.js';
import { actionAuth } from '../../store/actionCreater/userActions.js';
/**
* Отрисовывает хедер.
* Обращается к бэкенду для авторизации пользователя или проверки его авторизации.
* Добавляет обработчики событий.
*
*/
export class Header {
    /**
     * Cохраняет root.
     * @param {Element} root - div, через который происходит взаимодействие с html.
     */
    constructor(root) {
        this.root = root;
        store.subscribe('setUser', this.render.bind(this));
    }

    /**
     * Рендерит стандартный хэдер без пользовательских данных
     */
    render() {
        const user = store.getSate('user');

        const header = this.root.querySelector('.header');
        if (header) {
            header.remove();
        }

        renderTemplate('components/Header/header', this.root, 'afterbegin', user);

        if (user) {
            const userbar = new Userbar(this.root);
            userbar.addHandlers(user);
        } else {
            store.dispatch(actionAuth());
        }
    }

    /**
     * Навешивает события, по которым происходит рендер логина и регистрации
     */
    handlerHeader() {
        this.root.addEventListener('click', (e) => {
            const { target } = e;

            if (target.dataset.section === 'logout') {
                return;
            }

            if (target instanceof HTMLAnchorElement) {
                e.preventDefault();
                const modalWindow = this.root.querySelector('.modal__window');
                if (modalWindow && (target.dataset.section === 'login' || target.dataset.section === 'signup')) {
                    let removeElement;
                    if (target.dataset.section === 'login') {
                        removeElement = 'signup';
                    }
                    if (target.dataset.section === 'signup') {
                        removeElement = 'login';
                    }

                    modalWindow
                        .querySelector(`.modal__${removeElement}`)
                        .remove();
                    modalWindow
                        .querySelector(`.modal__${removeElement}__img`)
                        .remove();
                    const Render = config.auth[target.dataset.section].render;
                    const element = new Render(this.root);
                    element.render();
                    return;
                }

                const header = this.root.querySelector('.header');

                if ((header.compareDocumentPosition(target) === 16
                        || header.compareDocumentPosition(target) === 20)
                        && target.dataset.section === 'login') {
                    const Render = config.header[target.dataset.section].render;
                    const element = new Render(this.root);
                    element.render();
                }
            }
        });
    }
}
