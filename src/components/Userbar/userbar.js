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
        renderTemplate('components/navbarMish/usermenu', userbar, 'beforeend', user);


        let avatar = document.querySelector('.header__userbar-substrate');
        // avatar.addEventListener('mouseenter', (event) => {
        //     debugger;
            // let menu = Handlebars.templates['components/navbarMish/usermenu']();
            // avatar.innerHTML = menu; //ajasentHTTP

            avatar.style.backgroundColor = "rgba(15, 15, 15, 0.8)";
        // });

        avatar.addEventListener('mouseleave', (event) => {
            avatar.style.backgroundColor = "rgba(15, 15, 15, 0.0)";
            avatar.innerHTML = '<img class="header__avatar" src="asserts/img/invisibleMan.jpeg" alt="">';
        });
    }
}
