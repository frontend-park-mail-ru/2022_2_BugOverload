import {
    checkEmail, checkPassword, renderError, removeError,
} from '@utils/valid';
import { Component } from '@components/Component';
import { Modal, exit } from '@components/Modal/modal';
import { store } from '@store/Store';
import { actionLogin } from '@store/actionCreater/userActions';
import { responsStatuses } from '@config/config';
import { LoginUI } from 'moviegate-ui-kit';

export interface Login {
    state: {
        statusLogin: number,
        isSubscribed: boolean,
        isUserSubscriber: boolean,
    }
}

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
    constructor(props :componentProps) {
        super(props);
        this.state = {
            statusLogin: null,
            isSubscribed: false,
            isUserSubscriber: false,
        };

        this.subscribeLoginpStatus = this.subscribeLoginpStatus.bind(this);
        this.subscribeLogin = () => {
            console.log(this)
            this.render();
        };
    }

    /**
     * Обрабатывает статус ответа
     * @param {number} userStatus - статус логина
     */
    handlerStatus(userStatus :number) {
        const form = this.rootNode.querySelector('.js-modal__wrapper__input') as HTMLElement;
        if (userStatus === responsStatuses.NotFound) {
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
            this.componentWillUnmount();
            exit();
            return;
        }

        if (!this.state.isUserSubscriber) {
            store.subscribe('user', this.subscribeLogin);
            this.state.isUserSubscriber = true;
        }

        if (this.state.statusLogin) {
            this.handlerStatus(this.state.statusLogin);
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
        modalWindow.insertAdjacentHTML('afterbegin', LoginUI.renderTemplate());
        this.componentDidMount();
    }

    /**
     * Проверяет пользовательский ввод
     * @param {Element} form - форма логина
     * @param {Bool} keyup - режим проверки полей: true - по одному, false все
     */
    validateLogin(form :HTMLElement, keyup = false) {
        const user = {} as user;
        const emailInput = form.querySelector('input[type=email]') as HTMLInputElement;
        const passwordInput = form.querySelector('input[type=password]') as HTMLInputElement;
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
    deleteLogin(e :Event) {
        const target  = e.target as HTMLElement;
        if (target.classList.contains('modal__background')) {
            exit();
        }
    }

    /**
     * Навешивает обработчики на валидацию и на выход
     */
    componentDidMount() {
        const form = this.rootNode.querySelector('.js-modal__form') as HTMLElement;

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

            if (!this.state.isSubscribed) {
                store.subscribe('statusLogin', this.subscribeLoginpStatus);
                this.state.isSubscribed = true;
            }
            store.dispatch(actionLogin(user));
        });

        const pathBeforModal = window.localStorage.getItem('pathBeforModal');

        const jsModalBackground = document.body.querySelector('.js-modal__background') as HTMLElement;

        jsModalBackground.dataset.section = pathBeforModal;
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            store.unsubscribe('statusLogin', this.subscribeLoginpStatus);
            this.state.statusLogin = null;
            this.state.isSubscribed = false;
        }
        if (this.state.isUserSubscriber) {
            store.unsubscribe('user', this.subscribeLogin);
            this.state.isUserSubscriber = false;
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
