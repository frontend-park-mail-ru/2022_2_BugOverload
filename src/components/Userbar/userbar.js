import { Ajax } from '@utils/ajax.js';
import templateHeader from '@components/Header/header.handlebars';
import templateUserbar from '@components/Userbar/userbar.handlebars';

/**
* Отрисовывает выпадающее меню.
* Обращается к бэкенду для logout
*
*/
export class Userbar {
    /**
     * Cохраняет root.
     * @param {Element} root - div, через который происходит взаимодействие с html.
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * Навешивает обработчики на меню для обработки logout
     */
    addLogoutHandler() {
        const targetHadler = document.querySelector('.header__userbar-item-out');

        targetHadler.addEventListener('click', (e) => {
            e.preventDefault();
            const { target } = e;

            const resGet = Ajax.get(`http://${DOMAIN}/v1/auth/logout`);
            resGet.then((response) => {
                if (target.dataset.section === 'logout') {
                    if (response.status === 200) {
                        document.body.querySelector('.header').remove();
                        root.insertAdjacentHTML('afterbegin', templateHeader());
                    }
                }
            });
        });
    }

    /**
     * Навешивает обработчик для открытия и закрытия выпадающего меню
     * @param {Object} user - данные пользователя
     * @param {string} user.avatar - ссылка на аватар
     * @param {string} user.email - почта
     * @param {string} user.nickname - ник
     */
    addHandlers(user) {
        let isOpened = false;
        const { root } = this;

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

            root.insertAdjacentHTML('afterbegin', templateHeader(props));

            root.querySelector('.header__userbar-substrate').classList.add('userbar-on');

            isOpened = true;

            logout();

            function handlerCloseUserbar() {
                document.body.querySelector('.header').remove();

                root.insertAdjacentHTML('afterbegin', templateHeader({ ...user }));

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
