import templateLogin from '@components/Login/login.handlebars';
import {
    checkEmail, checkPassword, renderError, removeError,
} from '@utils/valid.js';
import { Component } from '@components/Component.js';
import { Modal } from '@components/Modal/modal.js';
import { store } from '@store/Store.js';
import { actionLogin } from '@store/actionCreater/userActions.js';

/**
* Отрисовывает логин.
* Обращается к бэкенду для проверки пользователя при логине
*
*/
export class Login extends Component {
    /**
     * Cохраняет rootNode.
     * @param {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
        store.subscribe('statusLogin', () => {
            this.state.statusLogin = store.getSate('statusLogin');
            this.render();
        });
    }

    /**
     * Отсылает пользовательский ввод и обрабатывает ответ бэкенда
     * @param {Object} user - провалидированный пользовательский ввод
     * @param {string} user.email - введённая почта
     * @param {string} user.password - введённый пароль
     */
    handlerStatus(userStatus) {
        const form = this.rootNode.querySelector('.modal__wrapper__input');
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
        if (!this.rootNode.querySelector('.modal__window')) {
            const modal = new Modal(this.rootNode);
            modal.render();
        }

        if (store.getSate('user')) {
            document.body
                .querySelector('.modal__background')
                .remove();

            return;
        }

        if (this.state.statusLogin) {
            this.handlerStatus(userStatus);
            return;
        }

        const modalWindow = this.rootNode.querySelector('.modal__window__flex');

        modalWindow.insertAdjacentHTML('afterbegin', templateLogin());
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
        });
    }
}
