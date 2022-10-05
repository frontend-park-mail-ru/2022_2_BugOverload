import { Ajax } from '../../utils/ajax.js';
import { renderTemplate } from '../../utils/render_template.js';
// import { renderError } from '../../utils/valid.js';
import { Modal } from '../Modal/modal.js';
import { UserAvatar } from '../UserAvatar/userAvatar.js';

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

                    const userAvatar = new UserAvatar(this.root);
                    userAvatar.render(response.body);
                }
            });
        });
    }
}
