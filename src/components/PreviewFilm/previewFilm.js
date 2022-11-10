import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { actionGetPreviewData } from '@actions/commonComponentsActions.js';
import template from '@components/PreviewFilm/previewFilm.handlebars';
import { API } from '@config/config.js';

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
    constructor(nameLocation) {
        super();
        this.state = {
            preview: null,
        };
        this.nameLocation = nameLocation;
        this.location = this.rootNode.querySelector(`.${nameLocation}`);

        store.subscribe(`preview-${nameLocation}`, () => {
            this.state.preview = store.getState(`preview-${nameLocation}`);
            this.render();
        });
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
}
