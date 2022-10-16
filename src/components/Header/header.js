import { Ajax } from '../../utils/ajax.js';
import { renderTemplate } from '../../utils/renderTemplate.js';
import { Userbar } from '../Userbar/userbar.js';
import { config } from '../../config/config.js';

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
    }

    /**
     * Обрабатывает запрос на аутентификацию пользователя.
     */
    getRequestData() {
        const responsePromise = Ajax.get('http://localhost:80/v1/auth');
        responsePromise.then((response) => {
            if (response.status === 200) {
                document.body.querySelector('.header').remove();
                renderTemplate('components/Header/header', this.root, 'afterbegin', response.body);
                const userbar = new Userbar(this.root);
                userbar.addHandlers(response.body);
            }
        });
    }

    /**
     * Рендерит стандартный хэдер без пользовательских данных
     */
    render() {
        renderTemplate('components/Header/header', this.root, 'afterbegin');
        this.getRequestData();
        this.handlerHeader();
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
