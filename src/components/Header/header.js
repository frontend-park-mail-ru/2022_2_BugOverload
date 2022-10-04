import {Ajax} from '../../utils/ajax.js';
import {renderTemplate} from '../../utils/render_template.js';
import {goToPage} from '../../utils/goToPage.js';
import {Userbar} from '../Userbar/userbar.js';
import {UserAvatar} from '../UserAvatar/userAvatar.js';
import {BACKEND_API, config} from '../../config/config.js';

export class Header {
    #root

    constructor(root) {
        this.root = root;
    }

    render(user) {
        if(!user) {
            const responsePromise = Ajax.get(BACKEND_API.auth);
            console.log(responsePromise)
            responsePromise.then((response) => {
                if(response.status == 200) {
                    user = response.body;
                    console.log(user)
                    const userAvatar = new UserAvatar(root);
                    userAvatar.render(user);
                }
            });
        }

        renderTemplate('components/Header/header', root, 'beforebegin', user);
        this.handlerHeader(user);
    }

    handlerHeader() {
        const header = document.querySelector('.header');

        header.addEventListener('click', (e) => {
            const { target } = e;

            if (target.dataset.section == 'logout') {
                return;
            }

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
