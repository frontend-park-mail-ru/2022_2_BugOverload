import { PreviewFilm } from './components/previewFilm/previewFilm.js';
import { Collection } from './components/collection/collection.js';
import { COLLECTION_TYPE } from './components/collection/collection.js';
import { Header } from './components/Header/header.js';
import { ROOT } from '../utils/root.js';


renderMainPage();


function renderMainPage() {

    let root = document.getElementById('root');

    const header = new Header(root);
    header.render();

    const previewFilm = new PreviewFilm;
    previewFilm.render();

    showCollectionsOnMainPage();

    function showCollectionsOnMainPage() {
        const collectionPopular = new Collection(COLLECTION_TYPE.todayInCinema);
        collectionPopular.render();

        const collectionCinemaToday = new Collection(COLLECTION_TYPE.popular);
        collectionCinemaToday.render();
    }
}
