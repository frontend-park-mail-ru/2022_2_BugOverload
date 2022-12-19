import { Component } from '@components/Component';

import { DescriptionFilmUI } from 'moviegate-ui-kit';

/**
* Отрисовывает описание фильма.
*/
export class DescriptionFilm extends Component {
    /**
     * Cохраняет переданные параметры props через наследуемый компонент.
     * @param {string} text - описание фильма,
     * соответствующее имени класса-контейнера на странице.
     */
    constructor(text = '') {
        super();
        this.text = text;
        this.location = document.querySelector('.js-film-page__description');
    }

    /**
    * Отрисовывает компонент, используя location и hbs-template.
    */
    render() {
        if (!this.location) {
            return;
        }

        this.isActive = true;
        this.location.insertAdjacentHTML('afterbegin', DescriptionFilmUI.renderTemplate({ text: this.text }));
    }

    /**
     * Удаляет элемент со страницы
     */
    remove() {
        if (!this.location) {
            return;
        }

        if (this.isActive) {
            this.location.innerHTML = '';
        }

        this.isActive = false;
    }
}
