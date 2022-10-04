import { PreviewFilm } from '../PreviewFilm/previewFilm.js';
import { Collection, COLLECTION_TYPE } from '../Collection/collection.js';
import { Header } from '../Header/header.js';
import { ROOT } from '../../config/config.js';

export function renderMainPage() {
    const header = new Header(ROOT);
    header.render();

    const previewFilm = new PreviewFilm();
    const promisePreviewFilm = previewFilm.init();

    const collectionPopular = new Collection(COLLECTION_TYPE.todayInCinema);
    const promiseCollectionPopular = collectionPopular.init();

    const collectionCinemaToday = new Collection(COLLECTION_TYPE.popular);
    const promiseCollectionCinemaToday = collectionCinemaToday.init();

    // promisePreviewFilm
    //     .then((response) => {
    //         previewFilm.render(response);
    //         return promiseCollectionPopular;
    //     })
    //     .then((response) => {
    //         collectionPopular.render(response);
    //         return promiseCollectionCinemaToday;
    //     })
        // .then((response) => collectionCinemaToday.render(response));

        // debugger;
        const tpm = Handlebars.templates['components/MainPage/mainPage'];
        let tmp1 = promisePreviewFilm.then((response) => previewFilm.render(response));
        let tmp2 = promiseCollectionPopular.then((response) => collectionPopular.render(response));
        let tm3 = promiseCollectionCinemaToday.then((response) => collectionCinemaToday.render(response));
        // const mainPage = tpm({
        //     previewFilm: tmp1,
        //     collectionPopular: tmp2,
        //     collectionTodayInCinema: "wglwrge",
        // });

        // let main = document.querySelector('main-page');
    let templates = [1,2,3];
        // Promise.all([
            promisePreviewFilm.then((response) => templates[0] = previewFilm.render(response));
            promiseCollectionPopular.then((response) => templates[1] = collectionPopular.render(response));
            promiseCollectionCinemaToday.then((response) => {
                templates[2] = collectionCinemaToday.render(response);
                ROOT.insertAdjacentHTML('beforeend', tpm({
                    previewFilm: templates[0],
                    collectionPopular: templates[1],
                    collectionTodayInCinema: templates[2],
                }));
            });
        // ]
        // .then((templates) => {
        //     debugger;

        //     );
        //     Collection.addHandlers();
        // }));


    // function showCollectionsOnMainPage() {
    //     const collectionPopular = new Collection(COLLECTION_TYPE.todayInCinema);
    //     collectionPopular.render();

    //     const collectionCinemaToday = new Collection(COLLECTION_TYPE.popular);
    //     collectionCinemaToday.render();
    // }
}
