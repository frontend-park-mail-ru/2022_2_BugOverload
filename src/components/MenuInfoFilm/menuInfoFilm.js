import template from '@components/MenuInfoFilm/menuInfoFilm.handlebars';
import { DescriptionFilm } from '@components/DescriptionFilm/descriptionFilm.js';
import { DetailsFilm } from '@components/DetailsFilm/detailsFilm.js';
import { Rating } from '@components/Rating/rating.js';
import { store } from '@store/Store.js';
import { actionOpenDescription, actionOpenDetails } from '@actions/filmActions.js';
import { Component } from '@components/Component.js';


export class MenuInfoFilm extends Component {
    constructor(filmData) {
        super();
        this.menuState = {
            description: 1,
            details: 2,
        };

        this.location = document.querySelector('.js-film-page__menu');

        this.description = new DescriptionFilm(filmData.description);
        this.rating = new Rating();
        this.details = new DetailsFilm(filmData.details);

        this.state = this.menuState.description;
    }

    render(state = this.state) {
        if (!this.location) {
            return;
        }

        this.location.insertAdjacentHTML('afterbegin', template());

        // this.description = this.description ? this.description
        //     : new DescriptionFilm(this.filmData.description);

        // this.details = this.details ? this.details : new DetailsFilm(this.filmData.details);
        // this.rating = this.rating ? this.rating : new Rating();

        this.switchState(state);
        // store.dispatch(actionOpenDescription());
    }

    switchState(state) {
        switch (state) {
        case this.menuState.description:
            // if (this.description.isActive) {
            //     break;
            // }
            this.details.remove();
            delete this.location.querySelector('.js-menu-info-film__item-details').dataset.menuInfoFilmItemActive;

            this.description.render();
            // debugger;
            this.rating.render();
            this.rating.componentDidMount();
            this.location.querySelector('.js-menu-info-film__item-description').dataset.menuInfoFilmItemActive = 'true';
            this.state = this.menuState.description;
            break;
        case this.menuState.details:
            // if (this.details.isActive) {
            //     break;
            // }
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

            // store.dispatch(actionOpenDescription());
        };
        btnDesciption.addEventListener('click', switchToDesription);

        const btnDetails = document.querySelector('.js-menu-info-film__item-details');
        const switchToDetails = (event) => {
            event.preventDefault();
            // this.switchState(this.menuState.details);
            // debugger;
            if (this.location.querySelector('.js-menu-info-film__item-details').dataset.menuInfoFilmItemActive) {
                return;
            }
            this.switchState(this.menuState.details);
            // store.dispatch(actionOpenDetails());
        };
        btnDetails.addEventListener('click', switchToDetails);
    }
}
