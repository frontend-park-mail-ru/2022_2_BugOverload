import { View } from '@views/View.js';
import templateProfile from '@views/UserProfile/userProfile.handlebars';
import templateProfileMenu from '@components/ProfileMenu/profileMenu.handlebars';
import { store } from '@store/Store.js';
import { actionGetSettings } from '@store/actionCreater/userActions.js';
import { ProfileChange } from '@components/ProfileChange/profileChange.js';
import { actionAuth } from '@store/actionCreater/userActions.js';

class UserProfile extends View {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            authStatus: null,
            userInfo: null,
            subscribeedOnUser: false,
        };
    }

    render() {
        super.render();

        this.state.user = store.getState('user');
        if (!this.state.user) {
            if (this.state.authStatus) {
                this.componentWillUnmount();
                console.log('event')
                const redirectMain = new Event(
                    'click',
                    {
                        bubbles: true,
                        cancelable: true,
                    },
                );
                console.log('event')
                this.rootNode.querySelector('a[data-section="/"]').dispatchEvent(redirectMain);
                return;
            }
            store.dispatch(actionAuth());
            store.subscribe('authStatus', setAuthStatus);
            return;
        }
        if(!this.subscribeedOnUser) {
            store.subscribe('user', userProfileOnSubscribe);
            this.subscribeedOnUser = true;
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
        this.subscribeedOnUser = false;
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
