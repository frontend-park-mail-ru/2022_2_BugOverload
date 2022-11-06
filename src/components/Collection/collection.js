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
    constructor(nameLocation = null) {
        super();
        this.state = {
            collection: null,
        };
        if(nameLocation) {
            this.nameLocation = nameLocation;
            this.location = this.rootNode.querySelector(`.${nameLocation}`);
            store.subscribe(`collection-${nameLocation}`, () => {
                this.state.collection = store.getState(`collection-${nameLocation}`);
                this.render();
            });
        }
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
        this.location.innerHTML = '';
        const films = this.state.collection.films.reduce((res, filmData) => res + Film.createFilm(filmData), '');

        this.location.insertAdjacentHTML('afterbegin', template({ title: this.state.collection.title, films }));
        this.componentDidMount();
    }

    /**
    * Служит для добавления обработчиков на все отрендеренные на странице коллекции
    *
    */
    componentDidMount() {
        const slider = this.location.querySelector('.collection__container');
        this.addHandlerSlider(slider);
    }

    /**
    * Служит для добавления обработчиков на переданный слайдер в виде DOM-объекта.
    * Добавлет к слайдеру функционал скролла по нажатию соответствующей кнопки.
    *
    * @param {slider DOMElement} slider - DOM-объекта cайдера на странице
    */
    addHandlerSlider(slider) {
        const btnRight = slider.querySelector('.collection__slider-button_right');
        const btnLeft = slider.querySelector('.collection__slider-button_left');

        const count = slider.querySelectorAll('.film').length;

        if (document.documentElement.clientWidth - 2 * 52 > count * 260 - 30) {
            btnRight.style.display = 'none';
        }
        btnLeft.style.display = 'none';

        let offset = 0;
        const widthFilm = 260;
        const maxLength = widthFilm * count;
        const windowLen = document.documentElement.clientWidth;
        const maxOffset = maxLength - windowLen + 52 + 12;
        const countOnPage = Math.trunc(windowLen / widthFilm);
        const pageOffset = countOnPage * widthFilm;

        let isHiddenRight = false;
        let isHiddenLeft = true;

        slider.addEventListener('click', (event) => {
            if (event.target === btnRight.querySelector('img')) {
                event.preventDefault();
                if (isHiddenLeft) {
                    slider.querySelector('.collection__slider-button_left').style.display = '';
                    isHiddenLeft = false;
                }

                offset += pageOffset;
                if (offset > maxOffset) {
                    offset = maxOffset;
                }

                slider.querySelector('.collection__slider').style.left = `${-offset}px`;
                if (offset >= maxOffset) {
                    slider.querySelector('.collection__slider-button_right').style.display = 'none';
                    isHiddenRight = true;
                }

                return;
            }

            if (event.target === btnLeft.querySelector('img')) {
                event.preventDefault();
                if (isHiddenRight) {
                    slider.querySelector('.collection__slider-button_right').style.display = '';
                    isHiddenRight = false;
                }
                offset -= pageOffset;
                if (offset <= 0) {
                    offset = 0;
                }

                slider.querySelector('.collection__slider').style.left = `${-offset}px`;
                if (offset <= 0) {
                    slider.querySelector('.collection__slider-button_left').style.display = 'none';
                    isHiddenLeft = true;
                }
            }
        });
    }
}
