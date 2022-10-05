import { Ajax } from '../../utils/ajax.js';
import { renderTemplate } from '../../utils/renderTemplate.js';
import { goToPage } from '../../utils/goToPage.js';
import { Userbar } from '../Userbar/userbar.js';
import { config } from '../../config/config.js';

export class Header {
    constructor(root) {
        this.root = root;
    }

    render() {
        const responsePromise = Ajax.get('http://localhost:8088/v1/auth');
        responsePromise.then((response) => {
            if (response.status === 200) {
                document.body.querySelector('.header').remove();
                renderTemplate('components/Header/header', this.root, 'afterbegin', response.body);
                const userbar = new Userbar(this.root);
                userbar.addHandlers(response.body);
            }
        });

        renderTemplate('components/Header/header', this.root, 'afterbegin');
        this.handlerHeader();
    }

    handlerHeader() {
        const header = document.querySelector('.header');

        header.addEventListener('click', (e) => {
            const { target } = e;

            if (target.dataset.section === 'logout') {
                return;
            }

            if (target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement) {
                e.preventDefault();
                goToPage(config.header[target.dataset.section], () => {
                    document.body
                        .querySelector('.active')
                        .classList.remove('active');

                    const Render = config.header[target.dataset.section].render;
                    const element = new Render(this.root);
                    element.render();
                    if (target.dataset.section === 'login') {
                        this.addRedirect();
                    }
                });
            }
        });
    }

    addRedirect() {
        const modalWindow = this.root.querySelector('.modal__window');
        modalWindow.addEventListener('click', (e) => {
            const { target } = e;

            if (target instanceof HTMLAnchorElement) {
                e.preventDefault();

                goToPage(
                    config.auth[target.dataset.section],
                    () => {
                        let removeElement;
                        if (target.dataset.section === 'login') {
                            removeElement = 'signup';
                        }
                        if (target.dataset.section === 'signup') {
                            removeElement = 'login';
                        }

                        modalWindow
                            .querySelector(`.modal__${removeElement}`)
                            .remove();
                        modalWindow
                            .querySelector(`.modal__${removeElement}__img`)
                            .remove();
                        const Render = config.auth[target.dataset.section].render;
                        const login = new Render(this.root);
                        login.render();
                    },
                    modalWindow,
                );
            }
        });
    }
}
