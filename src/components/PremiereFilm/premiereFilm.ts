import template from '@components/PremiereFilm/premiereFilm.handlebars';
import { Component } from '@components/Component';
import { API } from '@config/config';
import {
    decoreListItems, restrictText, decoreDuration,
} from '@utils/decorationData';

const maxLengthDescription = 170;
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
            year_prod: filmData.prod_date.split('.')[0],
            genres: decoreListItems(filmData.genres, 2),
            directors: `реж. ${filmData.directors[0]}`,
            description: restrictText(filmData.description, maxLengthDescription),
            duration: decoreDuration(filmData.duration),
            countries: decoreListItems(filmData.country_prod, 2),
        });

        const div = document.createElement('div');
        div.insertAdjacentHTML('afterbegin', film);
        console.log(`innerHTML ${div.innerHTML}`);
        return div.innerHTML;
    }
}
