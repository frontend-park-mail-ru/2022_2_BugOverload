import template from '@components/Modal/modal.handlebars';
import { hrefRegExp } from '@config/regExp.js';

/**
* Отрисовывает модальное окно
*/
export class Modal {
    /**
     * Cохраняет root.
     * @param {Element} root - div, через который происходит взаимодействие с html.
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * Рендерит модальное окно
     */
    render() {
        this.root.insertAdjacentHTML('afterbegin', template());
        document.body.classList.add('body_hide_y_scroll');
        this.handler();
    }

    /**
     * Навешивает обработчик на выход из модального кона
     */
    handler() {
        document.body
            .querySelector('.modal__background')
            .addEventListener('click', (e) => {
                const { target } = e;

                if (target.classList.contains('modal__background')) {
                    document.body.classList.remove('body_hide_y_scroll');
                    document.body
                        .querySelector('.modal__background')
                        .remove();
                }
            });
    }
}

/**
* Функция полного выхода из регистрации
*/
export const exit = () => {
    const redirect = new Event(
        'click',
        {
            bubbles: true,
            cancelable: true,
        },
    );

    let newDatasetSection = (window.location.href.match(hrefRegExp.host))
        ? window.location.href.replace(hrefRegExp.host, '')
        : window.location.href.replace(hrefRegExp.localhost, '');

    newDatasetSection = newDatasetSection.replace(hrefRegExp.auth, '');

    const dispatchElement = document.body.querySelector(`a[data-section="${newDatasetSection}"]`)
        || document.body.querySelector('a');

    const oldDatasetSection = dispatchElement.dataset.section;
    if (oldDatasetSection && oldDatasetSection !== newDatasetSection) {
        dispatchElement.dataset.section = newDatasetSection;
    }

    dispatchElement.dispatchEvent(redirect);

    if (dispatchElement) {
        dispatchElement.dataset.section = oldDatasetSection;
    }
};
