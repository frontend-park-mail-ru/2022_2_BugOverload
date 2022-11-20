import template from '@components/PremiereDay/premiereDay.handlebars';
import { Component } from '@components/Component';
import { PremiereFilm } from '@components/PremiereFilm/premiereFilm';

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
        this.location.insertAdjacentHTML('beforeend', template({films}));
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
