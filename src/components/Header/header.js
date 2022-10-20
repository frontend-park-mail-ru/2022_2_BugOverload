import { Userbar } from '@components/Userbar/userbar.js';
import { config } from '@config/config.js';
import template from '@components/Header/header.handlebars';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { actionAuth } from '@store/actionCreater/userActions.js';


/**
* Отрисовывает хедер.
* Обращается к бэкенду для авторизации пользователя или проверки его авторизации.
* Добавляет обработчики событий.
*
*/
export class Header extends Component {
    /**
     * Cохраняет rootNode.
     * @param {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
        store.subscribe('user', () => {
            this.state.user = store.getSate('user');
            console.log(this.state.user)
            this.render();
        });
    }

    /**
     * Рендерит стандартный хэдер без пользовательских данных
     */
    render() {
        const header = this.rootNode.querySelector('.header');
        if (header) {
            header.remove();
        }

        this.rootNode.insertAdjacentHTML('afterbegin', template(this.state.user));

        if (this.state.user) {
            const userbar = new Userbar(this.rootNode);
            userbar.addHandlers(this.state.user);
        } else {
            store.dispatch(actionAuth());
        }
    }

    /**
     * Навешивает события, по которым происходит рендер логина и регистрации
     */
    handlerHeader() {
        this.rootNode.addEventListener('click', (e) => {
            const { target } = e;

            if (target.dataset.section === 'logout') {
                return;
            }

            if (target instanceof HTMLAnchorElement) {
                e.preventDefault();
                const modalWindow = this.rootNode.querySelector('.modal__window');
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
                    const element = new Render(this.rootNode);
                    element.render();
                    return;
                }

                const header = this.rootNode.querySelector('.header');

                if ((header.compareDocumentPosition(target) === 16
                        || header.compareDocumentPosition(target) === 20)
                        && target.dataset.section === 'login') {
                    const Render = config.header[target.dataset.section].render;
                    const element = new Render(this.rootNode);
                    element.render();
                }
            }
        });
    }
}
