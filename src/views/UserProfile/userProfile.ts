import { View } from '@views/View';
import templateProfile from '@views/UserProfile/userProfile.handlebars';
import templateProfileMenu from '@components/ProfileMenu/profileMenu.handlebars';
import { store } from '@store/Store';
import { actionGetSettings, actionPutAvatar, actionAuth } from '@store/actionCreater/userActions';
import { ProfileChange } from '@components/ProfileChange/profileChange';
import { ShowMessage } from '@components/Message/message';
import { hrefRegExp } from '@config/regExp';

interface UserProfile{
    state: {
        user: user,
        putAvatarStatus: number,
        userInfo: userInfo,
        isAuthSubscribed: boolean,
        isDispatchedInfo: boolean,
        isSubscribed: boolean,
    }
}

/**
* Страница пользователя, получает пользователя из store
* Дополнительно прокидыват actions в store для получения
* пользовательских данных и их изменения
*
*/
class UserProfile extends View {
    /**
     * Cохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props :componentProps) {
        super(props);
        this.state = {
            user: null,
            putAvatarStatus: null,
            userInfo: null,
            isAuthSubscribed: false,
            isDispatchedInfo: false,
            isSubscribed: false,
        };

        this.userProfileOnSubscribe = this.userProfileOnSubscribe.bind(this);
        this.setProfileAvatar = this.setProfileAvatar.bind(this);
        this.subscribeInfoFunc = this.subscribeInfoFunc.bind(this);
        this.authProfileOnSubscribe = this.authProfileOnSubscribe.bind(this);
    }

    /**
     * Рендерит профиль
     */
    render() {
        super.render();

        if (!this.state.isSubscribed) {
            store.subscribe('logoutStatus', this.userProfileOnSubscribe);
            store.subscribe('userInfo', this.subscribeInfoFunc);
            store.subscribe('statusChangeAvatar', this.setProfileAvatar);
            this.state.isSubscribed = true;
        }

        if (!this.state.isAuthSubscribed) {
            store.subscribe('authStatus', this.authProfileOnSubscribe);
            this.state.isAuthSubscribed = true;
        }

        this.state.user = store.getState('user');
        if (!this.state.user) {
            const authStatus = store.getState('authStatus');
            const logoutStatus = store.getState('logoutStatus');
            if (authStatus || logoutStatus) {
                this.componentWillUnmount();
                const removeProfile = this.rootNode.querySelector('.js-profile');
                if (removeProfile) {
                    removeProfile.remove();
                }
                window.history.replaceState(
                    null,
                    null,
                    window.location.href.replace(hrefRegExp.auth, ''),
                );

                const redirectMain = new Event(
                    'click',
                    {
                        bubbles: true,
                        cancelable: true,
                    },
                );
                this.rootNode.querySelector('a[data-section="/"]').dispatchEvent(redirectMain);

                return;
            }
            store.subscribe('user', this.userProfileOnSubscribe);

            return;
        }

        if (!this.state.isDispatchedInfo) {
            store.dispatch(actionGetSettings());
            this.state.isDispatchedInfo = true;
        }

        const profile = this.rootNode.querySelector('.js-profile');
        if (profile) {
            profile.remove();
        }
        this.state.userInfo = store.getState('userInfo');
        this.rootNode.insertAdjacentHTML('beforeend', templateProfile(
            {
                profileMenu: templateProfileMenu(),
                ...this.state.user,
                ...this.state.userInfo,
            },
        ));

        const inputImgForm = this.rootNode.querySelector('.js-profile__img__form') as HTMLFormElement;
        inputImgForm.addEventListener('change', (e) => {
            e.preventDefault();
            const formData = new FormData(inputImgForm);
            store.dispatch(actionPutAvatar(formData));
            ShowMessage('Ваш запрос выполняется...', 'positive', 4000);

            const reader = new FileReader();
            reader.onload = () => {
                const imgAvatar = this.rootNode.querySelector('.profile__avatar') as HTMLImageElement;
                imgAvatar.src = reader.result as string;
            };
            const blobUrl = formData.get('object') as Blob;
            reader.readAsDataURL(blobUrl);
        });

        const profileChange = new ProfileChange({
            rootNode: this.rootNode,
            user: Object.assign(
                this.state.user,
                this.state.userInfo,
            ),
        });
        profileChange.componentDidMount();
    }

    /**
    * Функция, вызываемая при изменении пользователя в store если компонент подписан
    */
    userProfileOnSubscribe() {
        this.state.user = store.getState('user');
        this.render();
    }

    /**
    * Функция, вызываемая при изменении statusChangeAvatar в store
    */
    setProfileAvatar() {
        setTimeout(() => {
            store.dispatch(actionAuth());
            if (store.getState('statusChangeAvatar')) {
                ShowMessage('Успех!', 'positive');
            } else {
                ShowMessage('Поробуйте отправить картинку меньшего размера...', 'negative');
            }
        }, 4000);
    }

    subscribeInfoFunc() {
        this.render();
    }

    authProfileOnSubscribe() {
        this.state.user = store.getState('user');
        if (this.state.user) {
            store.dispatch(actionGetSettings());
        }
        this.render();
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            store.unsubscribe('logoutStatus', this.userProfileOnSubscribe);
            store.unsubscribe('statusChangeAvatar', this.setProfileAvatar);
            store.unsubscribe('userInfo', this.subscribeInfoFunc);
            this.state.isSubscribed = false;
        }

        store.unsubscribe('user', this.userProfileOnSubscribe);

        if (this.state.isAuthSubscribed) {
            store.unsubscribe('authStatus', this.authProfileOnSubscribe);
            this.state.isAuthSubscribed = false;
        }

        this.state.isDispatchedInfo = false;
    }
}

export const profile = new UserProfile({ rootNode: document.getElementById('root') });
