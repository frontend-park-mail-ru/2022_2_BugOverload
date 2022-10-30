import templateSignup from '@components/Signup/signup.handlebars';
import {
    checkEmail, checkPassword, checkConfirmPassword, checkNick, renderError, removeError,
} from '@utils/valid.js';
import { Component } from '@components/Component.js';
import { Modal } from '@components/Modal/modal.js';
import { store } from '@store/Store.js';
import { actionRegister } from '@store/actionCreater/userActions.js';

/**
* Отрисовывает регистрацию.
* Обращается к бэкенду для проверки пользователя при регистрации
*
*/
export class Signup extends Component {
    /**
     * Cохраняет rootNode.
     * @param {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
        store.subscribe('statusSignup', () => {
            this.state.statusSignup = store.getState('statusSignup');
            this.render();
        });
    }

    handlerStatus() {
        if (user.status === 400) {
            const wrapper = document.getElementById('signup_email');
            renderError(wrapper, 'email', 'Пользователь с таким email уже зарегистрирован');
        }
    }

    /**
     * Рендерит логин
     */
    render() {
        if (this.rootNode.querySelector('.modal__window') === null) {
            const modal = new Modal(this.rootNode);
            modal.render();
        }

        if (store.getState('user')) {
            document.body
                .querySelector('.modal__background')
                .remove();

            return;
        }

        if (this.state.statusSignup) {
            this.handlerStatus(userStatus);
            return;
        }

        const modalWindow = this.rootNode.querySelector('.modal__window__flex');
        modalWindow.insertAdjacentHTML('afterbegin', templateSignup());
    }

    /**
     * Проверяет пользовательский ввод
     * @param {Element} form - форма логина
     * @param {Bool} keyup - режим проверки полей: true - по одному, false все
     */
    validateSignup(form, keyup = false) {
        const nickInput = form.querySelector('input[type=text]');
        const emailInput = form.querySelector('input[type=email]');
        const passwordInput = form.querySelector('input[type=password]');
        const confirmInput = document.getElementById('confirm');

        const user = {};
        user.nickname = nickInput.value.trim();
        user.email = emailInput.value.trim();
        user.password = passwordInput.value;
        const confirmPassword = confirmInput.querySelector('.modal__input').value;

        let flag = true;

        for (const key of Object.keys(user)) {
            if (keyup && !user[key]) {
                if (key === 'nickname') {
                    removeError(form, 'text');
                } else {
                    removeError(form, key);
                }
                continue;
            }

            if (key === 'email') {
                if (!checkEmail(form, user[key])) {
                    flag = false;
                }
            }

            if (key === 'password') {
                if (keyup) {
                    if (!checkPassword(form, user[key])) {
                        flag = false;
                    }
                } else if (!checkPassword(form, user[key], keyup, confirmPassword)) {
                    flag = false;
                }
            }

            if (key === 'nickname') {
                if (!checkNick(form, user[key])) {
                    flag = false;
                }
            }
        }

        const confirm = document.getElementById('confirm');

        if (keyup && !confirmPassword) {
            removeError(confirm, 'password');
            return null;
        }

        if (!checkConfirmPassword(confirm, confirmPassword, user.password)) {
            flag = false;
        }

        if (flag) {
            return user;
        }

        return null;
    }

    /**
     * Навешивает обработчики на валидацию
     */
    componentDidMount() {
        const form = this.rootNode.querySelector('.modal__form');
        const validate = this.validateSignup;
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

            store.dispatch(actionRegister(user));
        });
    }
}
