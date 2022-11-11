import { AboutFilm } from '@components/AboutFilm/aboutFilm.js';
import { MenuInfoFilm } from '@components/MenuInfoFilm/menuInfoFilm.js';
import { ROOT } from '@config/config.js';
import { Collection } from '@components/Collection/collection.js';
import { ListReviews } from '@components/ListReviews/listReviews.js';
import { ReviewStatistic } from '@components/ReviewStatistic/reviewStatistic.js';
import { store } from '@store/Store.js';
import { actionGetFilmData } from '@actions/filmActions.js';
import { ShowMessage } from '@components/Message/message.js';
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
    }

    /**
    * Отрисовывает фильма страницу, добавляя HTML-шаблон в root в index.html
    * Подписывается на изменение состояния state film<id>
    * @param {number} id - уникальный идентификатор фильма.
    * Используется при первом заходе на страницу
    */
    render(id = null) {
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
                store.subscribe('statusSendReview', sendReviewSuccess);
                this.state.isSubscribed = true;
                store.dispatch(actionGetFilmData(this.state.id));
            }
            return;
        }
        this.state.film.id = this.state.id;

        if (this.state.isSubscribed) {
            store.unsubscribe(`film${this.state.id}`, subscribeFilmPage);
            store.unsubscribe('statusSendReview', sendReviewSuccess);
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

        const reviewStatistic = new ReviewStatistic(this.state.film, {
            rootNode: this.rootNode,
        });
        reviewStatistic.render();

        const listReviews = new ListReviews({
            rootNode: this.rootNode,
            film: this.state.film,
        });
        listReviews.init();
    }

    /**
     * Используется для обнуления состояния FilmPage для перехода к новому фильму
     */
    componentWillUnmount() {
        this.isSubscribed = false;
        this.state.id = null;
        this.state.film = null;
    }
}

/**
* Функция, вызываемая при изменении фильмов в store
*/
const subscribeFilmPage = () => {
    filmPage.state.film = store.getState(`film${filmPage.state.id}`);
    filmPage.state.film.rating = Math.round(filmPage.state.film.rating * 10) / 10;
    filmPage.render();
};

const sendReviewSuccess = () => {
    ShowMessage('Успех!', 'positive');
};

export const filmPage = new FilmPage({ rootNode: document.getElementById('root') });
