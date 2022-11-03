import { PreviewFilm } from '@components/PreviewFilm/previewFilm.js';
import { Collection, COLLECTION_TYPE } from '@components/Collection/collection.js';
import { ROOT, API } from '@config/config.js';
import { View } from '@views/View.js';
import template from '@views/MainPage/mainPage.handlebars';

/**
* Отрисовывает главную страницу, добавляя HTML-шаблон в root в index.html
*
*/
class MainPage extends View {
    render() {
        const mainBody = document.querySelector('.main-page');
        if (mainBody) {
            mainBody.remove();
        }
        super.render();
        const previewFilm = new PreviewFilm();
        const collectionPopular = new Collection(COLLECTION_TYPE.todayInCinema);
        const collectionCinemaToday = new Collection(COLLECTION_TYPE.popular);

        Promise.all([
            previewFilm.getRequestData(),
            Collection.getRequestData(API.popular_films),
            Collection.getRequestData(API.in_cinema),
        ]).then((responses) => {
            ROOT.insertAdjacentHTML('beforeend', template({
                previewFilm: previewFilm.getTemplate(),
                collectionPopular: collectionPopular.getTemplate(responses[1]),
                collectionTodayInCinema: collectionCinemaToday.getTemplate(responses[2]),
            }));

            Collection.addHandlers();
        });
    }
}

export const mainPage = new MainPage({ rootNode: document.getElementById('root') });
