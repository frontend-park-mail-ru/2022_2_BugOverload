import templateLogin from '@components/Login/login.handlebars';
import {
    checkEmail, checkPassword, renderError, removeError,
} from '@utils/valid.js';
import { Component } from '@components/Component.js';
import { Modal } from '@components/Modal/modal.js';
import { store } from '@store/Store.js';
import { actionLogin } from '@store/actionCreater/userActions.js';
import { responsStatuses } from '@config/config.js';

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
            statusLogin: null,
        };
        store.subscribe('statusLogin', () => {
            this.state.statusLogin = store.getState('statusLogin');
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
                dispatchExitLogin();
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

    deleteLogin(e) {
        const { target } = e;
        if (target.classList.contains('modal__background')) {
            dispatchExitLogin();
        }
    }

    /**
     * Навешивает обработчики на валидацию и на смену url при выходе
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

        const { deleteLogin } = this;
        document.body
            .querySelector('.modal__background')
            .addEventListener('click', deleteLogin);
    }

    componentWillUnmount() {
        const modalBackground = document.body
            .querySelector('.modal__background');
        const { deleteLogin } = this;
        if (modalBackground) {
            modalBackground.removeEventListener('click', deleteLogin);
        }
    }
}

const dispatchExitLogin = () => {
    const redirectMain = new Event(
        'click',
        {
            bubbles: true,
            cancelable: true,
        },
    );
    document.body.querySelector('a[data-section="/"]').dispatchEvent(redirectMain);
};
