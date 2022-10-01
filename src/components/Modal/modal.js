import {renderTemplate} from '../../utils/render_template.js';

export class Modal {
    #root

    constructor(root) {
        this.root = root;
    }

    render() {
        renderTemplate('components/Modal/modal', root, 'afterbegin');

        this.handler();
    }

    handler() {
        document.body
        .querySelector('.modal__cross')
        .addEventListener('click', (e) => {
            e.preventDefault();
            document.body
                .querySelector('.modal__background')
                .remove();
        });
    }
}
