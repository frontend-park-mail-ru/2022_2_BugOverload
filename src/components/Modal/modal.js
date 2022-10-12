import { renderTemplate } from '@utils/renderTemplate.js';
import template from '@components/Modal/modal.handlebars';

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
        // renderTemplate('components/Modal/modal', this.root, 'afterbegin');
        this.root.insertAdjacentHTML('afterbegin', template());
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
                    document.body
                        .querySelector('.modal__background')
                        .remove();
                }
            });
    }
}
