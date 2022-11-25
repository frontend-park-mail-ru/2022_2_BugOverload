import template from '@components/PersonMed/personMed.handlebars';
import { Component } from '@components/Component';
import { API } from '@config/config';
import {
    decoreDuration, decoreAge, decoreCountFilms,
} from '@utils/decorationData';
import { getAge } from '@utils/common';

/**
* Рейтинг фильма.
* Отрисовывает рейтинг и форму для отправки удаления оценки.
* Подписывается на измненение state rating
*/
export class PersonMed extends Component {
    static createPersonMed(personData: filmPremiere, mode = '') {

        const person = template({
            ...personData,
            avatar: API.img.person_avatar(personData.avatar),
            year: personData.birthday.split('.')[0],
            professions: personData.professions.slice(0, 4).join(', '),
            age: decoreAge(getAge(personData.birthday)),
            count_films: decoreCountFilms(personData.count_films),
        });

        const div = document.createElement('div');
        div.insertAdjacentHTML('afterbegin', person);

        return div.innerHTML;
    }
}
