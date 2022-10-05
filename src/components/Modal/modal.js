import { renderTemplate } from '../../utils/renderTemplate.js';

export class Modal {
    constructor(root) {
        this.root = root;
    }

    render() {
        renderTemplate('components/Modal/modal', this.root, 'afterbegin');
        this.handler();
    }

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
