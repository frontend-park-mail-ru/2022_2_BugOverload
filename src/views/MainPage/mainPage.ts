import { PreviewFilm } from '@components/PreviewFilm/previewFilm.js';
import { Collection } from '@components/Collection/collection.js';
import { ROOT } from '@config/config.js';
import { View } from '@views/View';
import template from '@views/MainPage/MainPage.handlebars';

/**
* Отрисовывает главную страницу, добавляя HTML-шаблон в root в index.html
*
*/
class MainPage extends View {
    render() {
        const mainBody = document.querySelector('.js-main-page');
        if (mainBody) {
            mainBody.remove();
        }
        super.render();

        ROOT.insertAdjacentHTML('beforeend', template());

        const previewFilm = new PreviewFilm('js-main-page-preview-film');
        previewFilm.init();

        const collectionPopular = new Collection('js-main-page-collection-popular');
        collectionPopular.init();

        const collectionCinemaToday = new Collection('js-main-page-collection-in_cinema');
        collectionCinemaToday.init();
    }
}

export const mainPage = new MainPage({ rootNode: document.getElementById('root') });
