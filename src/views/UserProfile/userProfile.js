import { View } from '@views/View.js';
import templateProfile from '@views/UserProfile/userProfile.handlebars';
import templateProfileMenu from '@components/ProfileMenu/profileMenu.handlebars';
import { store } from '@store/Store.js';
import { actionGetSettings, actionPutAvatar, actionAuth } from '@store/actionCreater/userActions.js';
import { ProfileChange } from '@components/ProfileChange/profileChange.js';

class UserProfile extends View {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            putAvatarStatus: null,
            userInfo: null,
            subscribeedOnUser: false,
            subscribeedOnLogout: false,
            subscribeedOnAvatar: false,
            subscribeedOnAuth: false,
        };
    }

    render() {
        super.render();

        if (!this.state.subscribeedOnLogout) {
            store.subscribe('logoutStatus', userProfileOnSubscribe);
            this.state.subscribeedOnLogout = true;
        }

        if (!this.state.subscribeedOnUser) {
            store.subscribe('user', userProfileOnSubscribe);
            this.state.subscribeedOnUser = true;
        }

        if (!this.state.subscribeedOnAuth) {
            store.subscribe('authStatus', userProfileOnSubscribe);
            this.state.subscribeedOnAuth = true;
        }

        if (!this.state.user) {
            const authStatus = store.getState('authStatus');
            const logoutStatus = store.getState('logoutStatus');
            if (authStatus || logoutStatus) {
                this.componentWillUnmount();
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
            store.dispatch(actionAuth());

            return;
        }

        const profile = this.rootNode.querySelector('.js-profile');
        if (profile) {
            profile.remove();
        }
        this.rootNode.insertAdjacentHTML('beforeend', templateProfile(
            {
                profileMenu: templateProfileMenu(),
                ...this.state.user,
                ...this.state.userInfo,
            },
        ));

        const subscribeFunc = () => {
            console.log('sub')
            this.state.userInfo = store.getState('userInfo');
            this.render();
        };
        if (!this.state.userInfo) {
            store.subscribe('userInfo', subscribeFunc);
            store.dispatch(actionGetSettings());
        } else {
            store.unsubscribe('userInfo', subscribeFunc);
        }

        if(!this.state.subscribeedOnAvatar) {
            store.subscribe('statusChangeAvatar', setProfileAvatar);
            this.state.subscribeedOnAvatar = true;
        }

        const inputImgForm = this.rootNode.querySelector('.js-profile__img__form');
        inputImgForm.addEventListener('change', (e) => {
            e.preventDefault();
            const formData = new FormData(inputImgForm);
            store.dispatch(actionPutAvatar(formData));
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

    componentWillUnmount() {
        store.unsubscribe('user', userProfileOnSubscribe);
        store.unsubscribe('logoutStatus', userProfileOnSubscribe);
        store.unsubscribe('authStatus', userProfileOnSubscribe);
        store.unsubscribe('statusChangeAvatar', setProfileAvatar);
        
        this.state.subscribeedOnAvatar = false;
        this.state.subscribeedOnUser = false;
        this.state.subscribeedOnLogout = false;
        this.state.subscribeedOnAuth = false;
    }
}

export const profile = new UserProfile({ rootNode: document.getElementById('root') });

const userProfileOnSubscribe = () => {
    profile.state.user = store.getState('user');
    profile.render();
};

const setProfileAvatar = () => {
    store.dispatch(actionAuth());
};
