import {Ajax} from '../../utils/ajax.js';
import {renderTemplate} from '../../utils/render_template.js';
import {goToPage} from '../../utils/go_to_page.js';
import {renderError} from '../../utils/valid.js';
import {Modal} from '../Modal/modal.js';
import {Header} from '../Header/header.js';
import {config} from '../../config/config.js';
import {UserAvatar} from '../UserAvatar/userAvatar.js';

export class Login {
    #root

    constructor(root) {
        this.root = root;
    }

    render() {
        if (!root.querySelector('.modal__window')) {
            const modal = new Modal(root);
            modal.render();
        }

        const modalWindow = root.querySelector('.modal__window__flex');

        renderTemplate('components/Login/login', modalWindow, 'afterbegin');

        this.handler(modalWindow);
    }

    handler(modalWindow) {
        const form = modalWindow.querySelector('.modal__form');
        const loginImg = modalWindow.querySelector('.modal__login__img');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = form.querySelector('input[type=email]');
            const passwordInput = form.querySelector('input[type=password]');
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            const responsePromise = Ajax.post({
                url: 'http://localhost:8088/v1/auth/login',
                body: {email, password}
            });

            console.log(responsePromise)

            responsePromise.then((response) => {
                console.log(response)
                if (response.status === 200) {
                    console.log(response.body);

                    document.body
                        .querySelector('.modal__background')
                        .remove();

                    const userAvatar = new UserAvatar(root);
                    userAvatar.render(response.body);

                    return;
                }

                console.log(response.status);
            });
        });

        loginImg.addEventListener('click', (e) => {
            const { target } = e;

            if (target instanceof HTMLAnchorElement) {
                e.preventDefault();

                goToPage(config.login[target.dataset.section], () => {
                    modalWindow
                        .querySelector('.modal__login')
                        .remove();
                    modalWindow
                        .querySelector('.modal__login__img')
                        .remove();
                    const signup = new config.login[target.dataset.section].render(root);
                    signup.render();
                },
                modalWindow);
            }
        });
    }
}
