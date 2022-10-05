import { PreviewFilm } from '../PreviewFilm/previewFilm.js';
import { Collection, COLLECTION_TYPE } from '../Collection/collection.js';
import { Header } from '../Header/header.js';
import { ROOT } from '../../config/config.js';

export function renderMainPage() {
    const header = new Header(ROOT);
    header.render();

    const previewFilm = new PreviewFilm();
    const collectionPopular = new Collection(COLLECTION_TYPE.todayInCinema);
    const collectionCinemaToday = new Collection(COLLECTION_TYPE.popular);

    Promise.all([previewFilm.init(), collectionPopular.init(), collectionCinemaToday.init()])
        .then((responses) => {
            ROOT.insertAdjacentHTML('beforeend', Handlebars.templates['components/MainPage/mainPage']({
                previewFilm: previewFilm.render(responses[0]),
                collectionPopular: collectionPopular.render(responses[1]),
                collectionTodayInCinema: collectionCinemaToday.render(responses[2]),
            }));

            Collection.addHandlers();
        });
}
