import { Ajax } from '../../utils/ajax.js';
import { renderTemplate } from '../../utils/renderTemplate.js';
import {
    checkEmail, checkPassword, checkNick, renderError,
} from '../../utils/valid.js';
import { Modal } from '../Modal/modal.js';
import { Userbar } from '../Userbar/userbar.js';

export class Signup {
    constructor(root) {
        this.root = root;
    }

    postRequestData(inputData) {
        const responsePromise = Ajax.post({
            url: 'http://movie-gate.online:8088/v1/auth/signup',
            body: inputData,
        });

        responsePromise.then((response) => {
            if (response.status === 201) {
                document.body
                    .querySelector('.modal__background')
                    .remove();

                const user = response.body;
                if (!Object.prototype.hasOwnProperty.call(user, 'avatar')) {
                    user.avatar = 'asserts/img/invisibleMan.jpeg';
                }
                document.body.querySelector('.header').remove();
                renderTemplate('components/Header/header', this.root, 'afterbegin', response.body);
                const userbar = new Userbar(this.root);
                userbar.addHandlers(response.body);

                return;
            }

            if (response.status === 400) {
                const wrapper = document.getElementById('signup_email');
                renderError(wrapper, 'email', 'Пользователь с таким email уже зарегистрирован');
            }
        });
    }

    render() {
        if (this.root.querySelector('.modal__window') === null) {
            const modal = new Modal(this.root);
            modal.render();
        }

        const modalWindow = this.root.querySelector('.modal__window__flex');
        renderTemplate('components/Signup/signup', modalWindow, 'afterbegin');

        this.handler(modalWindow);
    }

    handler(modalWindow) {
        const form = modalWindow.querySelector('.modal__form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nickInput = form.querySelector('input[type=text]');
            const emailInput = form.querySelector('input[type=email]');
            const passwordInput = form.querySelectorAll('input[type=password]');
            const confirmInput = document.getElementById('confirm');

            const user = {};
            user.nickname = nickInput.value.trim();
            user.email = emailInput.value.trim();
            user.password = passwordInput[0].value;
            const confirmPassword = confirmInput.querySelector('.modal__input').value;

            let flag = false;

            Object.keys(user).forEach((key) => {
                if (key === 'email') {
                    if (!checkEmail(form, user[key])) {
                        flag = true;
                    }
                }
                if (key === 'password') {
                    if (!checkPassword(form, user[key], 'signup', confirmPassword)) {
                        flag = true;
                    }
                }
                if (key === 'nickname') {
                    if (!checkNick(form, user[key])) {
                        flag = true;
                    }
                }
            });

            if (flag) {
                return;
            }

            this.postRequestData(user);
        });
    }
}
