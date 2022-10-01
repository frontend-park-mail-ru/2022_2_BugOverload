import {renderTemplate} from '../../utils/render_template.js';

export class Userbar {
    #root

    constructor(root) {
        this.root = root;
    }

    render(user) {
        const userbar = document.body.querySelector('.header__userbar');
    
        renderTemplate('Userbar/userbar', userbar, 'beforeend', user);
    }
}
