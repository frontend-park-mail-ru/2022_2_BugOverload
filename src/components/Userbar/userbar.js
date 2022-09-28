import {renderTemplate} from '../../utils/render_template.js';

export class Userbar {
    render(user) {
        const userbar = document.body.querySelector('.header__userbar');
    
        renderTemplate('userbar', (safeHtml) => {
            userbar.insertAdjacentHTML('beforeend', safeHtml);
        }, user);
    }
}
