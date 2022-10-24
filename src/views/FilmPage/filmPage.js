import { Ajax } from '@utils/ajax.js';
import { Header } from '@components/Header/header.js';
import { AboutFilm } from '@components/AboutFilm/aboutFilm.js';
import { MenuInfoFilm } from '@components/MenuInfoFilm/menuInfoFilm.js';
import { ROOT, API } from '@config/config.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import { Collection } from '@components/Collection/collection.js';
import { ListReviews } from '@components/ListReviews/listReviews.js';
import { ReviewStatistic } from '@components/ReviewStatistic/reviewStatistic.js';
import { InputReview } from '@components/InputReview/inputReview.js';

import templateFilmPage from '@views/FilmPage/filmPage.handlebars';

/**
* Отрисовывает фильма страницу, добавляя HTML-шаблон в root в index.html
*
*/
export function renderFilmPage() {
    const header = new Header({ rootNode: ROOT });
    header.render();
    header.componentDidMount();

    const likelyFilms = new Collection();
    const directorFilms = new Collection();
    // const review = new Review();

    Promise.all([
        getRequestData(),
        // get рецензии тут же
        Collection.getRequestData(API.popular_films),
        Collection.getRequestData(API.in_cinema),
    ]).then((responses) => {
        const aboutFilm = new AboutFilm(responses[0].about);
        const listReviews = new ListReviews(responses[0].reviews);
        const reviewStatistic = new ReviewStatistic(responses[0].reviewInfo);

        const inputReview = new InputReview();

        ROOT.insertAdjacentHTML('beforeend', templateFilmPage({
            about: aboutFilm.getTemplate(responses[0].about),
            reviews: listReviews.getTemplate(),
            reviewInfo: reviewStatistic.getTemplate(),
            inputReview: inputReview.getTemplate(),
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
        menuInfoFilm.renderTemplate();
        menuInfoFilm.addHandlers();
        Collection.addHandlers();
        InputReview.addHandlers();
        aboutFilm.addHandlers();

        // addHandlersToDevelopmentLinks();
    });
}

// export function renderMainPage() {
//     // const header = new Header({ rootNode: ROOT });
//     // header.render();
//     // header.componentDidMount();

//     // const mainBody = new MainBody(ROOT);
//     // mainBody.renderMainPage();
// }

async function getRequestData() {
    const response = await Ajax.get(API.about_film(1));
    if (response.status === 200) {
        return response.body;
    }

    if (response.status === 404) {
        ShowErrorMessage('Такой страницы не найдено :(');
        return null;
    }

    if (response.status > 500) {
        ShowErrorMessage('Произошла ошибка сервера');
        return null;
    }

    ShowErrorMessage();
    return null;
}
