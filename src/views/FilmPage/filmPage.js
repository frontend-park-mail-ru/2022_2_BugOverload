import { AboutFilm } from '@components/AboutFilm/aboutFilm.js';
import { MenuInfoFilm } from '@components/MenuInfoFilm/menuInfoFilm.js';
import { ROOT, API } from '@config/config.js';
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
export class FilmView extends View {
    constructor(props) {
        super(props);
        this.state = {
            film: null,
        };

        // super.render();
        // debugger;

        store.subscribe('film', () => {
            // debugger;
            this.state.film = store.getState('film');
            this.render();
        });
    }

    render() {
        if (this.rootNode.querySelector('.js-film-page')) {
            return;
        }

        if (!this.state.film) {
            store.dispatch(actionGetFilmData({ filmID: 321 }));
            return;
        }

        super.render();
        // console.log(this.state.film);

        const likelyFilms = new Collection();
        const directorFilms = new Collection();

        Promise.all([
            // getRequestData(),
            this.state.film,
            // get рецензии тут же
            Collection.getRequestData(API.popular_films),
            Collection.getRequestData(API.in_cinema),
        ]).then((responses) => {
            const aboutFilm = new AboutFilm(responses[0].about);

            // const inputReview = new InputReview();

            ROOT.insertAdjacentHTML('beforeend', templateFilmPage({
                about: aboutFilm.getTemplate(responses[0].about),
                // reviews: listReviews.getTemplate(),
                // reviewInfo: reviewStatistic.getTemplate(),
                // inputReview: inputReview.getTemplate(),
                collectionLikely: likelyFilms.getTemplate(responses[1]),
                collectionDirector: directorFilms.getTemplate(responses[2]),

            }));

            const tmp = responses[0].details;
            tmp.type_serial = responses[0].about.type_serial;
            tmp.year_prod = responses[0].about.year_prod;
            tmp.directors = responses[0].about.directors;
            tmp.age_limit = responses[0].about.age_limit;
            tmp.duration = responses[0].about.duration;
            const menuInfoFilm = new MenuInfoFilm({
                description: responses[0].descriptionText,
                details: tmp,
                rating: responses[0].about.rating,

            });
            const reviewStatistic = new ReviewStatistic();
            reviewStatistic.componentDidMount();
            const listReviews = new ListReviews();

            menuInfoFilm.render();
            menuInfoFilm.componentDidMount();

            // listReviews.render();
            // listReviews.componentDidMount();
            // menuInfoFilm.addHandlers();
            Collection.addHandlers();
            // InputReview.addHandlers();
            aboutFilm.componentDidMount();
            listReviews.componentDidMount();
            // rating.componentDidMount();
        });
    }
}

export const filmView = new FilmView({ rootNode: document.getElementById('root') });
