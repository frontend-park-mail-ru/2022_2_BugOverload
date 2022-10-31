import { View } from '@views/View.js';
import templateProfile from '@views/userProfile/userProfile.handlebars';
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
        super.render();

        const setAuthStatus = () => {
            this.state.authStatus = store.getState('authStatus');
            this.render();
        };

        this.state.user = store.getState('user');
        if (!this.state.user) {
            if (this.state.authStatus) {
                store.unsubscribe('authStatus', setAuthStatus);

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

        const profileChange = new ProfileChange({
            rootNode: this.rootNode,
            user: Object.assign(
                this.state.user,
                this.state.userInfo,
            ),
        });
        profileChange.componentDidMount();
    }
}

export const profile = new UserProfile({ rootNode: document.getElementById('root') });
