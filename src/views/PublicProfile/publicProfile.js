import { View } from '@views/View.js';
import templateProfile from '@views/UserProfile/userProfile.handlebars';

class PublicProfile extends View {
    render()

}

export const publicProfile = new UserProfile({ rootNode: document.getElementById('root') });
