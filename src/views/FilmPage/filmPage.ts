import { AboutFilm } from '@components/AboutFilm/aboutFilm';
import { MenuInfoFilm } from '@components/MenuInfoFilm/menuInfoFilm';
import { ROOT } from '@config/config';
import { Collection } from '@components/Collection/collection';
import { ListReviews } from '@components/ListReviews/listReviews';
import { ReviewStatistic } from '@components/ReviewStatistic/reviewStatistic';
import { store } from '@store/Store';
import { actionGetFilmData, actionGetSimilarFilms } from '@actions/filmActions';
import { ShowMessage } from '@components/Message/message';
import templateFilmPage from '@views/FilmPage/filmPage.handlebars';
import { View } from '@views/View';
import { roundFloat } from '@utils/common';
import { responsStatuses } from '@config/config';
import { Film } from '@components/Film/film';

import { CollectionUI } from 'moviegate-ui-kit';

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
            similarFilms: null,
            saveToCollStatus: null,
            removeFromCollStatus: null,
        };

        this.sendReviewSuccess = () => {
            ShowMessage('Спасибо за вашу рецензию', 'positive');
        };

        store.subscribe('statusSendReview', this.sendReviewSuccess);

        this.saveToCollStatus = () => {
            this.state.saveToCollStatus = store.getState('saveToCollStatus');

            if (this.state.saveToCollStatus === responsStatuses.NoContent) {
                ShowMessage('Сохранено!', 'positive');
                return;
            }
            if (this.state.saveToCollStatus === responsStatuses.BadRequest) {
                ShowMessage('Вы уже сохранили этот фильм');
                return;
            }
            ShowMessage('Ошибка сохранения. Попробуйте ещё раз');
        };

        store.subscribe('saveToCollStatus', this.saveToCollStatus);

        this.removeFromCollStatus = () => {
            this.state.removeFromCollStatus = store.getState('removeFromCollStatus');

            if (this.state.removeFromCollStatus === responsStatuses.NoContent) {
                ShowMessage('Фильм удалён из коллекции', 'positive');
                return;
            }
            if (this.state.removeFromCollStatus === responsStatuses.BadRequest) {
                ShowMessage('Вы уже удалили этот фильм');
                return;
            }
            ShowMessage('Ошибка удаления. Попробуйте ещё раз');

        };

        store.subscribe('removeFromCollStatus', this.removeFromCollStatus);
    }

    /**
    * Отрисовывает фильма страницу, добавляя HTML-шаблон в root в index.html
    * Подписывается на изменение состояния state film<id>
    * @param {number} id - уникальный идентификатор фильма.
    * Используется при первом заходе на страницу
    */
    render(id?:number) {
        console.log(`FILM ID: ${id}`);
        if (id) {
            this.state.id = id;
        }

        if (!this.state.id) {
            return;
        }

        super.render();
        const filmPageElement = this.rootNode.querySelector('.js-film-page');
        if (filmPageElement) {
            filmPageElement.remove();
        }

        if (!this.state.film) {
            store.subscribe(`film${this.state.id}`, subscribeFilmPage, true);
            store.dispatch(actionGetFilmData(this.state.id));
            return;
        }

        if (!this.state.similarFilms) {
            store.subscribe(`film${filmPage.state.id}Similar`, subscribeFilmPageSimilar, true);
            store.dispatch(actionGetSimilarFilms(this.state.id));
            return;
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

        const films = this.state.similarFilms.films.reduce((res: string, filmData: film) => res + Film.createFilm(filmData), '');
        const collection = new Collection('');

        const similarFilmsWrapper = this.rootNode.querySelector('.js-collection-tag-similar');
        similarFilmsWrapper.insertAdjacentHTML('beforeend',
        CollectionUI.renderTemplate({
                films,
                name: this.state.similarFilms.name,
                url: `film${this.state.id}`,
            }),
        );
        collection.addHandlerSlider(
            this.rootNode.querySelector('.js-collection__container'),
        );

        this.reviewStatistic = new ReviewStatistic({
            rootNode: this.rootNode,
            film: this.state.film,
        });
        this.reviewStatistic.render();

        this.listReviews = new ListReviews({
            rootNode: this.rootNode,
            film: {
                id: this.state.id,
                ...this.state.film,
            },
        });
        this.listReviews.init();
    }

    /**
     * Используется для обнуления состояния FilmPage для перехода к новому фильму
     */
    componentWillUnmount() {
        this.state.id = null;
        this.state.film = null;
        this.state.reviews = null;
        this.state.countScores = null;
        this.listReviews?.unsubscribe();
        this.aboutFilm?.unsubscribe();
        this.menuInfoFilm?.unsubscribe();
        this.likelyFilms?.unsubscribe();
        this.directorFilms?.unsubscribe();
        this.reviewStatistic?.unsubscribe();
    }
}

/**
* Функция, вызываемая при изменении фильмов в store
*/
const subscribeFilmPage = () => {
    filmPage.state.film = store.getState(`film${filmPage.state.id}`);
    filmPage.state.film.rating = roundFloat(filmPage.state.film.rating);
    if (Number.isInteger(filmPage.state.film.rating)) {
        filmPage.state.film.rating = `${filmPage.state.film.rating}.0`;
    }
    filmPage.render();
};

const subscribeFilmPageSimilar = () => {
    filmPage.state.similarFilms = store.getState(`film${filmPage.state.id}Similar`);
    filmPage.render();
};

export const filmPage = new FilmPage({ rootNode: document.getElementById('root') });
