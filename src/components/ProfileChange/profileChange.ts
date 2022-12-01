import { actionPutSettings, actionAuth } from '@store/actionCreater/userActions';
import { Component } from '@components/Component';
import {
    checkPassword, checkConfirmPassword, checkNick, removeError, renderError,
} from '@utils/valid';
import { store } from '@store/Store';
import { responsStatuses } from '@config/config';
import { ShowMessage } from '@components/Message/message';

export interface ProfileChange {
    state: {
        isOpen: boolean,
        user: user,
        statusChangeSettings: number,
        isAddValidate: boolean,
    }
}

/**
* Отрисовывает форму изменения пользовательских данных.
* Прокидывает actions в стору для отправки новых данных,
* также, после успеш подписывается на статус запроса, для правильного рендера ошибки
*
*/
export class ProfileChange extends Component {
    /**
     * Cохраняет props и обработчик статуса запроса
     * @param {Object} props - параметры компонента
     */
    constructor(props :componentProps) {
        super(props);

        this.state = {
            isOpen: false,
            user: props.user,
            statusChangeSettings: null,
            isAddValidate: false,
        };

        this.handlerUserChangeForm = this.handlerUserChangeForm.bind(this);
        this.subscribeFuncChangeProfile = this.subscribeFuncChangeProfile.bind(this);
    }

    subscribeFuncChangeProfile() {
        this.state.statusChangeSettings = store.getState('statusChangeSettings');
        this.handlerStatusPut();
    }

    handlerUserChangeForm () {
        console.log('work')
        if (!this.state.isOpen) {
            const changeWrapper = document.querySelector('.profile__change');

            console.log('changeWrapper', changeWrapper.classList.contains('dysplay-none'))
            if(changeWrapper.classList.contains('dysplay-none')) {
                changeWrapper.classList.remove('dysplay-none');
            }
            changeWrapper.classList.add('dysplay-flex');

            if(!this.state.isAddValidate) {
                this.state.isAddValidate = true;
                this.addValidate();
            }

            store.subscribe('statusChangeSettings', this.subscribeFuncChangeProfile);
            this.state.isOpen = true;
        } else {
            const changeWrapper = document.querySelector('.profile__change');
            if(changeWrapper.classList.contains('dysplay-flex')) {
                changeWrapper.classList.remove('dysplay-flex');
            }
            changeWrapper.classList.add('dysplay-none');
            this.state.isOpen = false;
            store.unsubscribe('statusChangeSettings', this.subscribeFuncChangeProfile);
        }
    };

    /**
     * Обработчик статуса запроса
     */
    handlerStatusPut() {
        if (this.state.statusChangeSettings === responsStatuses.Forbidden) {
            const wrapper = this.rootNode.querySelector('.js-profile__wrapper__old__password') as HTMLElement;
            renderError(wrapper, 'password', 'Неправильный пароль');
        } else {
            store.dispatch(actionAuth());
            ShowMessage('Успех!', 'positive');
        }
    }

    /**
     * Подписывает компонент
     */
    componentDidMount() {
        const changeButton = this.rootNode.querySelector('.js-profile__change__svg');
        changeButton.addEventListener('click', this.handlerUserChangeForm);
        console.log('changeWrapper', changeButton)
    }

    /**
     * Отписывает компонент от всего
     */
    componentWillUnmount() {
        const changeButton = this.rootNode.querySelector('.js-profile__change__svg');
        if (!changeButton) {
            return;
        }
        changeButton.removeEventListener('click', this.handlerUserChangeForm);
        this.state.isAddValidate = false;
    }

    /**
     * Навешивает валидацию на форму
     */
    addValidate() {
        if(this.state.isAddValidate) {
            return;
        }
        const forms = {
            formNick: null as HTMLElement,
            formPassword: null as HTMLElement,
        } as {
            [index: string]:any;
        };
        forms.formNick = this.rootNode.querySelector('.js-profile__form__nick');
        forms.formPassword = this.rootNode.querySelector('.js-profile__form__password');

        Object.keys(forms).forEach((key) => {
            let validate :Function;
            if (key === 'formNick') {
                validate = this.validateNick;
            } else {
                validate = this.validatePassword;
            }

            forms[key].addEventListener('keyup', (e :Event) => {
                e.preventDefault();
                validate(forms[key], true);
            });

            forms[key].addEventListener('submit', (e :Event) => {
                e.preventDefault();
                const user = validate(forms[key]);
                if (!user) {
                    return;
                }

                store.dispatch(actionPutSettings(user));
            });
        });

        this.state.isAddValidate = true;
    }

    /**
     * Проверяет пользовательский ввод
     * @param {Element} form - форма
     * @param {Bool} keyup - режим проверки полей: true - по одному, false все
     */
    validateNick(form :HTMLElement, keyup = false) {
        const nickInput = form.querySelector('input[type=text]') as HTMLInputElement;

        const user = {} as user;
        user.nickname = nickInput.value.trim();

        let flag = true;

        if (keyup && !user.nickname) {
            removeError(form, 'text');
        } else if (!checkNick(form, user.nickname)) {
            flag = false;
        }

        if (flag) {
            return {
                nickname: user.nickname,
            };
        }

        return null;
    }

    /**
     * Проверяет пользовательский ввод
     * @param {Element} form - форма
     * @param {Bool} keyup - режим проверки полей: true - по одному, false все
     */
    validatePassword(form :HTMLElement, keyup = false) {
        const oldPassword = form.querySelector('.js-profile__wrapper__old__password').childNodes[1]  as HTMLInputElement;
        const passwordInput = form.querySelector('.js-profile__input')  as HTMLInputElement;
        const confirmInput = form.querySelector('.js-profile__wrapper__password').childNodes[1]  as HTMLInputElement;

        const user = {} as user;
        user.oldPassword = oldPassword.value;
        user.password = passwordInput.value;
        user.confirmPassword = confirmInput.value;

        let flag = true;

        Object.keys(user).forEach((key) => {
            if (keyup && !user[key]) {
                if (key === 'oldPassword') {
                    removeError(oldPassword.parentElement, 'password');
                }
                if (key === 'password') {
                    removeError(confirmInput.parentElement, 'password');
                }

                return;
            }

            if (key === 'password' || key === 'confirmPassword') {
                if (!checkConfirmPassword(
                    confirmInput.parentElement,
                    user.confirmPassword,
                    user.password,
                )) {
                    flag = false;
                } else if (!checkPassword(confirmInput.parentElement, user.confirmPassword)) {
                    flag = false;
                }
            }

            if (key === 'oldPassword') {
                if (!checkPassword(oldPassword.parentElement, user.oldPassword)) {
                    flag = false;
                }
            }
        });

        if (flag) {
            return {
                new_password: user.password,
                cur_password: user.oldPassword,
            };
        }

        return null;
    }
}
