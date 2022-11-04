import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { actionGetPreviewData } from '@actions/commonComponentsActions.js';
import template from '@components/PreviewFilm/previewFilm.handlebars';
/**
* Ходит за данными на бэкенд.
* Рендерит HTML-шаблон превью фильма на главной
*
*/
export class PreviewFilm extends Component {
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

    init() {
        store.dispatch(
            actionGetPreviewData({
                name: this.nameLocation,
            }),
        );
    }

    render() {
        this.location.innerHTML = '';
        this.location.insertAdjacentHTML('afterbegin', template(this.state.preview));
        // Вот так норм добавлять картинку?
        this.location.querySelector('.preview-film').style.backgroundImage = `url(http://${DOMAIN}/${this.state.preview.poster_hor})`;
    }
}
