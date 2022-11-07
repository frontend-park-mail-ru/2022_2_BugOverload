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
            id: null,
            film: null,
            isSubscribed: false,
        };

        store.subscribe('film', () => {
            this.state.film = store.getState('film');
            this.state.film.rating = Math.round10(this.state.film.rating, -1);

            this.render();
        });
    }

    render(id = null) {
        if (this.rootNode.querySelector('.js-film-page')) {
            return;
        }

        if (id) {
            this.state.id = id;
        }
        if (!this.state.id) {
            return;
        }
        super.render();

        if (!this.state.film) {
            if (!this.state.isSubscribed) {
                store.subscribe(`film${this.state.id}`, subscribeFilmPage);
                this.state.isSubscribed = true;
                store.dispatch(actionGetFilmData(this.state.id));
            }
            return;
        }

        if (this.state.isSubscribed) {
            store.unsubscribe(`film${this.state.id}`, subscribeFilmPage);
            this.state.isSubscribed = false;
        }

        ROOT.insertAdjacentHTML('beforeend', templateFilmPage());
        const aboutFilm = new AboutFilm({
            rootNode: this.rootNode,
            film: this.state.film,
        });
        aboutFilm.render();

        const menuInfoFilm = new MenuInfoFilm({
            rootNode: this.rootNode,
            film: this.state.film,
        });
        menuInfoFilm.render();
        menuInfoFilm.componentDidMount();

        const likelyFilms = new Collection('js-film-page-collection-popular');
        likelyFilms.init();

        const directorFilms = new Collection('js-film-page-collection-in_cinema');
        directorFilms.init();

        const reviewStatistic = new ReviewStatistic({
            rootNode: this.rootNode,
        });
        reviewStatistic.init();

        const listReviews = new ListReviews({
            rootNode: this.rootNode,
            film: this.state.film,
        });
        listReviews.init();
    }
}

export const filmPage = new FilmPage({ rootNode: document.getElementById('root') });

/**
* Функция, вызываемая при изменении фильмв в store
*/
const subscribeFilmPage = () => {
    filmPage.state.film = store.getState(`film${filmPage.state.id}`);
    filmPage.render();
};
