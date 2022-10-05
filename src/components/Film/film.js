/**
* Помогает в создании отрендеренного фильма в HTML для последующей вставки на страницу
*
*/
export class Film {
    /**
    * Помогает в создании отрендеренного фильма в HTML для последующей вставки на страницу
    *
    * @param {filmData Object} filmData - объект с данными о фильме
    */
    static createFilm(filmData) {
        Film.decoreGenres(filmData);

        const film = Handlebars.templates['components/Film/film'](filmData);

        const div = document.createElement('div');
        div.insertAdjacentHTML('afterbegin', film);

        Film.addColorRating(div, filmData);

        return div.innerHTML;
    }

    /**
    * Добавляет запятую ко всем жанрам, кроме последнего
    *
    * @param {filmData Object} filmData - объект с данными о фильме
    */
    static decoreGenres(filmData) {
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
