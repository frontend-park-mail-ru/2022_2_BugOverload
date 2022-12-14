import { API } from '@config/config';
import { decoreColorRating } from '@utils/decorationData';
import { roundFloat } from '@utils/common';

import { FilmUI } from 'moviegate-ui-kit';

/**
* Помогает в создании отрендеренного фильма в HTML для последующей вставки на страницу
*
*/
export class Film {
    /**
    * Помогает в создании отрендеренного фильма в HTML для последующей вставки на страницу
    *
    * @param {filmData Object} filmData - объект с данными о фильме
    * @return {string} HTML созданного фильма
    */
    static createFilm(filmData: film, isUserCollection = false, is_author = false) {
        const film = FilmUI.renderTemplate({
            ...filmData,
            poster_ver: API.img.poster_ver(filmData.poster_ver),
            rating: roundFloat(filmData.rating),
            genres: Film.decoreFilmInfo(filmData),
            isUserCollection,
            is_author,
        });

        const div = document.createElement('div');
        div.insertAdjacentHTML('afterbegin', film);

        decoreColorRating(div, '.js-film-rating', filmData.rating);

        return div.innerHTML;
    }

    /**
    * Удаляет жанры, вставка которых приведёт к переносу строки в отображении.
    * Добавляет запятую ко всем жанрам, кроме последнего.
    *
    * @param {filmData Object} filmData - объект с данными о фильме
    */
    static decoreFilmInfo(filmData: film) {
        const maxLength = 31;
        const lenYear = String(filmData.year_prod).length;
        const maxLenGenre = maxLength - lenYear;

        let curLen = 0;
        const newListGenres: Array<string> = [];
        filmData.genres.forEach((genre) => {
            curLen += genre.length + 2;
            if (curLen <= maxLenGenre) {
                newListGenres.push(genre);
            } else {
                curLen -= genre.length + 2;
            }
        });

        return newListGenres.join(', ');
    }
}
