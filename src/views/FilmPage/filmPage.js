import { Header } from '../../components/Header/header.js';
import { ROOT } from '../../config/config.js';
import { ShowErrorMessage } from '../../components/ErrorMessage/errorMessage.js';

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
        ROOT.insertAdjacentHTML('beforeend', Handlebars.templates['views/FilmPage/filmPage']({
            about: aboutFilm.renderTemplate(responses[0]),
        }));

        Collection.addHandlers();
        addHandlersToDevelopmentLinks();
    });
}

/**
* Добавляет обработчики на те ссылки, функционал которых ещё разрабатывается
*
*/
function addHandlersToDevelopmentLinks() {
    let elems = document.querySelectorAll('.header__navlink');
    elems.forEach((elem) => errLink(elem));

    elems = document.querySelectorAll('.film__link');
    elems.forEach((elem) => errLink(elem));
}

/**
* Добавляет обработчик на объект, на клик по которому вызывает отрисовку сообщения об ошибке
* @param {elem DOMElement} elem - DOM-элемент, на который будет добавлен обработчик
*/
function errLink(elem) {
    elem.addEventListener('click', (e) => {
        e.preventDefault();
        ShowErrorMessage('Данная страница на стадии разработки');
    });
}
