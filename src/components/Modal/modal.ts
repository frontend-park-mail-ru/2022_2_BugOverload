import template from '@components/Modal/modal.handlebars';
import { hrefRegExp } from '@config/regExp';

export interface Modal {
    root: HTMLElement;
}

/**
* Отрисовывает модальное окно
*/
export class Modal {
    /**
     * Cохраняет root.
     * @param {Element} root - div, через который происходит взаимодействие с html.
     */
    constructor(root :HTMLElement) {
        this.root = root;
    }

    /**
     * Рендерит модальное окно
     */
    render() {
        this.root.insertAdjacentHTML('afterbegin', template());
        this.handler();
    }

    /**
     * Навешивает обработчик на выход из модального кона
     */
    handler() {
        document.body
            .querySelector('.js-modal__background')
            .addEventListener('click', (e) => {
                const target = e.target as HTMLElement;

                if (target.classList.contains('modal__background')) {
                    exitFromModal();
                }
            });
    }
}

/**
* Функция закрытия модального окна
*/
export const exitFromModal = () => {
    const modalBackground = document.body.querySelector('.js-modal__background');
    if (modalBackground) {
        modalBackground.remove();
    }
};

/**
* Функция полного выхода из модального окна, со сменой url
*/
export const exit = () => {
    const dispatchElement = document.body.querySelector('.js-modal__background');
    if (dispatchElement) {
        const redirect = new Event(
            'click',
            {
                bubbles: true,
                cancelable: true,
            },
        );
        dispatchElement.dispatchEvent(redirect);
        return;
    }

    const location = (window.location.href.match(hrefRegExp.host))
        ? window.location.href.match(hrefRegExp.host)[0]
        : window.location.href.match(hrefRegExp.localhost)[0];

    const pathBeforModal = window.localStorage.getItem('pathBeforModal');
    history.replaceState(null, null, `${location + pathBeforModal}`);
};
