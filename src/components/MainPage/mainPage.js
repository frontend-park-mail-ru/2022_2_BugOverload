import { PreviewFilm } from '../PreviewFilm/previewFilm.js';
import { Collection, COLLECTION_TYPE } from '../Collection/collection.js';
import { Header } from '../Header/header.js';
import { ROOT } from '../../config/config.js';
import { ShowErrorMessage } from '../ErrorMessage/errorMessage.js';

/**
* Отрисовывает главную страницу, добавляя HTML-шаблон в root в index.html
*
*/
export function renderMainPage() {
    const header = new Header(ROOT);
    header.render();

    const previewFilm = new PreviewFilm();
    const collectionPopular = new Collection(COLLECTION_TYPE.todayInCinema);
    const collectionCinemaToday = new Collection(COLLECTION_TYPE.popular);

    Promise.all([
        previewFilm.getRequestData(),
        collectionPopular.getRequestData(),
        collectionCinemaToday.getRequestData(),
    ]).then((responses) => {
        ROOT.insertAdjacentHTML('beforeend', Handlebars.templates['components/MainPage/mainPage']({
            previewFilm: previewFilm.renderTemplate(responses[0]),
            collectionPopular: collectionPopular.renderTemplate(responses[1]),
            collectionTodayInCinema: collectionCinemaToday.renderTemplate(responses[2]),
        }));

        Collection.addHandlers();
        addHandlersToDevelopmentLinks();
    });
}

export function addHandlersToDevelopmentLinks() {
    let elems = document.querySelectorAll('.header__navlink');
    elems.forEach((elem) => errLink(elem));

    elems = document.querySelectorAll('.film__poster');
    elems.forEach((elem) => errLink(elem));
}

function errLink(elem) {
    elem.addEventListener('click', (e) => {
        e.preventDefault();
        ShowErrorMessage('Данная страница на стадии разработки');
    });
}
