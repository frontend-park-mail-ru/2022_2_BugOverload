import { View } from '@views/View.js';
import templateProfile from '@views/userProfile/userProfile.handlebars';
import templateProfileMenu from '@components/ProfileMenu/profileMenu.handlebars';
import { store } from '@store/Store.js';
import { actionAuth } from '@store/actionCreater/userActions.js';
import { actionGetSettings } from '@store/actionCreater/userActions.js';
import { actionPutSettings } from '@store/actionCreater/userActions.js';

export class UserProfile extends View {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            authStatus: null,
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

        this.rootNode.insertAdjacentHTML('beforeend', templateProfile({
            profileMenu: templateProfileMenu(),
        }));
    }
}
