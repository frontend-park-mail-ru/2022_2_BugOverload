import { Film } from '@components/Film/film.js';
import { Component } from '@components/Component';
import { store } from '@store/Store';
import { actionGetCollectionData } from '@actions/commonComponentsActions';
import template from '@components/Collection/collection.handlebars';

/**
* Отрисовывает список фильмов в виде коллекции.
* Перерисовывается при изменении state 'collection'
*/
export class Collection extends Component {
    /**
     * Cохраняет переданные параметры props через наследуемый компонент
     * Подписывается на изменение state collection-<nameLocation>
     * @param {string} nameLocation - сохраняет имя элемента,
     * соответствующее имени класса-контейнера на странице.
     */
    constructor(nameLocation: string) {
        super();
        this.state = {
            collection: null,
        };
        this.nameLocation = nameLocation;
        this.location = this.rootNode.querySelector(`.${nameLocation}`);

        this.subHandler = () => {
            this.state.collection = store.getState(`collection-${nameLocation}`);
            this.render();
        };

        store.subscribe(`collection-${nameLocation}`, this.subHandler);
    }

    /**
    * Инициализация компонента
    * Выбрасывает action для получения данных в state collection
    */
    init() {
        store.dispatch(
            actionGetCollectionData({
                target: 'tag',
                key: this.getTagFromName(this.nameLocation),
                sortParam: 'rating',
                countFilms: 20,
                delimiter: 20,
            }),
        );
    }

    /**
    * Достаёт из имени класса Dom-элемента тэг
    * @param {string} name - имя класса Dom-элемента
    */
    getTagFromName(name: string) {
        const words = name.split('-');
        return words[words.length - 1];
    }

    /**
     * Отрисовывает компонент, используя location и hbs-template.
     * Навешивает обработчики на пользовательский интерфейс, генерируемый компонентом
     */
    render() {
        const films = this.state.collection.films.reduce((res: string, filmData: film) => res + Film.createFilm(filmData), '');

        let { name } = this.state.collection;
        if (name) {
            name = name[0].toUpperCase() + name.slice(1);
            this.state.collection.name = name;
        }

        this.location.insertAdjacentHTML('afterbegin', template({ name: this.state.collection.name, films }));
        this.componentDidMount();
    }

    /**
     * Навешивает обработчики на кнопки прокрутки коллекции
     */
    componentDidMount() {
        const slider: HTMLElement = this.location.querySelector('.js-collection__container');
        if (!slider) {
            return;
        }
        this.addHandlerSlider(slider);
    }

    /**
     * Используется для освобождения ресурсов.
     * Удаляет обработчики, установленные в ComponentDidMount
     */
    componentWillUnmount() {
        const slider = this.location.querySelector('.js-collection__container');
        if (!slider) {
            return;
        }
        slider.removeEventListener('click', this.handlerSlider);
    }

    unsubscribe() {
        this.componentWillUnmount();
        store.unsubscribe(`collection-${this.nameLocation}`, this.subHandler);
    }

    /**
    * Служит для добавления обработчиков на переданный слайдер в виде DOM-объекта.
    * Добавлет к слайдеру функционал скролла по нажатию соответствующей кнопки.
    *
    * @param {slider DOMElement} slider - DOM-объекта cайдера на странице
    */
    addHandlerSlider(slider: HTMLElement) {
        const btnRight: HTMLElement = slider.querySelector('.js-collection__slider-button_right');
        const btnLeft: HTMLElement = slider.querySelector('.js-collection__slider-button_left');
        const body: HTMLElement = slider.querySelector('.js-collection__slider');

        const count = slider.querySelectorAll('.js-film').length;

        const boundMargin = 52;
        const spaceBetweenFilms = 30;
        const widthFilm = 260;
        if (document.documentElement.clientWidth - 2 * boundMargin
                > count * widthFilm - spaceBetweenFilms) {
            btnRight.style.display = 'none';
        }
        btnLeft.style.display = 'none';

        let offset = 0;
        const boundMarginForBtn = 64;
        const maxLength = widthFilm * count;
        const getMaxOffset = () => maxLength - document.documentElement.clientWidth
            + boundMarginForBtn;
        const getOffset = () => Math.trunc(document.documentElement.clientWidth
            / widthFilm) * widthFilm;

        let isHiddenRight = false;
        let isHiddenLeft = true;

        this.handlerSlider = function (event: Event) {
            if (event.target === btnRight.querySelector('img')) {
                event.preventDefault();
                if (isHiddenLeft) {
                    btnLeft.style.display = '';
                    isHiddenLeft = false;
                }

                offset += getOffset();
                if (offset > getMaxOffset()) {
                    offset = getMaxOffset();
                }

                body.style.left = `${-offset}px`;
                if (offset >= getMaxOffset()) {
                    btnRight.style.display = 'none';
                    isHiddenRight = true;
                }

                return;
            }

            if (event.target === btnLeft.querySelector('img')) {
                event.preventDefault();
                if (isHiddenRight) {
                    btnRight.style.display = '';
                    isHiddenRight = false;
                }
                offset -= getOffset();
                if (offset <= 0) {
                    offset = 0;
                }

                body.style.left = `${-offset}px`;
                if (offset <= 0) {
                    btnLeft.style.display = 'none';
                    isHiddenLeft = true;
                }
            }
        };

        slider.addEventListener('click', this.handlerSlider);
    }
}
