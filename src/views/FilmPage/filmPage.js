import { Ajax } from '@utils/ajax.js';
import { Header } from '@components/Header/header.js';
import { AboutFilm } from '@components/AboutFilm/aboutFilm.js';
import { MenuInfoFilm } from '@components/MenuInfoFilm/menuInfoFilm.js';
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

    Promise.all([
        getRequestData(),
        // get рецензии тут же
    ]).then((responses) => {
        const aboutFilm = new AboutFilm(responses[0].about);
        ROOT.insertAdjacentHTML('beforeend', templateFilmPage({
            about: aboutFilm.getTemplate(responses[0].about),

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
        });
        menuInfoFilm.renderTemplate();
        menuInfoFilm.addHandlers();

        // addHandlersToDevelopmentLinks();
    });
}

async function getRequestData() {
    const response = await Ajax.get(`http://${DOMAIN}/v1/about_film/1`);
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
