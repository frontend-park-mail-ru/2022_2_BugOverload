import { API } from '@config/config.js';
import template from '@components/Film/film.handlebars';
import { decoreColorRating } from '@utils/decorationData.js';

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
    static createFilm(filmData) {
        Film.decoreFilmInfo(filmData);

        const film = template({
            ...filmData,
            poster_ver: API.img.poster_ver(filmData.poster_ver),
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
    static decoreFilmInfo(filmData) {
        if (Number.isInteger(filmData.rating)) {
            filmData.rating = `${filmData.rating}.0`;
        } else {
            filmData.rating = Math.round(filmData.rating * 10) / 10;
        }

        const maxLength = 31;
        const lenYear = String(filmData.year_prod).length;
        const maxLenGenre = maxLength - lenYear;

        let curLen = 0;
        const newListGenres = [];
        filmData.genres.forEach((genre) => {
            curLen += genre.length + 2;
            if (curLen <= maxLenGenre) {
                newListGenres.push(genre);
            } else {
                curLen -= genre.length + 2;
            }
        });

        filmData.genres = newListGenres;

        for (let i = 0; i < filmData.genres.length - 1; ++i) {
            filmData.genres[i] += ',';
        }
    }

    /**
    * Выставляет HTML-атрибуты для дальнейшего задания цвета блока с рейтингом
    *
    * @param {film HTMLElement} film - DOM-объект с данными о фильме
    * @param {filmData Object} filmData - объект с данными о фильме
    */
}
