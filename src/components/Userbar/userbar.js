import { renderTemplate } from '../../utils/renderTemplate.js';

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
                userinfo: Handlebars.templates['components/UserInfo/userInfo'](user),
                userbar: Handlebars.templates['components/Userbar/userbar'](),
                ...user,
            };

            renderTemplate(
                'components/Header/header',
                root,
                'afterbegin',
                props,
            );

            root.querySelector('.header__userbar-substrate').classList.add('userbar-on');

            isOpened = true;

            logout();

            function handlerCloseUserbar() {
                document.body.querySelector('.header').remove();

                renderTemplate('components/Header/header', root, 'afterbegin', {
                    userinfo: Handlebars.templates['components/UserInfo/userInfo'](user),
                    ...user,
                });

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
