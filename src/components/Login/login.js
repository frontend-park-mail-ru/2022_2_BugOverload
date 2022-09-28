import {Ajax} from '../../utils/ajax.js';
import {renderTemplate} from '../../utils/render_template.js';
import {goToPage} from '../../utils/go_to_page.js';
import {Modal} from '../Modal/modal.js';
import {Header} from '../Header/header.js';
import {config, root} from '../../__mocks__/config.js';

export class Login {
    render() {
        if (!root.querySelector('.modal__window')) {
            const modal = new Modal();
            modal.render();
        }
    
        const modalWindow = root.querySelector('.modal__window__flex');
    
    
        renderTemplate('login', (safeHtml) => {
            modalWindow.insertAdjacentHTML('afterbegin', safeHtml);
        });
    
        const loginImg = root.querySelector('.modal__login__img');
    
        loginImg.addEventListener('click', (e) => {
            const { target } = e;
        
            if (target instanceof HTMLAnchorElement) {
                e.preventDefault();
    
                goToPage(config.login[target.dataset.section], () => {
                    modalWindow              
                        .querySelector('.modal__login')
                        .remove();
                    modalWindow              
                        .querySelector('.modal__login__img')
                        .remove();
                    config.login[target.dataset.section].render();
                }, 
                modalWindow);
            }
        });
    
        this.handler(modalWindow.querySelector('.modal__form'));
    }

    handler(target) {
        target.addEventListener('submit', (e) => {
            e.preventDefault();
    
            const emailInput = target.querySelector('input[type=email]');
            const passwordInput = target.querySelector('input[type=password]');
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            const ajax = new Ajax();
            ajax.post({
                url: '/login',
                body: {email, password},
                callback: (response, result) => {
                    if (response.status === 200) {
                        
                        document.body
                            .querySelector('.modal__background')
                            .remove();
                        
                        const header = new Header();
                        header.render(result);
    
                        return;
                    }
    
                    console.log(response.status);
    
                    alert('АХТУНГ! НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
                },
            });         
        });
    }
}

