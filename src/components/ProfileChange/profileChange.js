import { actionPutSettings } from '@store/actionCreater/userActions.js';
import { Component } from '@components/Component.js';
import templateProfile from '@views/userProfile/userProfile.handlebars';
import templateProfileChange from '@components/ProfileChange/profileChange.handlebars';
import templateProfileMenu from '@components/ProfileMenu/profileMenu.handlebars';
import { profile } from '@views/UserProfile/UserProfile.js';
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
            const wrapper = this.rootNode.querySelector('.profile__wrapper__password');
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

    /**
     * Проверяет пользовательский ввод
     * @param {Element} form - форма
     * @param {Bool} keyup - режим проверки полей: true - по одному, false все
     */
    validateProfile(form, keyup = false) {
        const nickInput = form.querySelector('input[type=text]');
        const passwordInput = form.querySelector('input[type=password]');
        const confirmInput = form.querySelector('.profile__wrapper__password').childNodes[1];

        const user = {};
        user.nickname = nickInput.value.trim();
        user.password = passwordInput.value;
        user.confirmPassword = confirmInput.value;

        let flag = true;

        for (const key of Object.keys(user)) {
            if (keyup && !user[key]) {
                if (key === 'nickname') {
                    removeError(form, 'text');
                } else {
                    removeError(confirmInput.parentElement, key);
                }
                continue;
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

            if (key === 'nickname') {
                if (!checkNick(form, user[key])) {
                    flag = false;
                }
            }
        }

        if (flag) {
            return {
                nickname: user.nickname,
                password: user.password,
            };
        }

        return null;
    }

    addValidate() {
        const form = this.rootNode.querySelector('.profile__form');
        const validate = this.validateProfile;
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

            store.dispatch(actionPutSettings(user));
        });
    }
}
