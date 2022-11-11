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
        };
    }

    render() {
        super.render();

        if (!this.subscribeedOnLogout) {
            store.subscribe('logoutStatus', userProfileOnSubscribe);
            this.subscribeedOnLogout = true;
        }

        if (!this.subscribeedOnUser) {
            store.subscribe('user', userProfileOnSubscribe);
            this.subscribeedOnUser = true;
        }

        if (!this.state.user) {
            const logoutStatus = store.getState('logoutStatus');
            const authStatus = store.getState('authStatus');
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

        if(this.state.subscribeedOnAvatar) {
            store.unsubscribe('statusChangeAvatar', setProfileAvatar);
            this.state.subscribeedOnAvatar = false;
        }

        this.subscribeedOnUser = false;
        this.subscribeedOnLogout = false;
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
