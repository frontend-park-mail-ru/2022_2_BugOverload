import { Ajax } from '../../utils/ajax.js';
import { renderTemplate } from '../../utils/renderTemplate.js';

export class Userbar {
    constructor(root) {
        this.root = root;
    }

    getRequestData() {

    }

    addHandlers(user) {
        let isOpened = false;
        const { root } = this;

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

            const targetHadler = document.querySelector('.header__userbar-item-out');

            targetHadler.addEventListener('click', (e) => {
                e.preventDefault();
                const { target } = e;

                const resGet = Ajax.get('http://127.0.0.1:8088/v1/auth/logout');
                resGet.then((response) => {
                    if (target.dataset.section === 'logout') {
                        if (response.status === 200) {
                            document.body.querySelector('.header').remove();
                            renderTemplate('components/Header/header', root, 'afterbegin');
                        }
                    }
                });
            });

            function handlerCloseUserbar() {
                document.body.querySelector('.header').remove();

                renderTemplate('components/Header/header', root, 'afterbegin', user);

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
