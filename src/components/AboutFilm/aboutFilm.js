import template from '@components/AboutFilm/aboutFilm.handlebars';
import { SaveToCollectionMenu } from '@components/SaveToCollectionMenu/saveToCollectionMenu.js';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import {
    decoreDuration, decoreListPersons, decoreCountSeasons, decoreColorRating,
} from '@utils/decorationData.js';
import { API } from '@config/config.js';

/**
* Отрисовывает стилизованную общую информацию о фильме.
* Создаёт компонент выпадающего меню для сохранения в коллекции
*/
export class AboutFilm extends Component {
    /**
     * Cохраняет переданные параметры props через наследуемый компонент
     * @param {Object} - сохраняемые начальные параметры
     */
    constructor(props) {
        super(props);
        this.data = props.film;
        this.location = this.rootNode.querySelector('.js-film-page__about');

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
        };
    }

    /**
     * Отрисовывает компонент, используя location и hbs-template.
     * Навешивает обработчики на пользовательский интерфейс, генерируемый компонентом
     */
    render() {
        this.location.insertAdjacentHTML('afterbegin', template(this.about));
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
        const buttonPlus = document.querySelector('.js-btn-save-to-coll');
        if (!buttonPlus) {
            return;
        }

        const menu = new SaveToCollectionMenu();
        this.handlerOpenMenu = function (e) {
            e.preventDefault();
            if (!store.getState('user')) {
                ShowErrorMessage('Вы должны быть авторизованы');
                return;
            }
            menu.open();
        };

        buttonPlus.addEventListener('click', this.handlerOpenMenu);

        const buttonBookmark = document.querySelector('.js-btn-save-to-bookmark');
        if (!buttonBookmark) {
            return;
        }

        this.handlerBookmark = function (e) {
            e.preventDefault();
            if (!store.getState('user')) {
                ShowErrorMessage('Вы должны быть авторизованы');
                return;
            }
            ShowErrorMessage('Сохранение в Избранное пока не доступно');
        };

        buttonBookmark.addEventListener('click', this.handlerBookmark);

        const buttonTrailer = document.querySelector('.js-btn-watch-trailer');
        if (!buttonBookmark) {
            return;
        }

        this.handlerTrailer = function (e) {
            e.preventDefault();
            ShowErrorMessage('Просмотр трейлера пока не доступен');
        };

        buttonTrailer.addEventListener('click', this.handlerTrailer);
    }

    /**
     * Используется для освобождения ресурсов.
     * Удаляет обработчики, установленные в ComponentDidMount
     */
    componentWillUnmount() {
        const buttonPlus = document.querySelector('.js-btn-save-to-coll');
        if (!buttonPlus) {
            return;
        }
        buttonPlus.removeEventListener('click', this.handlerOpenMenu);

        const buttonBookmark = document.querySelector('.js-btn-save-to-bookmark');
        if (!buttonBookmark) {
            return;
        }
        buttonBookmark.removeEventListener('click', this.handlerBookmark);

        const buttonTrailer = document.querySelector('.js-btn-watch-trailer');
        if (!buttonBookmark) {
            return;
        }
        buttonTrailer.removeEventListener('click', this.handlerTrailer);
    }
}
