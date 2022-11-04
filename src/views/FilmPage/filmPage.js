import { AboutFilm } from '@components/AboutFilm/aboutFilm.js';
import { MenuInfoFilm } from '@components/MenuInfoFilm/menuInfoFilm.js';
import { ROOT } from '@config/config.js';
import { Collection } from '@components/Collection/collection.js';
import { ListReviews } from '@components/ListReviews/listReviews.js';
import { ReviewStatistic } from '@components/ReviewStatistic/reviewStatistic.js';
import { store } from '@store/Store.js';
import { actionGetFilmData } from '@actions/filmActions.js';

import templateFilmPage from '@views/FilmPage/filmPage.handlebars';
import { View } from '@views/View.js';

/**
* Отрисовывает фильма страницу, добавляя HTML-шаблон в root в index.html
*
*/
export class FilmPage extends View {
    constructor(props) {
        super(props);
        this.state = {
            film: null,
        };

        store.subscribe('film', () => {
            this.state.film = store.getState('film');
            this.render();
        });
    }

    render() {
        if (this.rootNode.querySelector('.js-film-page')) {
            return;
        }
        super.render();

        if (!this.state.film) {
            store.dispatch(actionGetFilmData({ filmID: 321 }));
            return;
        }

        const aboutFilm = new AboutFilm();

        ROOT.insertAdjacentHTML('beforeend', templateFilmPage({
            about: aboutFilm.getTemplate(),
        }));

        aboutFilm.componentDidMount();

        const menuInfoFilm = new MenuInfoFilm();

        menuInfoFilm.render();
        menuInfoFilm.componentDidMount();

        const likelyFilms = new Collection('js-film-page-collection-popular');
        likelyFilms.init();

        const directorFilms = new Collection('js-film-page-collection-in_cinema');
        directorFilms.init();

        const reviewStatistic = new ReviewStatistic();
        reviewStatistic.init();

        const listReviews = new ListReviews();
        listReviews.init();
    }
}

export const filmPage = new FilmPage({ rootNode: document.getElementById('root') });
