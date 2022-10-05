import { Ajax } from '../../utils/ajax.js';
import { renderTemplate } from '../../utils/renderTemplate.js';
// import { renderError } from '../../utils/valid.js';
import { Modal } from '../Modal/modal.js';
import { Userbar } from '../Userbar/userbar.js';

export class Login {
    constructor(root) {
        this.root = root;
    }

    render() {
        if (!this.root.querySelector('.modal__window')) {
            const modal = new Modal(this.root);
            modal.render();
        }

        const modalWindow = this.root.querySelector('.modal__window__flex');

        renderTemplate('components/Login/login', modalWindow, 'afterbegin');

        this.handler(modalWindow);
    }

    handler(modalWindow) {
        const form = modalWindow.querySelector('.modal__form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = form.querySelector('input[type=email]');
            const passwordInput = form.querySelector('input[type=password]');
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            const responsePromise = Ajax.post({
                url: 'http://localhost:8088/v1/auth/login',
                body: { email, password },
            });

            responsePromise.then((response) => {
                if (response.status === 200) {
                    document.body
                        .querySelector('.modal__background')
                        .remove();

                    document.body.querySelector('.header').remove();
                    renderTemplate('components/Header/header', this.root, 'afterbegin', response.body);
                    const userbar = new Userbar(this.root);
                    userbar.addHandlers(response.body);
                }
            });
        });
    }
}
