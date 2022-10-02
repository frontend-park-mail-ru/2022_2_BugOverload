import {renderTemplate} from '../../utils/render_template.js';

export class Userbar {
    #root

    constructor(root) {
        this.root = root;
    }

    render(user) {
        //
        document.querySelector('.header__avatar').remove();


        const userbar = document.querySelector('.header__userbar-substrate');
        renderTemplate('components/Userbar/userbar', userbar, 'beforeend', user);


        // let avatar = document.querySelector('.header__userbar-substrate');
        // avatar.addEventListener('mouseenter', (event) => {
        //     debugger;
            // let menu = Handlebars.templates['components/navbarMish/usermenu']();
            // avatar.innerHTML = menu; //ajasentHTTP

            userbar.style.backgroundColor = "rgba(15, 15, 15, 0.8)";
        // });


    }
}
