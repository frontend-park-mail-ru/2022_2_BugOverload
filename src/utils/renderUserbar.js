import { renderTemplate } from './renderTemplate.js';
import { UserInfo } from '../components/UserInfo/userInfo.js';
import { Userbar } from '../components/Userbar/userbar.js';

export const renderUserbar = (root, user) => {
    const userinfo = new UserInfo(root);
    const userbar = new Userbar(root);
    renderTemplate(
        'components/Header/header',
        root,
        'beforebegin',
        Object.assign(
            user,
            {
                userinfo: userinfo.getHtml(),
                userbar: userbar.getHtml(),
            },
        ),
    );
    userbar.addHandlers(user);
};
