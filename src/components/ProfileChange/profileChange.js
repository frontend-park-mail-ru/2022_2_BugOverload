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

export class ProfileChange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            user: props.user,
            statusChangeSettings: null,
        };
    }

    handlerStatusPut() {
        if (this.state.statusChangeSettings === 403) {
            const wrapper = this.rootNode.querySelector('.profile__wrapper__old__password');
            renderError(wrapper, 'password', 'Неправильный пароль');
        }
    }

    componentDidMount() {
        const subscribeFunc = () => {
            this.state.statusChangeSettings = store.getState('statusChangeSettings');
            this.handlerStatusPut();
        };

        const changeButton = this.rootNode.querySelector('.profile__change__svg');
        changeButton.addEventListener('click', () => {
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
        });
    }

    addValidate() {
        const forms = {};
        forms.formNick = this.rootNode.querySelector('.profile__form__nick');
        forms.formPassword = this.rootNode.querySelector('.profile__form__password');
        let user;

        for (const key in forms) {
            let validate;
            key === 'formNick'?
                validate = this.validateNick:
                validate = this.validatePassword;
            console.log(forms[key])
            
            forms[key].addEventListener('keyup', (e) => {
                e.preventDefault();
                validate(forms[key], true);
            });
    
            forms[key].addEventListener('submit', (e) => {
                e.preventDefault();
                user = validate(forms[key]);
                if (!user) {
                    return;
                }
    
                store.dispatch(actionPutSettings(user));
            });
        };
    }

    /**
     * Проверяет пользовательский ввод
     * @param {Element} form - форма
     * @param {Bool} keyup - режим проверки полей: true - по одному, false все
     */
    validateNick(form, keyup = false) {
        console.log(form)
        const nickInput = form.querySelector('input[type=text]');

        const user = {};
        user.nickname = nickInput.value.trim();

        let flag = true;

        if (keyup && !user.nickname) {
            removeError(form, 'text');
        } else {
            if (!checkNick(form, user.nickname)) {
                flag = false;
            }
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
        console.log('Password')
        const oldPassword = form.querySelector('.profile__wrapper__old__password').childNodes[1];
        const passwordInput = form.querySelector('.profile__input');
        const confirmInput = form.querySelector('.profile__wrapper__password').childNodes[1];

        const user = {};
        user.oldPassword = oldPassword.value;
        user.password = passwordInput.value;
        user.confirmPassword = confirmInput.value;

        let flag = true;

        for (const key of Object.keys(user)) {
            if (keyup && !user[key]) {
                if(key === 'oldPassword'){
                    removeError(oldPassword.parentElement, 'password');
                }
                if(key === 'password'){
                    removeError(confirmInput.parentElement, 'password');
                }

                continue;
            }

            if(key === 'password' || key === 'confirmPassword') {
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

            if(key === 'oldPassword') {
                console.log(checkPassword(confirmInput.parentElement, user.oldPassword))
                if (!checkPassword(oldPassword.parentElement, user.oldPassword)) {
                    flag = false;
                }
            }
        }

        if (flag) {
            return {
                password: user.password,
                oldPassword: user.oldPassword,
            };
        }

        return null;
    }
}
