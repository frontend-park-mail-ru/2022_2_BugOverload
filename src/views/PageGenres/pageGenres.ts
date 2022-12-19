import { View } from '@views/View';
import template from '@views/CollectionPage/collectionPage.handlebars';
import { genres } from '@assets/icons/genre/genres.js';
import { GenreUI } from 'moviegate-ui-kit';

/**
* Отрисовывает главную страницу, добавляя HTML-шаблон в root в index.html
*
*/
class PageGenres extends View {
    render() {
        const pageCollection = this.rootNode.querySelector('.page__collection');
        if(pageCollection) {
            pageCollection.remove();
        }
        super.render();

        const genresHtml = GenreUI.renderTemplate({
            genres,
        });

        this.rootNode.insertAdjacentHTML('beforeend', template({
            name: 'Жанры',
            films: genresHtml,
        }));
    }
}

export const pageGenres = new PageGenres({ rootNode: document.getElementById('root') });
