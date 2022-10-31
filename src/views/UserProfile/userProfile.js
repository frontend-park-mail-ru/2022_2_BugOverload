import { View } from '@views/View.js';
import templateProfile from '@views/UserProfile/userProfile.handlebars';
import templateProfileMenu from '@components/ProfileMenu/profileMenu.handlebars';
import { store } from '@store/Store.js';
import { actionGetSettings } from '@store/actionCreater/userActions.js';
import { ProfileChange } from '@components/ProfileChange/profileChange.js';

class UserProfile extends View {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            authStatus: null,
            userInfo: null,
        };
    }

    render() {
        const profilePage = this.rootNode.querySelector('.profile');
        if (profilePage) {
            profilePage.remove();
            return;
        }
        super.render();

        this.state.user = store.getState('user');
        if (!this.state.user) {
            if (this.state.authStatus) {
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
            store.subscribe('authStatus', setAuthStatus);
            return;
        }
        store.subscribe('user', userProfileOnSubscribe);

        this.state.userInfo = store.getState('userInfo');
        const subscribeFunc = () => {
            this.render();
        };
        if (!this.state.userInfo) {
            store.subscribe('userInfo', subscribeFunc);
            store.dispatch(actionGetSettings());
        } else {
            store.unsubscribe('userInfo', subscribeFunc);
        }

        const profile = this.rootNode.querySelector('.profile');
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

        // TODO обработчик на кнопку для загрузки авы

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
        store.unsubscribe('authStatus', setAuthStatus);
        store.unsubscribe('user', userProfileOnSubscribe);
    }
}

export const profile = new UserProfile({ rootNode: document.getElementById('root') });

const userProfileOnSubscribe = () => {
    profile.render();
};

const setAuthStatus = () => {
    profile.state.authStatus = store.getState('authStatus');
    profile.render();
};
