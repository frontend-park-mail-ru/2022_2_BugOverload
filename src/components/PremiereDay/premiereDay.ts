import { Component } from '@components/Component';
import { PremiereFilm } from '@components/PremiereFilm/premiereFilm';
import { decoreDate, decoreDaysLeft, } from '@utils/decorationData';

import { PremiereDayUI } from 'moviegate-ui-kit';

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
    }

    render() {
        const films = this.filmsData
            .reduce((res: string, filmData: filmPremiere) => res + PremiereFilm.createFilmPremiere(filmData, 'addDatePrComp'), '');
        const date: Array<string> = decoreDate(this.filmsData[0].prod_date).split(' ');
        this.location.insertAdjacentHTML('beforeend', PremiereDayUI.renderTemplate({
            films,
            dateDay: date[0],
            dateMonth: date[1][0].toUpperCase() + date[1].slice(1),
            daysLeft: decoreDaysLeft(this.filmsData[0].prod_date),
        }));
    }
}
