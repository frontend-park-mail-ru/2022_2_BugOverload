import {Ajax} from '../../utils/ajax.js';
import {renderTemplate} from '../../utils/render_template.js';
import {goToPage} from '../../utils/go_to_page.js';
import {Userbar} from '../Userbar/userbar.js';
import {config, root} from '../../__mocks__/config.js';

export class Header {
    render(user) {
        if(document.querySelector('.header')) {
            document
                .querySelector('.header')
                .remove();
        }
    
        if(!user) {
            const ajax = new Ajax();
    
            user = ajax.get({
                url: '/auth',
                callback: (response) => {
                    if (response.status === 200) {
                        return true;
                    }
                    return false;
                }
            });

            user.then((result) => {
                this.renderUser(result);
            })
            return;
        }
        console.log(user);
    
        this.renderUser(user);
    }

    renderUser(user = null) {
        renderTemplate('header', (safeHtml) => {
            root.insertAdjacentHTML('beforebegin', safeHtml);
        },
        user);
    
        const header = document.querySelector('.header');
        
        if(user) {
            const ava = header.querySelector('.header__avatar');
    
            function openUserbar(e) {
                const { target } = e;
    
                userbar = new Userbar();
                userbar.render(user);
            }
    
            ava.addEventListener('click', openUserbar)
        }
    
        header.addEventListener('click', (e) => {
            const { target } = e;
        
            if (target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement) {
                e.preventDefault();
                goToPage(config.header[target.dataset.section], () => {
                    document.body
                        .querySelector('.active')
                        .classList.remove('active');

                        const head = new (config.header[target.dataset.section].render)();
                        head.render();
                });
            }
        });
    }
}
