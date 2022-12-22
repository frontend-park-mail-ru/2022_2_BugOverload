import { SaveToCollectionMenu } from '@components/SaveToCollectionMenu/saveToCollectionMenu';
import { Component } from '@components/Component';
import { store } from '@store/Store';
import { ShowMessage } from '@components/Message/message';

import {
    actionSaveToCollection, actionRemoveFromCollection,
} from '@actions/filmActions';
import {
    decoreDuration, decoreListPersons, decoreCountSeasons, decoreColorRating,
} from '@utils/decorationData';
import { API } from '@config/config';
import { Modal } from '@components/Modal/modal';

import { AboutFilmUI } from 'moviegate-ui-kit';

/**
* Отрисовывает стилизованную общую информацию о фильме.
* Создаёт компонент выпадающего меню для сохранения в коллекции
*/
export class AboutFilm extends Component {
    /**
     * Cохраняет переданные параметры props через наследуемый компонент
     * @param {Object} - сохраняемые начальные параметры
     */
    constructor(props: componentProps) {
        super(props);
        this.data = props.film;
        this.location = this.rootNode.querySelector('.js-film-page__about');

        this.state = {
            listCollections: null,
        };

        this.about = {
            poster_hor: this.data.poster_hor,
            name: this.data.name,
            original_name: this.data.original_name,
            rating: this.data.rating,
            prod_year: this.data.prod_year,
            [`type_${this.data.type}`]: true,
            end_year: this.data.end_year,
            duration: decoreDuration(this.data.duration, 'short'),
            count_seasons: decoreCountSeasons(this.data.count_seasons),
            age_limit: this.data.age_limit,
            short_description: this.data.short_description,
            directors: decoreListPersons(this.data.directors, 2),
            actors: decoreListPersons(this.data.actors, 3),
            trailer: this.data.trailer,
        };

        this.subHandler = () => {
            this.state.listCollections = store.getState('listCollectionsUser');

            if ('is_used' in this.state.listCollections.find((coll: userCollListItem) => coll.name === 'Буду смотреть')) {
                (this.location.querySelector('.js-about-film__button_bookmark')as HTMLElement).style.stroke = '#feba2b';
            } else {
                (this.location.querySelector('.js-about-film__button_bookmark')as HTMLElement).style.stroke = '#fff';
            }
        };

        store.subscribe('listCollectionsUser', this.subHandler);
    }

    /**
     * Отрисовывает компонент, используя location и hbs-template.
     * Навешивает обработчики на пользовательский интерфейс, генерируемый компонентом
     */
    render() {
        this.location.insertAdjacentHTML('afterbegin', AboutFilmUI.renderTemplate(this.about));
        this.location.querySelector('.js-about-film').style.backgroundImage = `url('${API.img.poster_hor(this.data.poster_hor)}')`;
        decoreColorRating(this.location, '.js-about-film__rating', this.data.rating);


        this.componentDidMount();
    }

    /**
     * Создаёт класс выпадающего меню.
     * Навешивает обработчики на выпадающее меню,
     * кнопки сохранения в Избранное, кнопку просмотра трейлера
     */
    componentDidMount() {
        const buttonPlus = this.location.querySelector('.js-btn-save-to-coll');
        if (!buttonPlus) {
            return;
        }

        this.menu = new SaveToCollectionMenu('js-place-save-to-collection', this.data.id);
        this.handlerOpenMenu =  (e: Event) => {
            e.preventDefault();
            if (!store.getState('user')) {
                ShowMessage('Вы должны быть авторизованы', 'negative');
                return;
            }
            this.menu.open();
        };

        buttonPlus.addEventListener('click', this.handlerOpenMenu);

        const buttonBookmark = this.location.querySelector('.js-btn-save-to-bookmark');
        if (!buttonBookmark) {
            return;
        }

        this.handlerBookmark = (e: Event) => {
            e.preventDefault();
            if (!store.getState('user')) {
                ShowMessage('Вы должны быть авторизованы', 'negative');
                return;
            }

            this.state.listCollections = store.getState('listCollectionsUser');
            if (!this.state.listCollections) {
                ShowMessage('Не удалось получить список коллекций :(', 'negative');
                return;
            }

            const willWatch = this.state.listCollections.find((coll: userCollListItem) => coll.name === 'Буду смотреть');

            if ('is_used' in willWatch) {
                store.dispatch(actionRemoveFromCollection({
                    idCollection: willWatch.id,
                    idFilm: this.data.id,
                }));
                return;
            }

            store.dispatch(actionSaveToCollection({
                idCollection: willWatch.id,
                idFilm: this.data.id,
            }));
        };

        buttonBookmark.addEventListener('click', this.handlerBookmark);

        const buttonTrailer = this.location.querySelector('.js-btn-watch-trailer');
        if (!buttonBookmark) {
            return;
        }

        this.handlerTrailer = (e: Event) => {
            e.preventDefault();
            const modal = new Modal(this.rootNode);
            modal.render();

            const modalWindow = this.rootNode.querySelector('.js-modal__window__flex');
            modalWindow.insertAdjacentHTML('afterbegin', `<iframe width="720" height="440" src="${this.about.trailer || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
        };

        buttonTrailer.addEventListener('click', this.handlerTrailer);
    }

    /**
     * Используется для освобождения ресурсов.
     * Удаляет обработчики, установленные в ComponentDidMount
     */
    componentWillUnmount() {
        const buttonPlus = this.location.querySelector('.js-btn-save-to-coll');
        if (!buttonPlus) {
            return;
        }
        buttonPlus.removeEventListener('click', this.handlerOpenMenu);

        const buttonBookmark = this.location.querySelector('.js-btn-save-to-bookmark');
        if (!buttonBookmark) {
            return;
        }
        buttonBookmark.removeEventListener('click', this.handlerBookmark);

        const buttonTrailer = this.location.querySelector('.js-btn-watch-trailer');
        if (!buttonBookmark) {
            return;
        }
        buttonTrailer.removeEventListener('click', this.handlerTrailer);
    }

    unsubscribe() {
        this.menu.unsubscribe();
        this.componentWillUnmount();
    }
}
