import {Userbar} from '../Userbar/userbar.js';
import {renderTemplate} from '../../utils/render_template.js';


export class UserAvatar {
    #root

    constructor(root) {
        this.root = root;
    }

    render(user) {
        document.body.querySelector('.header__login__btn').remove();

        debugger;
        const userHtml =
        `<div class="header__userbar-substrate">
            <div class="header__userbar-user-info-container">
                <img class="header__avatar" src="${user.avatar}" alt="">
            </div>
        </div>`;

        const headerForm = document.body.querySelector('.header__form');
        headerForm.insertAdjacentHTML('afterend', userHtml);

        const userbar = new Userbar(root);
        userbar.handler(user);
    }
}
