import { API } from '@config/config';
import { Component } from '@components/Component';

import { DetailsFilmUI } from 'moviegate-ui-kit';

/**
* Отрисовывает подробную информацию о фильме.
*/
export class DetailsFilm extends Component {
    /**
     * Cохраняет переданные параметры props через наследуемый компонент.
     * @param {Object} information - информация о фильме.
     */
    constructor(information: fullDetails) {
        super(); 
        this.information = information;
        // if (this.information.actors) {
        //     this.information.actors
        //         .forEach((person: actor) => { person.avatar = API.img.person_avatar(person.avatar); });
        // }
        console.log('this.information',this.informations )
        // if (this.information.actors) {
        //     this.information.actors = this.information.actors.map(
        //         (person: actor) => { 
        //             person.avatar = API.img.person_avatar(person.avatar); 
        //             return person;
        //         }
        //     );
        // }
        if (this.information.actors) {
                this.information.actors[0].avatar = API.img.person_avatar(this.information.actors[0].avatar);
            }
        console.log('this.information after',this.information)
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
        this.location.insertAdjacentHTML('afterbegin', DetailsFilmUI.renderTemplate(this.information));
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
