import template from '@components/PremiereFilm/premiereFilm.handlebars';
import { Component } from '@components/Component';
import { API } from '@config/config';

import {
    decoreCountScores,
} from '@utils/decorationData';

/**
* Рейтинг фильма.
* Отрисовывает рейтинг и форму для отправки удаления оценки.
* Подписывается на измненение state rating
*/
export class PremiereFilm extends Component {
    static createFilmPremiere(filmData: filmPremiere) {

        const film = template({
            ...filmData,
            poster_ver: API.img.poster_ver(filmData.poster_ver),
        });

        const div = document.createElement('div');
        div.insertAdjacentHTML('afterbegin', film);
        console.log(`innerHTML ${div.innerHTML}`);
        return div.innerHTML;
    }
}
