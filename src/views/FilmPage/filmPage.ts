import { AboutFilm } from '@components/AboutFilm/aboutFilm.js';
import { MenuInfoFilm } from '@components/MenuInfoFilm/menuInfoFilm.js';
import { ROOT } from '@config/config';
import { Collection } from '@components/Collection/collection.js';
import { ListReviews } from '@components/ListReviews/listReviews.js';
import { ReviewStatistic } from '@components/ReviewStatistic/reviewStatistic.js';
import { store } from '@store/Store';
import { actionGetFilmData } from '@actions/filmActions';
import { ShowMessage } from '@components/Message/message.js';
import templateFilmPage from '@views/FilmPage/filmPage.handlebars';
import { View } from '@views/View';

/**
* Отрисовывает фильма страницу, добавляя HTML-шаблон в root в index.html
*
*/
export class FilmPage extends View {
    constructor(props: componentProps) {
        super(props);
        this.state = {
            id: null,
            film: null,
            isSubscribed: false,
        };

        this.sendReviewSuccess = () => {
            ShowMessage('Спасибо за вашу рецензию', 'positive');
        };

        store.subscribe('statusSendReview', this.sendReviewSuccess);
    }

    /**
    * Отрисовывает фильма страницу, добавляя HTML-шаблон в root в index.html
    * Подписывается на изменение состояния state film<id>
    * @param {number} id - уникальный идентификатор фильма.
    * Используется при первом заходе на страницу
    */
    render(id?:number) {
        if (id) {
            this.state.id = id;
        }

        if (!this.state.id) {
            return;
        }

        super.render();
        const filmPageElement = this.rootNode.querySelector('.film-page');
        if (filmPageElement) {
            filmPageElement.remove();
        }

        if (!this.state.film) {
            if (!this.state.isSubscribed) {
                store.subscribe(`film${this.state.id}`, subscribeFilmPage);

                this.state.isSubscribed = true;
                store.dispatch(actionGetFilmData(this.state.id));
            }
            return;
        }
        this.state.film.id = this.state.id;

        if (this.state.isSubscribed) {
            store.unsubscribe(`film${this.state.id}`, subscribeFilmPage);
            this.state.isSubscribed = false;
        }

        ROOT.insertAdjacentHTML('beforeend', templateFilmPage());
        this.aboutFilm = new AboutFilm({
            rootNode: this.rootNode,
            film: this.state.film,
        });
        this.aboutFilm.render();

        this.menuInfoFilm = new MenuInfoFilm({
            rootNode: this.rootNode,
            film: this.state.film,
        });
        this.menuInfoFilm.render();
        this.menuInfoFilm.componentDidMount();

        this.likelyFilms = new Collection('js-film-page-collection-popular');
        this.likelyFilms.init();

        this.directorFilms = new Collection('js-film-page-collection-in_cinema');
        this.directorFilms.init();

        this.reviewStatistic = new ReviewStatistic({
            rootNode: this.rootNode,
            film: this.state.film,
        });
        this.reviewStatistic.render();

        this.listReviews = new ListReviews({
            rootNode: this.rootNode,
            film: this.state.film,
        });
        this.listReviews.init();
    }

    /**
     * Используется для обнуления состояния FilmPage для перехода к новому фильму
     */
    componentWillUnmount() {
        this.isSubscribed = false;
        this.state.id = null;
        this.state.film = null;
        this.state.reviews = null;
        this.listReviews?.componentWillUnmount();
        this.aboutFilm?.componentWillUnmount();
        this.menuInfoFilm?.componentWillUnmount();
        this.likelyFilms?.componentWillUnmount();
        this.directorFilms?.componentWillUnmount();
        this.reviewStatistic?.componentWillUnmount();
        this.listReviews?.componentWillUnmount();
        store.unsubscribe('statusSendReview', this.sendReviewSuccess);
    }
}

/**
* Функция, вызываемая при изменении фильмов в store
*/
const subscribeFilmPage = () => {
    filmPage.state.film = store.getState(`film${filmPage.state.id}`);
    filmPage.state.film.rating = Math.round(filmPage.state.film.rating * 10) / 10;
    if (Number.isInteger(filmPage.state.film.rating)) {
        filmPage.state.film.rating = `${filmPage.state.film.rating}.0`;
    }
    filmPage.render();
};

export const filmPage = new FilmPage({ rootNode: document.getElementById('root') });
