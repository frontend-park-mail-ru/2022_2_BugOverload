import { View } from '@views/View.js';
import templateProfile from '@views/userProfile/userProfile.handlebars';
import templateProfileMenu from '@components/ProfileMenu/profileMenu.handlebars';
import templateProfileChange from '@components/ProfileChange/profileChange.handlebars';
import { store } from '@store/Store.js';
import { actionGetSettings } from '@store/actionCreater/userActions.js';

export class UserProfile extends View {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            authStatus: null,
            userInfo: null,
        }
    }

    setAuthStatus = () => {
        this.state.authStatus = store.getSate('authStatus');
        this.render();
    }

    render() {
        super.render();

        this.state.user = store.getSate('user');
        if(!this.state.user) {
            if(this.state.authStatus) {
                store.unsubscribe('authStatus',this.setAuthStatus);
                
                const redirectMain = new Event(
                    'click',
                    {
                        bubbles: true,
                        cancelable: true,
                    });
                this.rootNode.querySelector(`a[data-section="/"]`).dispatchEvent(redirectMain);
                return;
            }
            store.subscribe('authStatus',this.setAuthStatus);
            return;
        }

        this.state.userInfo = store.getSate('userInfo');
        const subscribeFunc = () => {
            this.render();
        };
        if(!this.state.userInfo) {
            store.subscribe('userInfo', subscribeFunc)
            store.dispatch(actionGetSettings());
        } else {
            store.unsubscribe('userInfo', subscribeFunc);
        }

        const profile = this.rootNode.querySelector('.profile');
        if(profile) {
            profile.remove();
        }
        this.rootNode.insertAdjacentHTML('beforeend', templateProfile(
            Object.assign(
                {profileMenu: templateProfileMenu()},
                this.state.user,
                this.state.userInfo,
            )
        ));
    }
}
