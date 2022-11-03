import template from '@components/MenuInfoFilm/menuInfoFilm.handlebars';
import { DescriptionFilm } from '@components/DescriptionFilm/descriptionFilm.js';
import { DetailsFilm } from '@components/DetailsFilm/detailsFilm.js';
import { Rating } from '@components/Rating/rating.js';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';

export class MenuInfoFilm extends Component {
    constructor() {
        super();
        this.menuState = {
            description: 1,
            details: 2,
        };

        this.location = document.querySelector('.js-film-page__menu');
        this.filmData = store.getState('film');

        this.description = new DescriptionFilm(this.filmData.descriptionText);
        this.rating = new Rating();

        const fullDetails = this.filmData.details;
        fullDetails.type_serial = this.filmData.about.type_serial;
        fullDetails.year_prod = this.filmData.about.year_prod;
        fullDetails.directors = this.filmData.about.directors;
        fullDetails.age_limit = this.filmData.about.age_limit;
        fullDetails.duration = this.filmData.about.duration;

        this.details = new DetailsFilm(fullDetails);

        this.state = this.menuState.description;
    }

    render(state = this.state) {
        if (!this.location) {
            return;
        }

        this.location.insertAdjacentHTML('afterbegin', template());

        this.switchState(state);
    }

    switchState(state) {
        switch (state) {
        case this.menuState.description:
            this.details.remove();
            delete this.location.querySelector('.js-menu-info-film__item-details').dataset.menuInfoFilmItemActive;

            this.description.render();
            this.rating.render();
            this.rating.componentDidMount();
            this.location.querySelector('.js-menu-info-film__item-description').dataset.menuInfoFilmItemActive = 'true';
            this.state = this.menuState.description;
            break;
        case this.menuState.details:
            this.description.remove();
            this.rating.componentDidUnmount();
            this.rating.remove();

            delete this.location.querySelector('.js-menu-info-film__item-description').dataset.menuInfoFilmItemActive;

            this.details.render();
            this.location.querySelector('.js-menu-info-film__item-details').dataset.menuInfoFilmItemActive = 'true';
            this.state = this.menuState.details;
            break;
        default:
            break;
        }
    }

    componentDidMount() {
        const btnDesciption = document.querySelector('.js-menu-info-film__item-description');
        const switchToDesription = (event) => {
            event.preventDefault();
            if (this.location.querySelector('.js-menu-info-film__item-description').dataset.menuInfoFilmItemActive) {
                return;
            }
            this.switchState(this.menuState.description);
        };
        btnDesciption.addEventListener('click', switchToDesription);

        const btnDetails = document.querySelector('.js-menu-info-film__item-details');
        const switchToDetails = (event) => {
            event.preventDefault();
            if (this.location.querySelector('.js-menu-info-film__item-details').dataset.menuInfoFilmItemActive) {
                return;
            }
            this.switchState(this.menuState.details);
        };
        btnDetails.addEventListener('click', switchToDetails);
    }
}
