import { PreviewFilm } from '@components/PreviewFilm/previewFilm';
import { Collection } from '@components/Collection/collection';
import { ROOT } from '@config/config';
import { View } from '@views/View';
import template from '@views/MainPage/MainPage.handlebars';
import templateGenres from '@components/Genre/genre.handlebars';
import { genres } from '@assets/icons/genre/genres.js';
import { CollectionUI } from 'moviegate-ui-kit';

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

        this.collectionPopular = new Collection('collection-tag-popular');
        this.collectionPopular.init();

        this.collectionCinemaToday = new Collection('collection-tag-in_cinema');
        this.collectionCinemaToday.init();

        const genresHtml = templateGenres({
            genres,
        });
        const collectionGenres = new Collection('');
        const collectionGenreDiv = this.rootNode.querySelector('.js-collection-genre-genres');
        setTimeout(() => {
            collectionGenreDiv.insertAdjacentHTML('beforeend', CollectionUI.renderTemplate({
                films: genresHtml,
                name: 'Жанры',
                url: `genres`,
            }));
            collectionGenres.addHandlerSlider(
                collectionGenreDiv.querySelector('.js-collection__container'),
                true
            );
        }, 1000);
    }

    componentWillUnmount() {
        this.previewFilm?.unsubscribe();
        this.collectionPopular?.unsubscribe();
        this.collectionCinemaToday?.unsubscribe();
    }
}

export const mainPage = new MainPage({ rootNode: document.getElementById('root') });
