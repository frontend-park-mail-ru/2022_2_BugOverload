import template from '@components/MenuInfoFilm/menuInfoFilm.handlebars';
import { DescriptionFilm } from '@components/DescriptionFilm/descriptionFilm.js';
import { DetailsFilm } from '@components/DetailsFilm/detailsFilm.js';
import { Rating } from '@components/Rating/rating.js';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { decoreDuration, decoreListPersons, decoreListItems } from '@utils/decorationData.js';

export class MenuInfoFilm extends Component {
    constructor() {
        super();
        this.menuState = {
            description: 1,
            details: 2,
        };

        this.location = document.querySelector('.js-film-page__menu');
        this.filmData = store.getState('film');

        this.description = new DescriptionFilm(this.filmData.description);
        this.rating = new Rating();

        const fullDetails = {
            [`type_${this.filmData.type}`]: true,
            prod_year: this.filmData.prod_year,
            end_year: this.filmData.end_year,
            actors: decoreListPersons(this.filmData.actors, 10, ''),
            directors: decoreListPersons(this.filmData.directors, 3),
            composers: decoreListPersons(this.filmData.composers, 3),
            operators: decoreListPersons(this.filmData.operators, 3),
            montage: decoreListPersons(this.filmData.montage, 3),
            writers: decoreListPersons(this.filmData.writers, 3),
            producers: decoreListPersons(this.filmData.producers, 3),
            rating: this.filmData.rating,
            slogan: this.filmData.slogan,
            age_limit: this.filmData.age_limit,
            box_office: this.filmData.box_office,
            budget: this.filmData.budget,
            count_seasons: this.filmData.count_seasons,
            duration: decoreDuration(this.filmData.duration),
            genres: decoreListItems(this.filmData.genres, 3),
            prod_companies: decoreListItems(this.filmData.prod_companies, 3),
            prod_countries: decoreListItems(this.filmData.prod_countries, 3),

        };

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