import templateHeader from '@components/Header/header.handlebars';
import { Component } from '@components/Component';
import { store } from '@store/Store';
import { actionLogout } from '@store/actionCreater/userActions';

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
        if (!targetHadler) {
            return;
        }

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

            /*document.body.querySelector('.js-header').remove();

            const props = {
                isMobile,
                userbar: templateUserbar(),
                ...user,
            };

            rootNode.insertAdjacentHTML('afterbegin', templateHeader(props));*/
            const userbarArea = rootNode.querySelector('.header__userbar-items-container');
   
            if(userbarArea.classList.contains('dysplay-none')) {
                userbarArea.classList.remove('dysplay-none');
            }
            userbarArea.classList.add('dysplay-flex');

            rootNode.querySelector('.js-header__userbar-substrate')?.classList.add('userbar-on');

            isOpened = true;

            logout();

            function handlerCloseUserbar() {
                const userbarArea = rootNode.querySelector('.header__userbar-items-container');
   
                if(userbarArea.classList.contains('dysplay-flex')) {
                    userbarArea.classList.remove('dysplay-flex');
                }
                userbarArea.classList.add('dysplay-none');

                const newUserbar = document.body.querySelector('.js-header__userbar-user-info-container');
                newUserbar.addEventListener('mouseenter', handlerOpenUserbar);

                rootNode.querySelector('.js-header__userbar-substrate')?.classList.remove('userbar-on');

                isOpened = false;
            }

            const userbar = document.body.querySelector('.js-header__userbar-substrate');
            userbar.addEventListener('mouseleave', handlerCloseUserbar);
        }

        const target = document.body.querySelector('.js-header__userbar-user-info-container');
        target.addEventListener('mouseenter', handlerOpenUserbar);
    }
}
