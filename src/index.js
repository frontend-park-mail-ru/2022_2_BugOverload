import { PreviewFilm } from './components/previewFilm/previewFilm.js';
import { Collection, COLLECTION_TYPE } from './components/collection/collection.js';
import { Header } from './components/Header/header.js';
import { ROOT } from './config/config.js';

renderMainPage();

function renderMainPage() {
    const header = new Header(ROOT);

    header.render();

    const previewFilm = new PreviewFilm();
    previewFilm.render();

    showCollectionsOnMainPage();

    function showCollectionsOnMainPage() {
        const collectionPopular = new Collection(COLLECTION_TYPE.todayInCinema);
        collectionPopular.render();

        const collectionCinemaToday = new Collection(COLLECTION_TYPE.popular);
        collectionCinemaToday.render();
    }
}
