import template from '@components/AboutFilm/aboutFilm.handlebars';
import { SaveToCollectionMenu } from '@components/SaveToCollectionMenu/saveToCollectionMenu';
import { Component } from '@components/Component';
import { store } from '@store/Store';
import { ShowMessage } from '@components/Message/message';
import {
    decoreDuration, decoreListPersons, decoreCountSeasons, decoreColorRating,
} from '@utils/decorationData';
import { API } from '@config/config';

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

        this.menu = new SaveToCollectionMenu('js-place-save-to-collection');
        this.handlerOpenMenu =  (e: Event) => {
            e.preventDefault();
            if (!store.getState('user')) {
                ShowMessage('Вы должны быть авторизованы', 'negative');
                return;
            }
            this.menu.open();
        };

        buttonPlus.addEventListener('click', this.handlerOpenMenu);

        const buttonBookmark = document.querySelector('.js-btn-save-to-bookmark');
        if (!buttonBookmark) {
            return;
        }

        this.handlerBookmark = function (e: Event) {
            e.preventDefault();
            if (!store.getState('user')) {
                ShowMessage('Вы должны быть авторизованы', 'negative');
                return;
            }
            ShowMessage('Сохранение в Избранное пока не доступно', 'negative');
        };

        buttonBookmark.addEventListener('click', this.handlerBookmark);

        const buttonTrailer = document.querySelector('.js-btn-watch-trailer');
        if (!buttonBookmark) {
            return;
        }

        this.handlerTrailer = function (e: Event) {
            e.preventDefault();
            ShowMessage('Просмотр трейлера пока не доступен', 'negative');
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

    unsubscribe() {
        this.menu.unsubscribe();
        this.componentWillUnmount();
    }
}
