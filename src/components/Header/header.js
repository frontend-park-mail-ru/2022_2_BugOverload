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
            this.state.user = store.getState('user');
            this.componentWillUnmount();
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
            const userbar = new Userbar({ rootNode: this.rootNode });
            userbar.componentDidMount(this.state.user);
        } else {
            store.dispatch(actionAuth());
        }
    }

    handler(e) {
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
                const element = new Render({ rootNode: this.rootNode });
                element.render();
                element.componentDidMount();
                return;
            }

            const header = this.rootNode.querySelector('.header');

            if ((header.compareDocumentPosition(target) === 16
                    || header.compareDocumentPosition(target) === 20)
                    && target.dataset.section === 'login') {
                const Render = config.header[target.dataset.section].render;
                const element = new Render({ rootNode: this.rootNode });
                element.render();
                element.componentDidMount();
            }
        }
    }

    /**
     * Навешивает события, по которым происходит рендер логина и регистрации
     */
    componentDidMount() {
        this.rootNode.addEventListener('click', this.handler.bind(this));
    }

    componentWillUnmount() {
        this.rootNode.removeEventListener('click', this.handler.bind(this));
    }
}
