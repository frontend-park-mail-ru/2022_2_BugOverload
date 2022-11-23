import { ROOT } from '@config/config';
import { View } from '@views/View';
import template from '@views/SearchPage/searchPage.handlebars';

/**
* Отрисовывает главную страницу, добавляя HTML-шаблон в root в index.html
*
*/
class SearchPage extends View {
    render() {
        const mainBody: Element = document.querySelector('.js-search-page');
        if (mainBody) {
            mainBody.remove();
        }
        super.render();

        ROOT.insertAdjacentHTML('beforeend', template());

        // this.previewFilm = new PreviewFilm('js-main-page-preview-film');
        // this.previewFilm.init();

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

export const searchPage = new SearchPage({ rootNode: document.getElementById('root') });

