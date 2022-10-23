import { Ajax } from '@utils/ajax.js';
import { Review } from '@components/Review/review.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import template from '@components/ListReviews/listReviews.handlebars';


/**
* Помогает в создании отрендеренной коллекции фильмов в HTML для последующей вставки на страницу.
* Добавляет обработчики событий на кнопки слайдера
*
*/
export class ListReviews {
    constructor(data) {
        this.data = data;
    }

    /**
    * Получает данные с бэкенда.
    * Обрабатывает статусы ответа.
    * В случае ошибочного статуса добавляет собщение об ошибке в root в index.html
    *
    * @return {Object} Объект с данными о коллекции
    * @return {null} В случае ошибочного статуса
    */
    static async getRequestData(url) {
        // let href;
        // if (this._type === 'todayInCinema') {
        //     href = 'in_cinema';
        // } else {
        //     href = 'popular_films';
        // }
        const response = await Ajax.get(url);/* `http://${DOMAIN}/v1/${href}` */

        if (response.status === 200) {
            return response.body;
        }

        if (response.status === 404) {
            ShowErrorMessage('Данная коллекция не найдена');
            return null;
        }

        if (response.status >= 500) {
            ShowErrorMessage('Произошла ошибка сервера');
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
    getTemplate() {
        const reviews = this.data.reduce((res, oneReviewData) => res + Review.createReview(oneReviewData), '');

        return template({ reviews });
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
