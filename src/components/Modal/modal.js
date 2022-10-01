import {renderTemplate} from '../../utils/render_template.js';

export class Modal {
    render() {
        renderTemplate('modal', (safeHtml) => {
            root.insertAdjacentHTML('afterbegin', safeHtml);
        });

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