import { ActorProfile } from '@components/ActorProfile/actorProfile.js';
import { Collection, COLLECTION_TYPE } from '@components/Collection/collection.js';
import { Header } from '@components/Header/header.js';
import { ROOT } from '@config/config.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import template from '@views/ActorProfilePage/actorProfilePage.handlebars';

/**
 * Отрисовывает страницу актера, добавляя HTML-шаблон в root в index.html
 *
 */
export function renderActorProfilePage() {
    const header = new Header(ROOT);
    header.render();

    const actorProfile = new ActorProfile();
    const collectionBestFilms = new Collection(COLLECTION_TYPE.popular);

    Promise.all([
        actorProfile.getRequestData(),
        collectionBestFilms.getRequestData(),
    ]).then((responses) => {
        ROOT.insertAdjacentHTML('beforeend', template({
            actorProfile: actorProfile.renderTemplate(responses[0]),
            collectionBestFilms: collectionBestFilms.renderTemplate(responses[1]),
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

    elems = document.querySelectorAll('.preview-film__button');
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
