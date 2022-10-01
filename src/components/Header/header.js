import {Ajax} from '../../utils/ajax.js';
import {renderTemplate} from '../../utils/render_template.js';
import {goToPage} from '../../utils/go_to_page.js';
import {Userbar} from '../Userbar/userbar.js';
import {config} from '../../config/config.js';

export class Header {
    #root

    constructor(root) {
        this.root = root;
    }

    renderUserAvatar(user) {
        document.body.querySelector('.header__login__btn').remove();

        const userHtml =
        `<div class="header__userbar-substrate">
            <img class="header__avatar" src="${user.avatar}" alt="">
        </div>`;

        document.body.querySelector('.header__form').insertAdjacentHTML('afterend', userHtml);

        const ava = document.body.querySelector('.header__userbar-substrate');

        function openUserbar(e) {
            const { target } = e;
            // debugger;

            const userbar = new Userbar(root);
            userbar.render(user);
            // const userbar = document.querySelector('.header__userbar-substrate');
            // renderTemplate('components/navbarMish/usermenu', userbar, 'beforeend', user);
        }

        ava.addEventListener('mouseenter', openUserbar);
    }

    render(user) {
        if(!user) {
            const responsePromise = Ajax.get('/v1/auth');
            console.log(responsePromise)
            responsePromise.then((response) => {
                console.log(response)
                if(response.status == 200) {
                    user = response.body;
                    console.log(user)
                    this.renderUserAvatar(user);
                }
            });
        }

        renderTemplate('components/Header/header', root, 'beforebegin', user);
        console.log(user)
        this.handlerHeader(user);
    }

    handlerHeader() {
        const header = document.querySelector('.header');

        header.addEventListener('click', (e) => {
            const { target } = e;

            if (target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement) {
                e.preventDefault();
                goToPage(config.header[target.dataset.section], () => {
                    document.body
                        .querySelector('.active')
                        .classList.remove('active');

                        const head = new (config.header[target.dataset.section].render)(root);
                        head.render();
                });
            }
        });
    }
}
