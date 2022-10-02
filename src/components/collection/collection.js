import {Ajax} from '../../utils/ajax.js';
import { ROOT } from '../../utils/root.js';

export const COLLECTION_TYPE = {
    popular: "popular",
    todayInCinema: "todayInCinema",
}

export const COLLECTION_API = {
    popular: '/v1/popular_films',
    todayInCinema: '/v1/in_cinema',
}


export class Collection {
    #type
    #count

    constructor(type) {
        this.#type = type;
    }

    render() {
        let promiseCollection = Ajax.get(COLLECTION_API[this.#type]);
        promiseCollection.then( (response) => {
            if (response.status === 200) {
                this.#count = response.body.films.length;
                this.renderCollection(response.body);
                this.addListeners;
                return;
            }

            if (response.status === 404) {
                //TODO
                throw 404;
            }

            if (response.status > 500) {
                //TODO
                throw 500;
            }

            //TODO
            throw "Error collection";
        });
    }

    renderCollection(filmsData) {
        if (!filmsData) {
            return;
        }

        decorateGenresFilm(filmsData);

        let films = "";
        filmsData.films.forEach(filmData => films += Handlebars.templates['components/film/film'](filmData) )

        let collection = Handlebars.templates['components/collection/collection']({title: filmsData.title, films: films});
        let div = document.createElement('div');
        div.insertAdjacentHTML('beforeend', collection);

        if (document.documentElement.clientWidth - 2*52 > this.#count*260 - 30) {
            div.querySelector('.collection__slider-button_right').style.display = 'none';
        }
        div.querySelector('.collection__slider-button_left').style.display = 'none';

        addColorRatingFilm(div, filmsData);

        ROOT.append(div);
        this.addListeners(div);
    }

    addListeners(slider) {
        let btnRight = slider.querySelector('.collection__slider-button_right');
        let btnLeft = slider.querySelector('.collection__slider-button_left');
        // debugger;

        let offset = 0;
        const widthFilm = 260;
        let maxLength = widthFilm * this.#count;
        let windowLen = document.documentElement.clientWidth;
        let maxOffset = maxLength - windowLen + 52 + 12;
        let countOnPage = Math.trunc(windowLen / widthFilm);
        let pageOffset = countOnPage * widthFilm;

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
                };

                slider.querySelector('.collection__slider').style.left = -offset + 'px';
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

                slider.querySelector('.collection__slider').style.left = -offset + 'px';
                if (offset <= 0) {
                    slider.querySelector('.collection__slider-button_left').style.display = 'none';
                    isHiddenLeft = true;
                }

                return;
            }

            return;
        });
    }
}


function decorateGenresFilm(filmsData) {
    filmsData.films.forEach((film) => {
        for (let i = 0; i < film.genres.length - 1; ++i) {
            film.genres[i] += ',';
        }
    })
}

function addColorRatingFilm(div, filmsData) {
    let ratingElem = div.querySelectorAll('.film__rating');

    ratingElem.forEach((film, index) => {
        let ratingValue = filmsData.films[index].ratio;

        if (ratingValue > 7.49) {
            film.dataset.valueRating = 'positive';
            return;
        }

        if (ratingValue > 5.19) {
            film.dataset.valueRating = 'neutral';
            return;
        }

        film.dataset.valueRating = 'negotive';
    })
}
