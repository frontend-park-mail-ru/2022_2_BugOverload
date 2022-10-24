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
                    window.history.pushState(
                        null,
                        '',
                        window.location.href.replace(/\w+\/$/i, ''),
                    );
                    document.body
                        .querySelector('.modal__background')
                        .remove();
                }
            });
    }
}
