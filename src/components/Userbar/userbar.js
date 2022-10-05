import { Ajax } from '../../utils/ajax.js';
import { renderTemplate } from '../../utils/renderTemplate.js';

export class Userbar {
    constructor(root) {
        this.root = root;
    }

    addHandlers(user) {
        let isOpened = false;
        const { root } = this;

        function handlerOpenUserbar() {
            if (isOpened) {
                return;
            }

            document.body.querySelector('.header').remove();

            renderTemplate(
                'components/Header/header',
                root,
                'afterbegin',
                Object.assign(
                    user,
                    {
                        userinfo: Handlebars.templates['components/UserInfo/userInfo'](),
                        userbar: Handlebars.templates['components/Userbar/userbar'](),
                    },
                ),
            );

            isOpened = true;

            const targetHadler = document.querySelector('.header__userbar-items-container');

            targetHadler.addEventListener('click', (e) => {
                e.preventDefault();
                const { target } = e;

                const resGet = Ajax.get('http://localhost:8088/v1/auth/logout');
                resGet.then((response) => {
                    if (target.dataset.section === 'logout') {
                        if (response.status === 200) {
                            renderTemplate('components/Header/header', root, 'afterbegin');
                        }
                    }
                });
            });

            function handlerCloseUserbar() {  
                document.body.querySelector('.header').remove();
    
                renderTemplate('components/Header/header', root, 'afterbegin',user);
    
                isOpened = false;
            }

            const userbar = document.body.querySelector('.header__userbar-substrate');
            userbar.addEventListener('mouseleave', handlerCloseUserbar);
        }

        const inputUserbar = document.body.querySelector('.header__userbar-user-info-container');

        inputUserbar.addEventListener('mouseenter', handlerOpenUserbar);
    }
}
