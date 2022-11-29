import template from '@components/PremiereFilm/premiereFilm.handlebars';
import { Component } from '@components/Component';
import { PremiereFilmDate } from '@components/PremiereFilmDate/premiereFilmDate';
import { API } from '@config/config';
import {
    decoreDuration, decoreColorRating,
} from '@utils/decorationData';
import { roundFloat } from '@utils/common';

/**
* Рейтинг фильма.
* Отрисовывает рейтинг и форму для отправки удаления оценки.
* Подписывается на измненение state rating
*/
export class PremiereFilm extends Component {
    static createFilmPremiere(filmData: filmPremiere, mode = '') {

        const film = template({
            ...filmData,
            poster_ver: API.img.poster_ver(filmData.poster_ver),
            year_prod: filmData.prod_year.split('.')[0],
            genres: filmData.genres.slice(0, 2).join(', '),
            director: `реж. ${filmData.directors[0].name}`,
            duration: decoreDuration(filmData.duration_minutes),
            countries: filmData.prod_countries.slice(0, 2).join(', '),
            rating: roundFloat(filmData.rating),
        });

        const div = document.createElement('div');
        div.insertAdjacentHTML('afterbegin', film);
        decoreColorRating(div, '.js-premiere-film-rating', filmData.rating);

        if (mode === 'addDatePrComp') {
            const location: HTMLElement = div.querySelector('.js-premiere-film__premiere-date');
            PremiereFilmDate.addPremiereDate(filmData, location);
        }

        return div.innerHTML;
    }
}
