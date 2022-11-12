import { View } from '@views/View.js';
import templateProfile from '@views/UserProfile/userProfile.handlebars';
import templateProfileMenu from '@components/ProfileMenu/profileMenu.handlebars';
import { store } from '@store/Store.js';
import { actionGetSettings, actionPutAvatar, actionAuth } from '@store/actionCreater/userActions.js';
import { ProfileChange } from '@components/ProfileChange/profileChange.js';
import { ShowMessage } from '@components/Message/message.js';
import { hrefRegExp } from '@config/regExp.js';

class UserProfile extends View {
    constructor(props) {
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

    render() {
        const profile = this.rootNode.querySelector('.js-profile');
        if (profile) {
            profile.remove();
        }

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
                profile.remove();
                window.history.replaceState(
                    null,
                    null,
                    window.location.href.replace(hrefRegExp.auth, ''),
                );
                return;
            }
            store.subscribe('user', this.userProfileOnSubscribe);

            return;
        }

        if (!this.state.isDispatchedInfo) {
            store.dispatch(actionGetSettings());
            this.state.isDispatchedInfo = true;
        }

        this.state.userInfo = store.getState('userInfo');
        this.rootNode.insertAdjacentHTML('beforeend', templateProfile(
            {
                profileMenu: templateProfileMenu(),
                ...this.state.user,
                ...this.state.userInfo,
            },
        ));

        const inputImgForm = this.rootNode.querySelector('.js-profile__img__form');
        inputImgForm.addEventListener('change', (e) => {
            e.preventDefault();
            const formData = new FormData(inputImgForm);
            store.dispatch(actionPutAvatar(formData));
            const reader = new FileReader();
            reader.onload = () => {
                this.rootNode.querySelector('.profile__avatar').src = reader.result;
            };
            reader.readAsDataURL(formData.get('object'));
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

    userProfileOnSubscribe() {
        this.state.user = store.getState('user');
        this.render();
    }

    setProfileAvatar() {
        setTimeout(() => {
            store.dispatch(actionAuth());
            if(store.getState('statusChangeAvatar')) {
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
