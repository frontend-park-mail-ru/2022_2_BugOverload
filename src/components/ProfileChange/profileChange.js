import { actionPutSettings } from '@store/actionCreater/userActions.js';
import { Component } from '@components/Component.js';
import templateProfile from '@views/UserProfile/userProfile.handlebars';
import templateProfileChange from '@components/ProfileChange/profileChange.handlebars';
import templateProfileMenu from '@components/ProfileMenu/profileMenu.handlebars';
import { profile } from '@views/UserProfile/userProfile.js';
import {
    checkPassword, checkConfirmPassword, checkNick, removeError, renderError,
} from '@utils/valid.js';
import { store } from '@store/Store.js';
import { responsStatuses } from '@config/config.js';

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
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            user: props.user,
            statusChangeSettings: null,
        };

       /**
        * Сохраняет обработчик формы
        * для последующей передачи в EventListener
        */
        this.handlerUserChangeForm = () => {
            const subscribeFunc = () => {
                this.state.statusChangeSettings = store.getState('statusChangeSettings');
                this.handlerStatusPut();
            };

            const profileElement = this.rootNode.querySelector('.profile');
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
                    .querySelector('.profile__change__svg')
                    .addEventListener('click', () => {
                        if (this.state.isOpen) {
                            profile.render();
                        }
                        store.unsubscribe('statusChangeSettings', subscribeFunc);
                    });
            }
        };
    }

    /**
     * Обработчик статуса запроса
     */
    handlerStatusPut() {
        if (this.state.statusChangeSettings === responsStatuses.Forbidden) {
            const wrapper = this.rootNode.querySelector('.profile__wrapper__old__password');
            renderError(wrapper, 'password', 'Неправильный пароль');
        }
    }

    /**
     * Отписывает компонент от всего
     */
    componentDidMount() {
        const changeButton = this.rootNode.querySelector('.profile__change__svg');
        changeButton.addEventListener('click', this.handlerUserChangeForm);
    }

    /**
     * Подписывает компонент
     */
    componentWillUnmount() {
        const changeButton = this.rootNode.querySelector('.profile__change__svg');
        changeButton.removeEventListener('click', this.handlerUserChangeForm);
    }

    /**
     * Навешивает валидацию на форму
     */
    addValidate() {
        const forms = {};
        forms.formNick = this.rootNode.querySelector('.profile__form__nick');
        forms.formPassword = this.rootNode.querySelector('.profile__form__password');

        Object.keys(forms).forEach((key) => {
            let validate;
            if (key === 'formNick') {
                validate = this.validateNick;
            } else {
                validate = this.validatePassword;
            }

            forms[key].addEventListener('keyup', (e) => {
                e.preventDefault();
                validate(forms[key], true);
            });

            forms[key].addEventListener('submit', (e) => {
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
    validateNick(form, keyup = false) {
        const nickInput = form.querySelector('input[type=text]');

        const user = {};
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
    validatePassword(form, keyup = false) {
        const oldPassword = form.querySelector('.profile__wrapper__old__password').childNodes[1];
        const passwordInput = form.querySelector('.profile__input');
        const confirmInput = form.querySelector('.profile__wrapper__password').childNodes[1];

        const user = {};
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
                password: user.password,
                oldPassword: user.oldPassword,
            };
        }

        return null;
    }
}
