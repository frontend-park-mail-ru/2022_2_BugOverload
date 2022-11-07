import { Film } from '@components/Film/film.js';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { actionGetCollectionData } from '@actions/commonComponentsActions.js';
import template from '@components/Collection/collection.handlebars';

/**
* Помогает в создании отрендеренной коллекции фильмов в HTML для последующей вставки на страницу.
* Добавляет обработчики событий на кнопки слайдера
*
*/
export class Collection extends Component {
    constructor(nameLocation) {
        super();
        this.state = {
            collection: null,
        };
        this.nameLocation = nameLocation;
        this.location = this.rootNode.querySelector(`.${nameLocation}`);
        store.subscribe(`collection-${nameLocation}`, () => {
            this.state.collection = store.getState(`collection-${nameLocation}`);
            this.render();
        });
    }

    init() {
        store.dispatch(
            actionGetCollectionData({
                tag: this.getTagFromName(this.nameLocation),
                name: this.nameLocation,
            }),
        );
    }

    getTagFromName(name) {
        const words = name.split('-');
        return words[words.length - 1];
    }

    /**
    * Создаёт коллекцию из набора данных как HTML-шаблон, полученных с бэкенда
    *
    * @param {data Object} data - объект данных коллекции
    * @return {string} отрендеренный HTML-шаблон коллеции
    */
    render() {
        const films = this.state.collection.films.reduce((res, filmData) => res + Film.createFilm(filmData), '');

        this.location.insertAdjacentHTML('afterbegin', template({ title: this.state.collection.title, films }));
        this.componentDidMount();
    }

    /**
    * Служит для добавления обработчиков на все отрендеренные на странице коллекции
    *
    */
    componentDidMount() {
        const slider = this.location.querySelector('.js-collection__container');
        if (!slider) {
            return;
        }
        this.addHandlerSlider(slider);
    }

    componentWillUnmount() {
        const slider = this.location.querySelector('.js-collection__container');
        slider.removeEventListener('click', this.handlerSlider);
    }

    /**
    * Служит для добавления обработчиков на переданный слайдер в виде DOM-объекта.
    * Добавлет к слайдеру функционал скролла по нажатию соответствующей кнопки.
    *
    * @param {slider DOMElement} slider - DOM-объекта cайдера на странице
    */
    addHandlerSlider(slider) {
        const btnRight = slider.querySelector('.js-collection__slider-button_right');
        const btnLeft = slider.querySelector('.js-collection__slider-button_left');
        const body = slider.querySelector('.js-collection__slider');

        const count = slider.querySelectorAll('.js-film').length;

        const boundMargin = 52;
        const spaceBetweenFilms = 30;
        const widthFilm = 260;
        if (document.documentElement.clientWidth - 2 * boundMargin
                > count * widthFilm - spaceBetweenFilms) {
            btnRight.style.display = 'none';
        }
        btnLeft.style.display = 'none';

        let offset = 0;
        const boundMarginForBtn = 64;
        const maxLength = widthFilm * count;
        const windowLen = document.documentElement.clientWidth;
        const maxOffset = maxLength - windowLen + boundMarginForBtn;
        const countOnPage = Math.trunc(windowLen / widthFilm);
        const pageOffset = countOnPage * widthFilm;

        let isHiddenRight = false;
        let isHiddenLeft = true;

        this.handlerSlider = function (event) {
            if (event.target === btnRight.querySelector('img')) {
                event.preventDefault();
                if (isHiddenLeft) {
                    btnLeft.style.display = '';
                    isHiddenLeft = false;
                }

                offset += pageOffset;
                if (offset > maxOffset) {
                    offset = maxOffset;
                }

                body.style.left = `${-offset}px`;
                if (offset >= maxOffset) {
                    btnRight.style.display = 'none';
                    isHiddenRight = true;
                }

                return;
            }

            if (event.target === btnLeft.querySelector('img')) {
                event.preventDefault();
                if (isHiddenRight) {
                    btnRight.style.display = '';
                    isHiddenRight = false;
                }
                offset -= pageOffset;
                if (offset <= 0) {
                    offset = 0;
                }

                body.style.left = `${-offset}px`;
                if (offset <= 0) {
                    btnLeft.style.display = 'none';
                    isHiddenLeft = true;
                }
            }
        };

        slider.addEventListener('click', this.handlerSlider);
    }
}
