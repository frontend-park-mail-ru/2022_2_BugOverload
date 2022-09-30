import { PreviewFilm } from './components/preview_film/preview_film.js';
import { Collection } from './components/collection/collection.js';
import { COLLECTION_TYPE } from './components/collection/collection.js';

renderMainPage();



function renderMainPage() {
    let root = document.getElementById('root');

    let navbar = Handlebars.templates['navbar']({});
    let div = document.createElement('div');
    div.innerHTML = navbar;
    root.append(div);

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
