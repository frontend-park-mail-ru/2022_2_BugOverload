import templateHeader from '@components/Header/header.handlebars';
import templateUserbar from '@components/Userbar/userbar.handlebars';
import { Component } from '@components/Component';
import { store } from '@store/Store';
import { actionLogout } from '@store/actionCreater/userActions';
import { isMobile } from '@/config/config';

/**
* Отрисовывает выпадающее меню.
* Обращается к бэкенду для logout
*
*/
export class Userbar extends Component {
    /**
     * Навешивает обработчики на меню для обработки logout
     */ 
    addLogoutHandler() {
        const targetHadler = document.querySelector('.js-header__userbar-item-out');

        targetHadler.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target as HTMLElement;

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
    componentDidMount(user :user) {
        let isOpened = false;
        const { rootNode } = this;

        const logout = this.addLogoutHandler;

        function handlerOpenUserbar() {
            if (isOpened) {
                return;
            }

            document.body.querySelector('.js-header').remove();

            const props = {
                isMobile,
                userbar: templateUserbar(),
                ...user,
            };

            rootNode.insertAdjacentHTML('afterbegin', templateHeader(props));

            rootNode.querySelector('.js-header__userbar-substrate').classList.add('userbar-on');

            isOpened = true;

            logout();

            function handlerCloseUserbar() {
                document.body.querySelector('.header').remove();

                rootNode.insertAdjacentHTML('afterbegin', templateHeader(user));

                const newUserbar = document.body.querySelector('.js-header__userbar-user-info-container');
                newUserbar.addEventListener('mouseenter', handlerOpenUserbar);

                isOpened = false;
            }

            const userbar = document.body.querySelector('.js-header__userbar-substrate');
            userbar.addEventListener('mouseleave', handlerCloseUserbar);
        }

        const target = document.body.querySelector('.js-header__userbar-user-info-container');
        target.addEventListener('mouseenter', handlerOpenUserbar);
    }
}
