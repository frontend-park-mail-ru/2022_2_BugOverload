import template from '@components/InputReview/inputReview.handlebars';
import { Modal } from '@components/Modal/modal.js';
import { Component } from '@components/Component.js';
import { actionSendReview } from '@actions/filmActions.js';
import { store } from '@store/Store.js';
import {
    renderError, removeError,
} from '@utils/valid.js';
import { decoreCountReviews } from '@utils/decorationData.js';

export class InputReview extends Component {
    constructor(data) {
        super();
        this.state = {
            countReviews: null,
        };

        this.data = data;
        store.subscribe('countReviews', () => {
            this.state.countReviews = store.getState('countReviews');
        });
    }

    render() {
        let modalWindow = this.rootNode.querySelector('.modal__window');
        if (modalWindow) {
            return;
        }

        const modal = new Modal(this.rootNode);
        modal.render();

        modalWindow = this.rootNode.querySelector('.modal__window__flex');
        modalWindow.insertAdjacentHTML('afterbegin', template({ count_reviews: decoreCountReviews(store.getState('countReviews')), nickname: store.getState('user').nickname }));
        this.componentDidMount();
    }

    validate(reviewType, titleInputWrapper, textInputWrapper) {
        let flag = true;

        if (!reviewType) {
            const reviewWrapper = this.rootNode.querySelector('.input-review__select__wrapper');
            renderError(
                reviewWrapper,
                'input-review__select',
                'Напишите рецензию',
                false,
            );
            flag = false;

            reviewWrapper.children[0].addEventListener('click', () => {
                removeError(
                    reviewWrapper,
                    'input-review__select',
                    false,
                );
            }, { once: true });
        }

        if (!titleInputWrapper.children[0].value) {
            renderError(
                titleInputWrapper,
                'text',
                'Введите заголовок',
            );
            flag = false;

            titleInputWrapper.children[0].addEventListener('keyup', () => {
                removeError(
                    titleInputWrapper,
                    'text',
                );
            }, { once: true });
        }

        if (!textInputWrapper.children[0].value) {
            renderError(
                textInputWrapper,
                'js-input-review__input-text',
                'Напишите рецензию',
                false,
            );
            flag = false;

            textInputWrapper.children[0].addEventListener('keyup', () => {
                removeError(
                    textInputWrapper,
                    'js-input-review__input-text',
                    false,
                );
            }, { once: true });
        }
        return flag;
    }

    handlerSubmit(e) {
        e.preventDefault();
        const review = {};
        const form = this.rootNode.querySelector('.js-input-review__form');

        const typeInput = form.querySelector('.js-input-review__select-input');
        const titleInputWrapper = form.querySelector('.input-title__wrapper');
        const textInputWrapper = form.querySelector('.input-text__wrapper');

        review.type = typeInput.value;
        review.name = titleInputWrapper.children[0].value;
        review.body = textInputWrapper.children[0].value;
        review.filmID = store.getState('film').id;

        if (!this.validate(review.type, titleInputWrapper, textInputWrapper)) {
            return;
        }

        store.dispatch(actionSendReview(review));

        document.body.classList.remove('body_hide_y_scroll');
        document.body.querySelector('.modal__background').remove();
    }

    componentDidMount() {
        const select = this.rootNode.querySelector('.input-review__select');
        const input = select.querySelector('.js-input-review__select-input');
        const head = select.querySelector('.input-review__select-head');
        const headText = head.querySelector('.input-review__select-head-text');
        const list = select.querySelector('.input-review__select-list');
        const items = select.querySelectorAll('.input-review__select-item');

        const form = this.rootNode.querySelector('.js-input-review__form');
        form.addEventListener('submit', this.handlerSubmit.bind(this));

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
    }
}
