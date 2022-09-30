import {Ajax} from '../../utils/ajax.js';
import {renderTemplate} from '../../utils/render_template.js';
import {goToPage} from '../../utils/go_to_page.js';
import {checkInput} from '../../utils/valid.js';
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
    
        this.handler(modalWindow);
    }

    handler(modalWindow) {
        const form = modalWindow.querySelector('.modal__form');
        const loginImg = modalWindow.querySelector('.modal__login__img');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
    
            const emailInput = form.querySelector('input[type=email]');
            const passwordInput = form.querySelector('input[type=password]');
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            const ajax = new Ajax();
            ajax.post({
                url: '/v1/auth/login',
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
                    const signup = new config.login[target.dataset.section].render();
                    signup.render();
                }, 
                modalWindow);
            }
        });
    }
}

