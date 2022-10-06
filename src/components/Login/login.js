import { Ajax } from '../../utils/ajax.js';
import { renderTemplate } from '../../utils/renderTemplate.js';
import {
    checkEmail, checkPassword, renderError,
} from '../../utils/valid.js';
import { Modal } from '../Modal/modal.js';
import { Userbar } from '../Userbar/userbar.js';

/**
* Отрисовывает хедер.
* Обращается к бэкенду для авторизации пользователя или проверки его авторизации.
* Добавляет обработчики событий.
*
*/
export class Login {
    constructor(root) {
        this.root = root;
    }

    postRequestData(user) {
        const responsePromise = Ajax.post({
            url: 'http://localhost:8088/v1/auth/login',
            body: user,
        });

        responsePromise.then((response) => {
            if (response.status === 200) {
                document.body
                    .querySelector('.modal__background')
                    .remove();

                document.body.querySelector('.header').remove();
                renderTemplate('components/Header/header', this.root, 'afterbegin', {
                    userinfo: Handlebars.templates['components/UserInfo/userInfo'](user),
                    ...response.body,
                });
                const userbar = new Userbar(this.root);
                userbar.addHandlers(response.body);
            }
            const form = this.root.querySelector('.modal__wrapper__input');
            if (response.status === 400) {
                renderError(form, 'email', 'Такой пользователь не зарегистирован');
            }
            const wrapper = document.getElementById('login_password');

            if (response.status === 403) {
                renderError(wrapper, 'password', 'Неверный пароль');
            }
        });
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

    validateLogin(form) {
        const user = {};
        const emailInput = form.querySelector('input[type=email]');
        const passwordInput = form.querySelector('input[type=password]');
        user.email = emailInput.value.trim();
        user.password = passwordInput.value;

        let flag = true;

        Object.keys(user).forEach((key) => {
            if (key === 'email') {
                if (!checkEmail(form, user[key])) {
                    flag = false;
                }
            }
            if (key === 'password') {
                if (!checkPassword(form, user[key])) {
                    flag = false;
                }
            }
        });

        if (flag) {
            return user;
        }

        return null;
    }

    handler(modalWindow) {
        const form = modalWindow.querySelector('.modal__form');

        const validate = this.validateLogin;
        let user;

        form.addEventListener('keyup', (e) => {
            e.preventDefault();

            user = validate(form);
            if (!user) {
                return;
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            user = validate(form);
            if (!user) {
                return;
            }

            this.postRequestData(user);
        });
    }
}
