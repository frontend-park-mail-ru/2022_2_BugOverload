import { Component } from '@components/Component';
import { store } from '@store/Store';
import { actionGetPreviewData } from '@actions/commonActions';
import template from '@components/PreviewFilm/previewFilm.handlebars';
import { API } from '@config/config';

/**
* Отображает фильм как рекомендацию на главной странице
*/
export class PreviewFilm extends Component {
    /**
     * Cохраняет переданные параметры props через наследуемый компонент
     * Подписывается на изменение state preview-<nameLocation>
     * @param {string} nameLocation - сохраняет имя элемента,
     * соответствующее имени класса-контейнера на странице.
     */
    constructor(nameLocation: string) {
        super();
        this.state = {
            preview: null,
        };
        this.nameLocation = nameLocation;
        this.location = this.rootNode.querySelector(`.${nameLocation}`);

        this.subHandler = () => {
            this.state.preview = store.getState(`preview-${nameLocation}`);
            this.render();
        };

        store.subscribe(`preview-${nameLocation}`, this.subHandler);
    }

    /**
    * Инициализация компонента
    * Выбрасывает action для получения данных в state preview-<nameLocation>.
    */
    init() {
        store.dispatch(
            actionGetPreviewData({
                name: this.nameLocation,
            }),
        );
    }

    /**
     * Отрисовывает компонент, используя location и hbs-template.
     */
    render() {
        this.location.innerHTML = '';
        this.location.insertAdjacentHTML('afterbegin', template(this.state.preview));
        this.location.querySelector('.js-preview-film').style.backgroundImage = `url('${API.img.poster_hor(this.state.preview.poster_hor)}')`;
    }

    unsubscribe() {
        store.unsubscribe(`preview-${this.nameLocation}`, this.subHandler);
    }
}
