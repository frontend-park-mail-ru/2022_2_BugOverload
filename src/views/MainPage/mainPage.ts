import { PreviewFilm } from '@components/PreviewFilm/previewFilm.js';
import { Collection } from '@components/Collection/collection';
import { ROOT } from '@config/config';
import { View } from '@views/View';
import template from '@views/MainPage/MainPage.handlebars';

/**
* Отрисовывает главную страницу, добавляя HTML-шаблон в root в index.html
*
*/
class MainPage extends View {
    render() {
        const mainBody: Element = document.querySelector('.js-main-page');
        if (mainBody) {
            mainBody.remove();
        }
        super.render();

        ROOT.insertAdjacentHTML('beforeend', template());

        this.previewFilm = new PreviewFilm('js-main-page-preview-film');
        this.previewFilm.init();

        this.collectionPopular = new Collection('js-main-page-collection-popular');
        this.collectionPopular.init();

        this.collectionCinemaToday = new Collection('js-main-page-collection-in_cinema');
        this.collectionCinemaToday.init();
    }

    componentWillUnmount() {
        const components = [
            this.previewFilm,
            this.collectionPopular,
            this.collectionCinemaToday,
        ];

        this.previewFilm?.unsubscribe();
        this.collectionPopular?.unsubscribe();
        this.collectionCinemaToday?.unsubscribe();
    }
}

export const mainPage = new MainPage({ rootNode: document.getElementById('root') });

const checkUnmount = (component :anyObject) => {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(component))
    .includes('componentWillUnmount');
}