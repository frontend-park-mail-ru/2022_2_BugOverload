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
        // <img class="header__avatar" src="${user.avatar}" alt="">

        let headerForm = document.body.querySelector('.header__form');
        headerForm.insertAdjacentHTML('afterend', userHtml);

        const userbar = document.body.querySelector('.header__userbar-substrate');
        let isOpened = false;



        function openUserbar(e) {
            if (isOpened) {
                return;
            }

            const userbarElement = new Userbar(root);
            userbarElement.render(user);

            isOpened = true;
        }

        function closeUserbar(event) {
            if ( !isOpened ) {
                return;
            }

            userbar.style.backgroundColor = "rgba(15, 15, 15, 0.0)";
            userbar.innerHTML = '<img class="header__avatar" src="asserts/img/invisibleMan.jpeg" alt="">';

            isOpened = false;
        }

        userbar.addEventListener('mouseenter', openUserbar);
        userbar.addEventListener('mouseleave', closeUserbar);
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
