import { renderTemplate } from '../../utils/renderTemplate.js';
import { Userbar } from '../Userbar/userbar.js';
import { config } from '../../config/config.js';
import { dispatcher } from '../../store/Dispatcher.js';

/**
* Отрисовывает хедер.
* Обращается к бэкенду для авторизации пользователя или проверки его авторизации.
* Добавляет обработчики событий.
*
*/ 
export class Header {
    /**
     * Cохраняет root.
     * @param {Element} root - div, через который происходит взаимодействие с html.
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * Рендерит стандартный хэдер без пользовательских данных
     */
    render() {
        const user = dispatcher.dispatch({
            method: 'getUser',
        })
        console.log(user)
        const header = this.root.querySelector('.header');
        if(header) {
            header.remove();
        }

        if(user) {
            renderTemplate('components/Header/header', this.root, 'afterbegin', user);
            const userbar = new Userbar(this.root);
            userbar.addHandlers(user);
        } else {
            renderTemplate('components/Header/header', this.root, 'afterbegin');
            
            dispatcher.dispatch({
                method: 'auth'  
            });
        }
    }

    /**
     * Навешивает события, по которым происходит рендер логина и регистрации
     */
    handlerHeader() {
        this.root.addEventListener('click', (e) => {
            const { target } = e;

            if (target.dataset.section === 'logout') {
                return;
            }

            if (target instanceof HTMLAnchorElement) {
                e.preventDefault();
                const modalWindow = this.root.querySelector('.modal__window');
                if (modalWindow && (target.dataset.section === 'login' || target.dataset.section === 'signup')) {
                    let removeElement;
                    if (target.dataset.section === 'login') {
                        removeElement = 'signup';
                    }
                    if (target.dataset.section === 'signup') {
                        removeElement = 'login';
                    }

                    console.log(removeElement)
                    modalWindow
                        .querySelector(`.modal__${removeElement}`)
                        .remove();
                    modalWindow
                        .querySelector(`.modal__${removeElement}__img`)
                        .remove();
                    const Render = config.auth[target.dataset.section].render;
                    const element = new Render(this.root);
                    element.render();
                    return;
                }

                const header = this.root.querySelector('.header');

                if ((header.compareDocumentPosition(target) === 16
                        || header.compareDocumentPosition(target) === 20)
                        && target.dataset.section === 'login') {
                    const Render = config.header[target.dataset.section].render;
                    const element = new Render(this.root);
                    element.render();
                }
            }
        });
    }
}
