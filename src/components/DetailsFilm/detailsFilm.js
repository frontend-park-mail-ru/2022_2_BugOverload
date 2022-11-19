import template from '@components/DetailsFilm/detailsFilm.handlebars';
import { API } from '@config/config';

/**
* Отрисовывает подробную информацию о фильме.
*/
export class DetailsFilm {
    /**
     * Cохраняет переданные параметры props через наследуемый компонент.
     * @param {Object} information - информация о фильме.
     */
    constructor(information = {}) {
        this.information = information;
        if (this.information.actors) {
            this.information.actors
                .forEach((person) => { person.avatar = API.img.person_avatar(person.avatar); });
        }
        this.location = document.querySelector('.js-film-page__details');
    }

    /**
    * Отрисовывает компонент, используя location и hbs-template.
    */
    render() {
        if (!this.location) {
            return;
        }

        this.isActive = true;
        this.location.insertAdjacentHTML('afterbegin', template(this.information));
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
