import { Userbar } from '../Userbar/userbar.js';

export class UserAvatar {
    constructor(root) {
        this.root = root;
    }

    render(user) {
        document.body.querySelector('.header__login__btn').remove();

        const userHtml = `<div class="header__userbar-substrate">
            <div class="header__userbar-user-info-container">
                <img class="header__avatar" src="${user.avatar}" alt="">
            </div>
        </div>`;

        const headerForm = document.body.querySelector('.header__form');
        headerForm.insertAdjacentHTML('afterend', userHtml);

        const userbar = new Userbar(this.root);
        userbar.handler(user);
    }
}
