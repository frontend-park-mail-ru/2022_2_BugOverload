import { Ajax } from '../../utils/ajax.js';
import { BACKEND_API } from '../../config/config.js';
import { Film } from '../Film/film.js';

export const COLLECTION_TYPE = {
    popular: 'popular',
    todayInCinema: 'todayInCinema',
};

export class Collection {
    constructor(type) {
        this._type = type;
    }

    init() {
        return Ajax.get(BACKEND_API[this._type]);
    }

    render(response) {
        if (response.status === 200) {
            // this._count = response.body.films.length;
            return this.renderCollection(response.body);
            // debugger;
            // return Handlebars.templates['components/Collection/collection'](response.body);
            // return;
        }

        if (response.status === 404) {
            // TODO
            // ShowErrorMessage()
            throw new Error(404);
        }

        if (response.status > 500) {
            // TODO
            throw new Error(500);
        }

        // TODO
        throw new Error('Error collection');
    }

    static addHandlers() {
        const sliders = document.querySelectorAll('.collection__container');
        sliders.forEach((slider) => Collection.addHandlerSlider(slider));
    }

    renderCollection(filmsData) {
        const films = filmsData.films.reduce((res, filmData) => res + Film.createFilm(filmData), '');


        return Handlebars.templates['components/Collection/collection']({ title: filmsData.title, films });
    }

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

    // static addColorRatingFilm(div, filmsData) {
    //     const ratingElem = div.querySelectorAll('.film__rating');

    //     ratingElem.forEach((film, index) => {
    //         const ratingValue = filmsData.films[index].ratio;

    //         if (ratingValue > 7.49) {
    //             film.dataset.valueRating = 'positive';
    //             return;
    //         }

    //         if (ratingValue > 5.19) {
    //             film.dataset.valueRating = 'neutral';
    //             return;
    //         }

    //         film.dataset.valueRating = 'negotive';
    //     });
    // }
}

// function decorateGenresFilm(filmsData) {
//     filmsData.films.forEach((film) => {
//         for (let i = 0; i < film.genres.length - 1; ++i) {
//             film.genres[i] += ',';
//         }
//     });
// }

// function addColorRatingFilm(div, filmsData) {
//     const ratingElem = div.querySelectorAll('.film__rating');

//     ratingElem.forEach((film, index) => {
//         const ratingValue = filmsData.films[index].ratio;

//         if (ratingValue > 7.49) {
//             film.dataset.valueRating = 'positive';
//             return;
//         }

//         if (ratingValue > 5.19) {
//             film.dataset.valueRating = 'neutral';
//             return;
//         }

//         film.dataset.valueRating = 'negotive';
//     });
// }
