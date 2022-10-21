import templateHeader from '@components/Header/header.handlebars';
import templateUserbar from '@components/Userbar/userbar.handlebars';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { actionLogout } from '@store/actionCreater/userActions.js';

/**
* Отрисовывает выпадающее меню.
* Обращается к бэкенду для logout
*
*/
export class Userbar extends Component {
    /**
     * Cохраняет rootNode.
     * @param {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props) {
        super(props);
        store.subscribe('user', () => {
            if (!store.getSate('user')) {
                this.rootNode.querySelector('.header').remove();
                this.rootNode.insertAdjacentHTML('afterbegin', templateHeader());
            }
        });
    }

    /**
     * Навешивает обработчики на меню для обработки logout
     */
    addLogoutHandler() {
        const targetHadler = document.querySelector('.header__userbar-item-out');

        targetHadler.addEventListener('click', (e) => {
            e.preventDefault();
            const { target } = e;

            if (target.dataset.section === 'logout') {
                store.dispatch(actionLogout());
            }
        });
    }

    /**
     * Навешивает обработчик для открытия и закрытия выпадающего меню
     * @param {Object} user - данные пользователя
     * @param {string} user.avatar - ссылка на аватар
     * @param {string} user.email - почта
     * @param {string} user.nickname - ник
     */
    componentDidMount(user) {
        let isOpened = false;
        const { rootNode } = this;

        const logout = this.addLogoutHandler;

        function handlerOpenUserbar() {
            if (isOpened) {
                return;
            }

            document.body.querySelector('.header').remove();

            const props = {
                userbar: templateUserbar(),
                ...user,
            };

            rootNode.insertAdjacentHTML('afterbegin', templateHeader(props));

            rootNode.querySelector('.header__userbar-substrate').classList.add('userbar-on');

            isOpened = true;

            logout();

            function handlerCloseUserbar() {
                document.body.querySelector('.header').remove();

                rootNode.insertAdjacentHTML('afterbegin', templateHeader(user));

                const newUserbar = document.body.querySelector('.header__userbar-user-info-container');
                newUserbar.addEventListener('mouseenter', handlerOpenUserbar);

                isOpened = false;
            }

            const userbar = document.body.querySelector('.header__userbar-substrate');
            userbar.addEventListener('mouseleave', handlerCloseUserbar);
        }

        const target = document.body.querySelector('.header__userbar-user-info-container');
        target.addEventListener('mouseenter', handlerOpenUserbar);
    }
}
