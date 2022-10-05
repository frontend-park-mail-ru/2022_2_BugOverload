import { Ajax } from '../../utils/ajax.js';
import { Film } from '../Film/film.js';
import { ShowErrorMessage } from '../ErrorMessage/errorMessage.js';

export const COLLECTION_TYPE = {
    popular: 'popular',
    todayInCinema: 'todayInCinema',
};

/**
* Помогает в создании отрендеренной коллекции фильмов в HTML для последующей вставки на страницу.
* Добавляет обработчики событий на кнопки слайдера
*
*/
export class Collection {
    constructor(type) {
        this._type = type;
    }

    /**
    * Получает данные с бэкенда.
    * Обрабатывает статусы ответа.
    * В случае ошибочного статуса добавляет собщение об ошибке в root в index.html
    *
    * @return {Object} Объект с данными о коллекции
    * @return {null} В случае ошибочного статуса
    */
    async getRequestData() {
        let href;
        if (this._type === 'todayInCinema') {
            href = 'in_cinema';
        } else {
            href = 'popular_films';
        }
        const response = await Ajax.get(`http://127.0.0.1:8088/v1/${href}`);

        if (response.status === 200) {
            return response.body;
        }

        if (response.status === 404) {
            ShowErrorMessage();
            return null;
        }

        if (response.status > 500) {
            ShowErrorMessage();
            return null;
        }

        ShowErrorMessage();
        return null;
    }

    /**
    * Создаёт коллекцию из набора данных как HTML-шаблон, полученных с бэкенда
    *
    * @param {data Object} data - объект данных коллекции
    * @return {string} отрендеренный HTML-шаблон коллеции
    */
    renderTemplate(data) {
        const films = data.films.reduce((res, filmData) => res + Film.createFilm(filmData), '');

        return Handlebars.templates['components/Collection/collection']({ title: data.title, films });
    }

    /**
    * Служит для добавления обработчиков на все отрендеренные на странице коллекции
    *
    */
    static addHandlers() {
        const sliders = document.querySelectorAll('.collection__container');
        sliders.forEach((slider) => Collection.addHandlerSlider(slider));
    }

    /**
    * Служит для добавления обработчиков на переданный слайдер в виде DOM-объекта.
    * Добавлет к слайдеру функционал скролла по нажатию соответствующей кнопки.
    *
    * @param {slider DOMElement} slider - DOM-объекта cайдера на странице
    */
    static addHandlerSlider(slider) {
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
