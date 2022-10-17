import templateLogin from '@components/Login/login.handlebars';
import {
    checkEmail, checkPassword, renderError, removeError,
} from '@utils/valid.js';
import { Modal } from '@components/Modal/modal.js';
import { store } from '@store/Store.js';
import { actionLogin } from '@store/actionCreater/userActions.js'

/**
* Отрисовывает логин.
* Обращается к бэкенду для проверки пользователя при логине
*
*/
export class Login {
    /**
     * Cохраняет root.
     * @param {Element} root - div, через который происходит взаимодействие с html.
     */
    constructor(root) {
        this.root = root;
        store.subscribe('login', this.render.bind(this));
    }

    /**
     * Отсылает пользовательский ввод и обрабатывает ответ бэкенда
     * @param {Object} user - провалидированный пользовательский ввод
     * @param {string} user.email - введённая почта
     * @param {string} user.password - введённый пароль
     */
    handlerStatus(userStatus) {
        const form = this.root.querySelector('.modal__wrapper__input');
        if (userStatus === 400) {
            renderError(form, 'email', 'Такой пользователь не зарегистирован');
            return;
        }
        const wrapper = document.getElementById('login_password');

        if (userStatus === 401) {
            renderError(wrapper, 'password', 'Неверный пароль');
        }
    }

    /**
     * Рендерит логин
     */
    render() {
        const userStatus = store.getSate('user')?.statusLogin;

        if (!this.root.querySelector('.modal__window')) {
            const modal = new Modal(this.root);
            modal.render();
        }

        if (userStatus) {
            this.handlerStatus(userStatus);
            return;
        }

        if(store.getSate('user')) {
            document.body
                .querySelector('.modal__background')
                .remove();

            return;
        }

        const modalWindow = this.root.querySelector('.modal__window__flex');

        modalWindow.insertAdjacentHTML('afterbegin', templateLogin());

        this.handler(modalWindow);
    }

    /**
     * Проверяет пользовательский ввод
     * @param {Element} form - форма логина
     * @param {Bool} keyup - режим проверки полей: true - по одному, false все
     */
    validateLogin(form, keyup = false) {
        const user = {};
        const emailInput = form.querySelector('input[type=email]');
        const passwordInput = form.querySelector('input[type=password]');
        user.email = emailInput.value.trim();
        user.password = passwordInput.value;

        let flag = true;

        for (const key of Object.keys(user)) {
            if (keyup && !user[key]) {
                removeError(form, key);
                continue;
            }
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
        }

        if (flag) {
            return user;
        }

        return null;
    }

    /**
     * Навешивает обработчики на валидацию
     * @param {Element} modalWindow - модальное окно
     */
    handler(modalWindow) {
        const form = modalWindow.querySelector('.modal__form');

        const validate = this.validateLogin;
        let user;

        form.addEventListener('keyup', (e) => {
            e.preventDefault();

            validate(form, true);
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            user = validate(form);
            if (!user) {
                return;
            }

            store.dispatch(actionLogin(user));
        });
    }
}
