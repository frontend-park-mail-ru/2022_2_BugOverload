import template from '@components/PreviewUserCollection/previewUserCollection.handlebars';
import { Component } from '@components/Component';
import { API } from '@config/config';
import {
    decoreDate,
} from '@utils/decorationData';
/**
* Рейтинг фильма.
* Отрисовывает рейтинг и форму для отправки удаления оценки.
* Подписывается на измненение state rating
*/
export class PreviewUserCollection extends Component {
    static createUserCollection(collectionData: userCollection, mode = '') {

        const collection = template({
            ...collectionData,
            poster: API.img.collection_poster(collectionData.poster),
            create_time: decoreDate(collectionData.create_time),
            // year_prod: collectionData.prod_date.split('.')[0],
            // genres: collectionData.genres.slice(0, 2).join(', '),
            // director: `реж. ${collectionData.directors[0].name}`,
            // countries: collectionData.prod_countries.slice(0, 2).join(', '),
        });

        const div = document.createElement('div');
        div.insertAdjacentHTML('afterbegin', collection);

        return div.innerHTML;
        // return collection;
    }
}
