import { View } from '@views/View.js';
import templateProfile from '@views/userProfile/userProfile.handlebars';
import templateProfileMenu from '@components/ProfileMenu/profileMenu.handlebars';

export class UserProfile extends View {
    render() {
        super.render();

        this.rootNode.insertAdjacentHTML('beforeend', templateProfile({
            profileMenu: templateProfileMenu(),
        }));
    }
}
