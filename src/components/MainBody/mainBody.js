import { PreviewFilm } from '@components/PreviewFilm/previewFilm.js';
import { Collection, COLLECTION_TYPE } from '@components/Collection/collection.js';
import { ROOT } from '@config/config.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import template from '@components/MainBody/mainBody.handlebars';

/**
* Отрисовывает главную страницу, добавляя HTML-шаблон в root в index.html
*
*/
export class MainBody {
    renderMainPage() {
        const previewFilm = new PreviewFilm();
        const collectionPopular = new Collection(COLLECTION_TYPE.todayInCinema);
        const collectionCinemaToday = new Collection(COLLECTION_TYPE.popular);
    
        Promise.all([
            previewFilm.getRequestData(),
            collectionPopular.getRequestData(),
            collectionCinemaToday.getRequestData(),
        ]).then((responses) => {
            ROOT.insertAdjacentHTML('beforeend', template({
                previewFilm: previewFilm.renderTemplate(responses[0]),
                collectionPopular: collectionPopular.renderTemplate(responses[1]),
                collectionTodayInCinema: collectionCinemaToday.renderTemplate(responses[2]),
            }));
    
            Collection.addHandlers();
            this.addHandlersToDevelopmentLinks();
        });
    }

    /**
    * Добавляет обработчики на те ссылки, функционал которых ещё разрабатывается
    *
    */
    addHandlersToDevelopmentLinks() {
        let elems = document.querySelectorAll('.header__navlink');
        elems.forEach((elem) => this.errLink(elem));

        elems = document.querySelectorAll('.preview-film__button');
        elems.forEach((elem) => this.errLink(elem));

        elems = document.querySelectorAll('.film__link');
        elems.forEach((elem) => this.errLink(elem));
    }

    /**
    * Добавляет обработчик на объект, на клик по которому вызывает отрисовку сообщения об ошибке
    * @param {elem DOMElement} elem - DOM-элемент, на который будет добавлен обработчик
    */
    errLink(elem) {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            ShowErrorMessage('Данная страница на стадии разработки');
        });
    }
}
