import templateLogin from '@components/Login/login.handlebars';
import {
    checkEmail, checkPassword, renderError, removeError,
} from '@utils/valid.js';
import { Component } from '@components/Component.js';
import { Modal, exit } from '@components/Modal/modal.js';
import { store } from '@store/Store.js';
import { actionLogin } from '@store/actionCreater/userActions.js';
import { responsStatuses } from '@config/config.js';

/**
* Отрисовывает логин.
* Прокидывает actions в стору для логина
* Также подписывается на изменения статуса логина, 
* для корректного рендера ошибки
*
*/
export class Login extends Component {
    /**
     * Cохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props) {
        super(props);
        this.state = {
            statusLogin: null,
            isSubscribed: false,
        };

        this.subscribeLoginpStatus = this.subscribeLoginpStatus.bind(this);
    }

    /**
     * Обрабатывает статус ответа
     * @param {number} userStatus - статус логина
     */
    handlerStatus(userStatus) {
        const form = this.rootNode.querySelector('.modal__wrapper__input');
        if (userStatus === responsStatuses.BadRequest) {
            renderError(form, 'email', 'Такой пользователь не зарегистирован');
            return;
        }
        const wrapper = document.getElementById('login_password');

        if (userStatus === responsStatuses.Forbidden) {
            renderError(wrapper, 'password', 'Неверный пароль');
        }
    }

    /**
     * Рендерит логин
     */
    render() {
        if (store.getState('user')) {
            const background = document.body.querySelector('.modal__background');
            if (background) {
                background.remove();
                document.body.classList.remove('body_hide_y_scroll');
                exit();
            }
            return;
        }

        if (this.state.statusLogin) {
            this.handlerStatus(this.state.statusLogin);
            return;
        }

        const windowModal = this.rootNode.querySelector('.modal__window__flex');
        if (windowModal) {
            windowModal.replaceChildren();
        } else {
            const modal = new Modal(this.rootNode);
            modal.render();
        }

        const modalWindow = this.rootNode.querySelector('.modal__window__flex');

        modalWindow.insertAdjacentHTML('afterbegin', templateLogin());
        this.componentDidMount();
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

        Object.keys(user).forEach((key) => {
            if (keyup && !user[key]) {
                removeError(form, key);
                return;
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
        });

        if (flag) {
            return user;
        }

        return null;
    }

    /**
     * Обёртка над функции, вызываемой при событии выхода из логина
     */
    deleteLogin(e) {
        const { target } = e;
        if (target.classList.contains('modal__background')) {
            exit();
        }
    }

    /**
     * Навешивает обработчики на валидацию и на выход
     */
    componentDidMount() {
        const form = this.rootNode.querySelector('.modal__form');

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
            if (!this.state.isSubscribed) {
                store.subscribe('statusLogin', this.subscribeLoginpStatus);
                this.state.isSubscribed = true;
            }
        });

        const { deleteLogin } = this;
        document.body
            .querySelector('.modal__background')
            .addEventListener('click', deleteLogin);
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        const modalBackground = document.body
            .querySelector('.modal__background');
        const { deleteLogin } = this;
        if (modalBackground) {
            modalBackground.removeEventListener('click', deleteLogin);
        }
        if (this.state.isSubscribed) {
            store.subscribe('statusLogin', this.subscribeLoginpStatus);
            this.state.statusLogin = null;
            this.state.isSubscribed = false;
        }
    }

    /**
     * Функция, вызываемая при изменении statusLogin в store
     */
    subscribeLoginpStatus() {
        this.state.statusLogin = store.getState('statusLogin');
        this.render();
    }
}
