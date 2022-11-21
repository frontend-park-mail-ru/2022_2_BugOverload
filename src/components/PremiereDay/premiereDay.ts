import template from '@components/PremiereDay/premiereDay.handlebars';
import { Component } from '@components/Component';
import { PremiereFilm } from '@components/PremiereFilm/premiereFilm';
import { decoreDate } from '@utils/decorationData';

/**
* Рейтинг фильма.
* Отрисовывает рейтинг и форму для отправки удаления оценки.
* Подписывается на измненение state rating
*/
export class PremiereDay extends Component {
    constructor(props: componentProps) {
        super(props);
        this.nameLocation = props.nameLocation;
        this.location = this.rootNode.querySelector(`.${this.nameLocation}`);

        this.filmsData = props.filmsData;

        // this.state = {
        //     film: props.film,
        //     rating: null,
        //     statusRating: null,
        //     countScores: props.film.count_ratings,
        // };
    }
    // init() { //*

    // }

    render() {
        const films = this.filmsData
            .reduce((res: string, filmData: filmPremiere) => res + PremiereFilm.createFilmPremiere(filmData), '');
        console.log(template(films));
        const date: Array<string> = decoreDate(this.filmsData[0].prod_date).split(' ');
        console.log(`date: ${date}`);
        this.location.insertAdjacentHTML('beforeend', template({
            films,
            dateDay: date[0],
            dateMonth: date[1][0].toUpperCase() + date[1].slice(1),
        }));
        // this.componentDidMount();
    }

    // remove() { //*
    // }

    componentDidMount() {
        console.log(`mounted ${JSON.stringify(this.filmsData)}`);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    unsubscribe() {
        this.componentWillUnmount();
    }
}
