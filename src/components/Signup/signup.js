import {Ajax} from '../../utils/ajax.js';
import {renderTemplate} from '../../utils/render_template.js';
import {goToPage} from '../../utils/go_to_page.js';
import {checkInput} from '../../utils/valid.js';
import {Modal} from '../Modal/modal.js';
import {Header} from '../Header/header.js';
import {config, root} from '../../__mocks__/config.js';

export class Signup {
    render() {
        if (root.querySelector('.modal__window') === null) {
            const modal = new Modal();
            modal.render();
        }
    
        const modalWindow = root.querySelector('.modal__window__flex');
        renderTemplate('signup', (safeHtml) => {
            modalWindow.insertAdjacentHTML('afterbegin', safeHtml);
        });

        this.handler(modalWindow);
    }

    handler(modalWindow) {
        const form = modalWindow.querySelector('.modal__form');
        const loginImg = root.querySelector('.modal__signup__img');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
    
            const nickInput = form.querySelector('input[type=text]');
            const emailInput = form.querySelector('input[type=email]');
            const passwordInput = form.querySelector('input[type=password]');

    
            const user = {};
            user.nickname = nickInput.value;
            user.email = emailInput.value.trim();
            user.password = passwordInput.value; 

            for (let key in user) {
                if (key === 'email' || key === 'password') {
                    if (!checkInput(form, 'signup', user[key], key)) {
                        return;
                    }
                } else {
                    if (!checkInput(form, 'signup', user[key])) {
                        return;
                    }
                }
            }
            
            const ajax = new Ajax();

            ajax.post({
                url: '/v1/auth/signup',
                body: user,
                callback: (response, result) => {
                    if (response.status === 201) {
                        
                        document.body
                            .querySelector('.modal__background')
                            .remove();
                        
                        const header = new Header();
                        header.render(result);
    
                        return;
                    }
    
                    console.log(response.status);
    
                    alert('АХТУНГ! НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
                }})
        });

        loginImg.addEventListener('click', (e) => {
            const { target } = e;
        
            if (target instanceof HTMLAnchorElement) {
                e.preventDefault();
    
                goToPage(config.login[target.dataset.section], () => {
                    modalWindow              
                        .querySelector('.modal__signup')
                        .remove();
                    modalWindow              
                        .querySelector('.modal__signup__img')
                        .remove();
                    const login = new config.login[target.dataset.section].render();
                    login.render();
                },
                modalWindow);
            }
        });
    }
}

/*
function renderSignup() {
    if (root.querySelector('.modal__window') === null) {
        const modal = new Modal();
        modal.render();
    }

    const modalWindow = root.querySelector('.modal__window__flex');
    renderTemplate('signup', (safeHtml) => {
        modalWindow.insertAdjacentHTML('afterbegin', safeHtml);
    });
    
    const loginImg = root.querySelector('.modal__signup__img');

    loginImg.addEventListener('click', (e) => {
        const { target } = e;
    
        if (target instanceof HTMLAnchorElement) {
            e.preventDefault();

            goToPage(config.login[target.dataset.section], () => {
                modalWindow              
                    .querySelector('.modal__signup')
                    .remove();
                modalWindow              
                    .querySelector('.modal__signup__img')
                    .remove();
                config.login[target.dataset.section].render();
            },
            modalWindow);
        }
    });

    const form = modalWindow.querySelector('.modal__form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nickInput = modalWindow.querySelector('input[type=text]');
        const emailInput = modalWindow.querySelector('input[type=email]');
        const passwordInput = modalWindow.querySelector('input[type=password]');

        const user = {};
        user.nickname = nickInput.value;
        user.email = emailInput.value.trim();
        user.password = passwordInput.value; 



        for (let key in user) {
            

            if (key === 'email' || key === 'password') {
                if (!checkInput(user[key],key)) {
                    console.log(key)
                    return;
                }
            } else {
                if (!checkInput(user[key])) {
                    console.log(key)
                    return;
                }
            }
        } 

        console.log(user.nickname)

        ajax(
            'POST',
            '/signup',
            user,
            (response, result) => {
                if (response.status === 201) {
                    
                    document.body
                        .querySelector('.modal__background')
                        .remove();
                    
                    const header = new Header();
                    header.render(result);

                    return;
                }

                console.log(response.status);

                alert('АХТУНГ! НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
            })
    });
}*/