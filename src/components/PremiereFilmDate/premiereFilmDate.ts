import template from '@components/PremiereFilmDate/premiereFilmDate.handlebars';
import { Component } from '@components/Component';
import { API } from '@config/config';
import {
    restrictText, decoreDuration, decoreColorRating,
} from '@utils/decorationData';

const maxLengthDescription = 200;
/**
* Рейтинг фильма.
* Отрисовывает рейтинг и форму для отправки удаления оценки.
* Подписывается на измненение state rating
*/
export class PremiereFilmDate extends Component {
    static addPremiereDate(filmData: filmPremiere, location: HTMLElement) {
        if (!location || !filmData) {
            return;
        }

        const film = template({
            ...filmData,
            ticket_link: filmData.id,
            description: restrictText(filmData.description, maxLengthDescription),
        });

        location.insertAdjacentHTML('afterbegin', film);
    }
}

