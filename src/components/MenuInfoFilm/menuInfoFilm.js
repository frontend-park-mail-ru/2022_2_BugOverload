import template from '@components/MenuInfoFilm/menuInfoFilm.handlebars';
import { DescriptionFilm } from '@components/DescriptionFilm/descriptionFilm.js';
import { DetailsFilm } from '@components/DetailsFilm/detailsFilm.js';
import { Rating } from '@components/Rating/rating.js';

export class MenuInfoFilm {
    constructor(filmData) {
        this.menuState = {
            description: 1,
            details: 2,
        };

        this.filmData = filmData;
        this.state = this.menuState.description;
    }

    renderTemplate(state = this.state) {
        this.location = this.location ? this.location : document.querySelector('.js-film-page__menu');
        this.location.insertAdjacentHTML('afterbegin', template());

        this.description = this.description ? this.description
            : new DescriptionFilm(this.filmData.description);

        this.details = this.details ? this.details : new DetailsFilm(this.filmData.details);
        this.rating = this.rating ? this.rating : new Rating();

        this.switchState(state);
    }

    switchState(state) {
        switch (state) {
        case this.menuState.description:
            if (this.description.isActive) {
                break;
            }
            this.details.remove();
            delete this.location.querySelector('.js-menu-info-film__item-details').dataset.menuInfoFilmItemActive;

            this.description.renderTemplate();
            this.rating.renderTemplate();
            this.location.querySelector('.js-menu-info-film__item-description').dataset.menuInfoFilmItemActive = 'true';
            this.state = this.menuState.description;
            break;
        case this.menuState.details:
            if (this.details.isActive) {
                break;
            }
            this.description.remove();
            this.rating.remove();
            delete this.location.querySelector('.js-menu-info-film__item-description').dataset.menuInfoFilmItemActive;

            this.details.renderTemplate();
            this.location.querySelector('.js-menu-info-film__item-details').dataset.menuInfoFilmItemActive = 'true';
            this.state = this.menuState.details;
            break;
        default:
            // this.description.renderTemplate();
            break;
        }
    }

    addHandlers() {
        const btnDesciption = document.querySelector('.js-menu-info-film__item-description');
        const switchToDesription = (event) => {
            event.preventDefault();
            this.switchState(this.menuState.description);
        };
        btnDesciption.addEventListener('click', switchToDesription);

        const btnDetails = document.querySelector('.js-menu-info-film__item-details');
        const switchToDetails = (event) => {
            event.preventDefault();
            this.switchState(this.menuState.details);
        };
        btnDetails.addEventListener('click', switchToDetails);
    }
}
