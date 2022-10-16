import template from '@components/Film/film.handlebars';

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

        const film = template(filmData);

        const div = document.createElement('div');
        div.insertAdjacentHTML('afterbegin', film);

        Film.addColorRating(div, filmData);

        return div.innerHTML;
    }

    /**
    * Удаляет жанры, вставка которых приведёт к переносу строки в отображении.
    * Добавляет запятую ко всем жанрам, кроме последнего.
    *
    * @param {filmData Object} filmData - объект с данными о фильме
    */
    static decoreFilmInfo(filmData) {
        const lenYear = String(filmData.year_prod).length;
        const maxLenGenre = 31 - lenYear;

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
    static addColorRating(film, filmData) {
        const filmRating = film.querySelector('.film__rating');
        const ratingValue = filmData.ratio;

        if (ratingValue > 7.49) {
            filmRating.dataset.valueRating = 'positive';
            return;
        }

        if (ratingValue > 5.19) {
            filmRating.dataset.valueRating = 'neutral';
            return;
        }

        filmRating.dataset.valueRating = 'negotive';
    }
}
