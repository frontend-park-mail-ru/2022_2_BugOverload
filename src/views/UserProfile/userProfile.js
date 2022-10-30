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
            authStatus: null,
            user: null,
        }
        store.subscribe('authStatus', () => {
            this.state.authStatus = store.getSate('authStatus');
            if(!this.state.authStatus) {
                return;
            } else {
                this.render();
            }
        });
        store.subscribe('user', () => {
            this.state.user = store.getSate('user');
            this.render();
        });
    }
    render() {

        if(!this.state.user) {
            
        }
        super.render();

        this.rootNode.insertAdjacentHTML('beforeend', templateProfile({
            profileMenu: templateProfileMenu(),
        }));
    }
}
