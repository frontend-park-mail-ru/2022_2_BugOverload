import templateSignup from '@components/Signup/signup.handlebars';
import {
    checkEmail, checkPassword, checkConfirmPassword, checkNick, renderError, removeError,
} from '@utils/valid.js';
import { Component } from '@components/Component.js';
import { Modal, exit } from '@components/Modal/modal.js';
import { store } from '@store/Store.js';
import { actionRegister } from '@store/actionCreater/userActions.js';
import { responsStatuses } from '@config/config.js';
import { hrefRegExp } from '@config/regExp.js';

/**
* Отрисовывает регистрацию.
* Прокидывает actions в стору для логина
* Также подписывается на изменения статуса регистрации,
* для корректного рендера ошибки
*
*/
export class Signup extends Component {
    /**
     * Cохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props) {
        super(props);
        this.state = {
            statusSignup: null,
            isSubscribed: false,
            isUserSubscriber: false,
        };

        this.subscribeSignupStatus = this.subscribeSignupStatus.bind(this);
        this.subscribeSignup = this.subscribeSignup.bind(this);
    }

    /**
     * Обрабатывает статус ответа
     */
    handlerStatus() {
        if (this.state.statusSignup === responsStatuses.BadRequest) {
            const wrapper = document.getElementById('signup_email');
            renderError(wrapper, 'email', 'Пользователь с таким email уже зарегистрирован');
        }
    }

    /**
     * Рендерит регистрацию
     */
    render() {
        if (store.getState('user')) {
            this.componentWillUnmount();
            exit();
            return;
        }

        if (!this.state.isUserSubscriber) {
            store.subscribe('user', this.subscribeSignup);
            this.state.isUserSubscriber = true;
        }

        if (this.state.statusSignup) {
            this.handlerStatus(this.state.statusSignup);
            return;
        }

        const windowModal = this.rootNode.querySelector('.js-modal__window__flex');
        if (windowModal) {
            windowModal.replaceChildren();
        } else {
            const modal = new Modal(this.rootNode);
            modal.render();
        }

        const modalWindow = this.rootNode.querySelector('.js-modal__window__flex');
        modalWindow.insertAdjacentHTML('afterbegin', templateSignup());
        this.componentDidMount();
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
        const confirmPassword = confirmInput.querySelector('.js-modal__input').value;

        let flag = true;

        Object.keys(user).forEach((key) => {
            if (keyup && !user[key]) {
                if (key === 'nickname') {
                    removeError(form, 'text');
                } else {
                    removeError(form, key);
                }
                return;
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
        });

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
     * Навешивает обработчики на валидацию и на выход
     */
    componentDidMount() {
        const form = this.rootNode.querySelector('.js-modal__form');
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
            if (!this.state.isSubscribed) {
                store.subscribe('statusSignup', this.subscribeSignupStatus);
                this.state.isSubscribed = true;
            }
        });

        const pathBeforModal = window.localStorage.getItem('pathBeforModal');

        document.body
            .querySelector('.js-modal__background')
            .dataset.section = pathBeforModal;
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            store.unsubscribe('statusSignup', this.subscribeSignupStatus);
            this.state.statusSignup = null;
            this.state.isSubscribed = false;
        }
        if (this.state.isUserSubscriber) {
            store.unsubscribe('user', this.subscribeSignup);
            this.state.isUserSubscriber = false;
        }
    }

    /**
     * Функция, вызываемая при изменении statusSignup в store
     */
    subscribeSignupStatus() {
        this.state.statusSignup = store.getState('statusSignup');
        this.render();
    }

    subscribeSignup() {
        this.render();
    }
}
