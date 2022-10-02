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
        .querySelector('.modal__background')
        .addEventListener('click', (e) => {
            const {target} = e;
            console.log()
            if (target.classList.contains('modal__background')) {
                document.body
                    .querySelector('.modal__background')
                    .remove();
            }
            return;
        });
    }
}
