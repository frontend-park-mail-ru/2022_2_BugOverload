import template from '@components/InputReview/inputReview.handlebars';

export class InputReview {
    constructor(data) {
        this.data = data;
    }

    getTemplate() {
        return template(this.data);
    }

    static addHandlers() {
        const select = document.querySelector('.input-review__select');
        const input = select.querySelector('.js-input-review__select-input');
        const head = select.querySelector('.input-review__select-head');
        const headText = head.querySelector('.input-review__select-head-text');
        const list = select.querySelector('.input-review__select-list');
        const items = select.querySelectorAll('.input-review__select-item');

        head.addEventListener('click', () => {
            if (head.hasAttribute('open')) {
                head.removeAttribute('open');
                list.setAttribute('hidden', '');
            } else {
                head.setAttribute('open', '');
                list.removeAttribute('hidden');
            }
        });

        items.forEach((item) => item.addEventListener('click', () => {
            head.removeAttribute('open');
            list.setAttribute('hidden', '');
            headText.innerHTML = item.textContent;
            input.setAttribute('value', item.dataset.value);
        }));

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.input-review__select')) {
                head.removeAttribute('open');
                list.setAttribute('hidden', '');
            }
        });
    }
}
