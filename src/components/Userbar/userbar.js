import {renderTemplate} from '../../utils/render_template.js';
import {Ajax} from '../../utils/ajax.js';

export class Userbar {
    #root

    constructor(root) {
        this.root = root;
    }

    render(user) {
        const userbar = document.querySelector('.header__userbar-user-info-container');
        renderTemplate('components/Userbar/userbar', userbar, 'afterend', user);

        const targetHadler =  document.querySelector('.header__userbar-items-container');

        targetHadler.addEventListener('click', (e) => {
            e.preventDefault();
            const { target } = e;

            const response = Ajax.get('/v1/auth/logout');
            response.then((response) => {
                if(target.dataset.section == 'logout') {
                    if (response.status == 200) {
                        document.body.querySelector('.header__userbar-substrate').remove();
        
                        const userHtml =
                        '<a href="/login" class="button__yellow header__login__btn" data-section="login">Войти</button>';
        
                        const headerForm = document.body.querySelector('.header__form');
                        headerForm.insertAdjacentHTML('afterend', userHtml);
                    }
                }
            });
        });
    }
    
    handler(user) {
        const userbar = document.body.querySelector('.header__userbar-substrate');
        console.log(userbar);
        let isOpened = false;
    
        function handlerOpenUserbar() {
            if (isOpened) {
                return;
            }

            const userbar = document.body.querySelector('.header__userbar-substrate');
            userbar.classList.remove('userbar-off');
            userbar.classList.add('userbar-on');
    
            const target = userbar.querySelector('.header__userbar-user-info-container');           
            renderTemplate('components/UserAvatar/userAvatar', target, 'beforeend', user);
    
            const userbarElement = new Userbar(root);
            userbarElement.render(user);
    
            isOpened = true;
        }
    
        function handlerCloseUserbar() {
            if ( !isOpened ) {
                return;
            }

            const userbar = document.body.querySelector('.header__userbar-substrate');
            userbar.classList.remove('userbar-on');
            userbar.classList.add('userbar-off');
            
            document.body.querySelector('.header__userbar-items-container').remove();
            document.body.querySelector('.header__userbar-name-container').remove();
    
            isOpened = false;
        }
    
        userbar.addEventListener('mouseenter', handlerOpenUserbar);
        userbar.addEventListener('mouseleave', handlerCloseUserbar);
    }

}
