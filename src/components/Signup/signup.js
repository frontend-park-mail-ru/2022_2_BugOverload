import {Ajax} from '../../utils/ajax.js';
import {renderTemplate} from '../../utils/render_template.js';
import {goToPage} from '../../utils/go_to_page.js';
import {checkInput, renderError} from '../../utils/valid.js';
import {Modal} from '../Modal/modal.js';
import {UserAvatar} from '../UserAvatar/userAvatar.js';
import {config} from '../../config/config.js';

export class Signup {
    #root

    constructor(root) {
        this.root = root;
    }

    render() {
        if (root.querySelector('.modal__window') === null) {
            const modal = new Modal(root);
            modal.render();
        }

        const modalWindow = root.querySelector('.modal__window__flex');
        renderTemplate('components/Signup/signup', modalWindow, 'afterbegin');

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
            user.nickname = nickInput.value.trim();
            user.email = emailInput.value.trim();
            user.password = passwordInput.value;

            let flag = false;

            for (let key in user) {
                if (key === 'email' || key === 'password') {
                    if (!checkInput(form, 'signup', user[key], key)) {
                        flag = true;
                    }
                } else {
                    if (!checkInput(form, 'signup', user[key])) {
                        flag = true;
                    }
                }
            }

            if(flag) {
                return;
            }

            const responsePromise = Ajax.post({
                url: 'http://localhost:8088/v1/auth/signup',
                body: user,
            });

            console.log(responsePromise)

            responsePromise.then((response) => {
                console.log(response)
                if (response.status === 201) {

                    document.body
                        .querySelector('.modal__background')
                        .remove();

                    const userAvatar = new UserAvatar(root);
                    userAvatar.render(response.body);

                    return;
                }

                if (response.status === 200) {
                    renderError(form,'email','Пользователь с таким email уже зарегистрирован')
                    return;
                }

                console.log(response.status);
            });
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
                    const login = new config.login[target.dataset.section].render(root);
                    login.render();
                },
                modalWindow);
            }
        });
    }
}
