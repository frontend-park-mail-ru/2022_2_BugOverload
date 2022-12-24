import { DescriptionFilm } from '@components/DescriptionFilm/descriptionFilm';
import { DetailsFilm } from '@components/DetailsFilm/detailsFilm';
import { Rating } from '@components/Rating/rating';
import { Component } from '@components/Component';
import {
    decoreDuration, decoreListPersons, decoreListItems, decoreCountActors, decoreBudget,
} from '@utils/decorationData';
import { MenuInfoFilmUI } from 'moviegate-ui-kit';

/**
* Отрисовывает меню для переключения описания фильма и полной информацией о нём
* Отвечает за создание классов Rating, Description и Details
*/
export class MenuInfoFilm extends Component {
    /**
     * Cохраняет переданные параметры props через наследуемый компонент
     * @param {Object} - сохраняемые начальные параметры
     */
    constructor(props: componentProps) {
        super(props);
        this.menuState = {
            description: 1,
            details: 2,
        };

        this.location = document.querySelector('.js-film-page__menu');
        this.filmData = props.film;

        this.description = new DescriptionFilm(this.filmData.description);
        this.rating = new Rating(props);
        console.log('filmData',this.filmData)

        const fullDetails: fullDetails = {
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
            box_office: decoreBudget(
                this.filmData.box_office,
                this.filmData.currency_budget,
            ),
            budget: decoreBudget(
                this.filmData.budget,
                this.filmData.currency_budget,
            ),
            currency_budget: this.filmData.currency_budget,
            count_seasons: this.filmData.count_seasons,
            count_ratings: this.filmData.count_ratings,
            count_main_actors: decoreCountActors(this.filmData.actors?.length),
            count_actors: decoreCountActors(this.filmData.count_actors),
            duration: decoreDuration(this.filmData.duration),
            genres: decoreListItems(this.filmData.genres, 3),
            prod_companies: decoreListItems(this.filmData.prod_companies, 3),
            prod_countries: decoreListItems(this.filmData.prod_countries, 3),
        };

        this.details = new DetailsFilm(fullDetails);

        this.state = this.menuState.description;
    }

    render(state:1|2 = this.state) {
        if (!this.location) {
            return;
        }

        this.location.insertAdjacentHTML('afterbegin', MenuInfoFilmUI.renderTemplate());

        this.switchState(state);
    }

    switchState(state:1|2) {
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
            this.rating.componentWillUnmount();
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
        if (!btnDesciption) {
            return;
        }
        this.handlerSwitchToDesription = (function (event: Event) {
            event.preventDefault();
            if (this.location.querySelector('.js-menu-info-film__item-description').dataset.menuInfoFilmItemActive) {
                return;
            }
            this.switchState(this.menuState.description);
        }).bind(this);
        btnDesciption.addEventListener('click', this.handlerSwitchToDesription);

        const btnDetails = document.querySelector('.js-menu-info-film__item-details');
        if (!btnDetails) {
            return;
        }
        this.handlerSwitchToDetails = (function (event: Event) {
            event.preventDefault();
            if (this.location.querySelector('.js-menu-info-film__item-details').dataset.menuInfoFilmItemActive) {
                return;
            }
            this.switchState(this.menuState.details);
        }).bind(this);
        btnDetails.addEventListener('click', this.handlerSwitchToDetails);
    }

    componentWillUnmount() {
        const btnDesciption = document.querySelector('.js-menu-info-film__item-description');
        if (!btnDesciption) {
            return;
        }
        btnDesciption.removeEventListener('click', this.handlerSwitchToDesription);

        const btnDetails = document.querySelector('.js-menu-info-film__item-details');
        if (!btnDetails) {
            return;
        }
        btnDetails.removeEventListener('click', this.handlerSwitchToDetails);
    }

    unsubscribe() {
        this.componentWillUnmount();
        this.rating.unsubscribe();
    }
}
