import { Header } from '@components/Header/header.js';
import { AboutFilm } from '@components/AboutFilm/aboutFilm.js';

import { ROOT } from '@config/config.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import templateFilmPage from '@views/FilmPage/filmPage.handlebars';

/**
* Отрисовывает фильма страницу, добавляя HTML-шаблон в root в index.html
*
*/
export function renderFilmPage() {
    const header = new Header(ROOT);
    header.render();

    const aboutFilm = new AboutFilm();

    Promise.all([
        aboutFilm.getRequestData(),
    ]).then((responses) => {
        ROOT.insertAdjacentHTML('beforeend', templateFilmPage({
            about: aboutFilm.renderTemplate(responses[0]),
        }));

        // addHandlersToDevelopmentLinks();
    });
}
