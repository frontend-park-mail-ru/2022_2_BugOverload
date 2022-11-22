import { actionPutSettings, actionAuth } from '@store/actionCreater/userActions';
import { Component } from '@components/Component';
import templateProfile from '@views/UserProfile/userProfile.handlebars';
import templateProfileChange from '@components/ProfileChange/profileChange.handlebars';
import templateProfileMenu from '@components/ProfileMenu/profileMenu.handlebars';
import { profile } from '@views/UserProfile/userProfile';
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
        };

        this.handlerUserChangeForm = this.handlerUserChangeForm.bind(this);
    }

    handlerUserChangeForm () {
        const subscribeFunc = () => {
            this.state.statusChangeSettings = store.getState('statusChangeSettings');
            this.handlerStatusPut();
        };

        const profileElement = this.rootNode.querySelector('.js-profile');
        if (profileElement) {
            profileElement.remove();
        }
        if (!this.state.isOpen) {
            this.rootNode.insertAdjacentHTML('beforeend', templateProfile(
                {
                    profileMenu: templateProfileMenu(),
                    profileChange: templateProfileChange(),
                    ...this.state.user,
                },
            ));
            this.addValidate();
            store.subscribe('statusChangeSettings', subscribeFunc);
            this.state.isOpen = true;

            this.rootNode
                .querySelector('.js-profile__change__svg')
                .addEventListener('click', () => {
                    if (this.state.isOpen) {
                        profile.render();
                    }
                    store.unsubscribe('statusChangeSettings', subscribeFunc);
                });
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
    }

    /**
     * Отписывает компонент от всего
     */
    componentWillUnmount() {
        const changeButton = this.rootNode.querySelector('.js-profile__change__svg');
        changeButton.removeEventListener('click', this.handlerUserChangeForm);
    }

    /**
     * Навешивает валидацию на форму
     */
    addValidate() {
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
