import { PreviewFilm } from './components/PreviewFilm/previewFilm.js';
import { Collection, COLLECTION_TYPE } from './components/Collection/collection.js';
import { Header } from './components/Header/header.js';
import { ROOT } from './config/config.js';

renderMainPage();

function renderMainPage() {
    const header = new Header(ROOT);
    header.render();

    const previewFilm = new PreviewFilm();
    const promisePreviewFilm = previewFilm.init();

    const collectionPopular = new Collection(COLLECTION_TYPE.todayInCinema);
    const promiseCollectionPopular = collectionPopular.init();

    const collectionCinemaToday = new Collection(COLLECTION_TYPE.popular);
    const promiseCollectionCinemaToday = collectionCinemaToday.init();

    promisePreviewFilm
        .then((response) => {
            previewFilm.render(response);
            return promiseCollectionPopular;
        })
        .then((response) => {
            collectionPopular.render(response);
            return promiseCollectionCinemaToday;
        })
        .then((response) => collectionCinemaToday.render(response));

    // function showCollectionsOnMainPage() {
    //     const collectionPopular = new Collection(COLLECTION_TYPE.todayInCinema);
    //     collectionPopular.render();

    //     const collectionCinemaToday = new Collection(COLLECTION_TYPE.popular);
    //     collectionCinemaToday.render();
    // }
}
