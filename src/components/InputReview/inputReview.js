import template from '@components/InputReview/inputReview.handlebars';
import { Modal } from '@components/Modal/modal.js';
import { Component } from '@components/Component.js';
import { actionSendReview } from '@actions/filmActions.js';
import { store } from '@store/Store.js';
import {
    renderError, removeError,
} from '@utils/valid.js';
import { decoreCountReviews } from '@utils/decorationData.js';

/**
* Отрисовывает форму для написания отзыва в виде модального окна
* Создаёт компонент выпадающего меню для сохранения в коллекции
*/
export class InputReview extends Component {
    /**
     * Cохраняет переданные параметры props через наследуемый компонент.
     * Подписывается на изменение state countReviews - числа отзывов у юзера.
     * @param {Object} - сохраняемые начальные параметры
     */
    constructor(props) {
        super(props);
        this.state = {
            countReviews: null,
            film: props.film,
            user: store.getState('user'),
        };

        this.data = props.data;
        store.subscribe('countReviews', () => {
            this.state.countReviews = store.getState('countReviews');
        });
    }

    /**
     * Отрисовывает стилизованный компонент, используя location и hbs-template.
     * Навешивает обработчики на пользовательский интерфейс, генерируемый компонентом
     * Создаёт компонент модального окна
     */
    render() {
        let modalWindow = this.rootNode.querySelector('.js-modal__window');
        if (modalWindow) {
            return;
        }

        const modal = new Modal(this.rootNode, this.componentWillUnmount.bind(this));
        modal.render();

        modalWindow = this.rootNode.querySelector('.js-modal__window__flex');
        modalWindow.insertAdjacentHTML('afterbegin', template({
            count_reviews: decoreCountReviews(store.getState('countReviews')),
            nickname: this.state.user.nickname,
            user_avatar: this.state.user.avatar,
        }));
        this.componentDidMount();
    }

    /**
     * Валидирует форму и отмечает пустные поля как ошибочные с
     * сообщением для юзера
     * @param {string} reviewType - тип рецензии
     * @param {Element} titleInputWrapper - обёрка для рендера сообщения ошибки названия
     * @param {Element} textInputWrapper - обёрка для рендера сообщения ошибки текста рецензии
     */
    validate(reviewType, titleInputWrapper, textInputWrapper) {
        let flag = true;

        if (!reviewType) {
            const reviewWrapper = this.rootNode.querySelector('.js-input-review__select__wrapper');
            renderError(
                reviewWrapper,
                'input-review__select',
                'Укажите тип рецензии',
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

    /**
     * Навешивает обработчики на выпадающее меню выбора типа рецензии,
     * кнопки отправки рецензии
     */
    componentDidMount() {
        const select = this.rootNode.querySelector('.js-input-review__select');
        const input = select.querySelector('.js-input-review__select-input');
        const head = select.querySelector('.js-input-review__select-head');
        const headText = head.querySelector('.js-input-review__select-head-text');
        const list = select.querySelector('.js-input-review__select-list');
        const items = select.querySelectorAll('.js-input-review__select-item');

        this.handlerSubmit = (function (e) {
            e.preventDefault();
            const review = {};
            const form = this.rootNode.querySelector('.js-input-review__form');

            const typeInput = form.querySelector('.js-input-review__select-input');
            const titleInputWrapper = form.querySelector('.js-input-title__wrapper');
            const textInputWrapper = form.querySelector('.js-input-text__wrapper');

            review.type = typeInput.value;
            review.name = titleInputWrapper.children[0].value;
            review.body = textInputWrapper.children[0].value;
            review.filmID = this.state.film.id;

            if (!this.validate(review.type, titleInputWrapper, textInputWrapper)) {
                return;
            }

            store.dispatch(actionSendReview(review));

            document.body.querySelector('.js-modal__background').remove();
        }).bind(this);

        const form = this.rootNode.querySelector('.js-input-review__form');
        form.addEventListener('submit', this.handlerSubmit);

        this.doOpenClose = function () {
            if (head.hasAttribute('open')) {
                head.removeAttribute('open');
                list.setAttribute('hidden', '');
            } else {
                head.setAttribute('open', '');
                list.removeAttribute('hidden');
            }
        };

        head.addEventListener('click', this.doOpenClose);

        this.handlerSetValueWrapper = (item) => () => {
            head.removeAttribute('open');
            list.setAttribute('hidden', '');
            headText.innerHTML = item.textContent;
            input.setAttribute('value', item.dataset.value);
        };

        items.forEach((item) => item.addEventListener('click', this.handlerSetValueWrapper(item)));
    }

    /**
     * Используется для освобождения ресурсов.
     * Удаляет обработчики, установленные в ComponentDidMount
     */
    componentWillUnmount() {
        const form = this.rootNode.querySelector('.js-input-review__form');
        form.removeEventListener('submit', this.handlerSubmit);

        const select = this.rootNode.querySelector('.js-input-review__select');

        const head = select.querySelector('.js-input-review__select-head');
        head.removeEventListener('click', this.doOpenClose);

        const items = select.querySelectorAll('.js-input-review__select-item');
        items.forEach((item) => item.removeEventListener('click', this.handlerSetValueWrapper(item)));
    }
}
