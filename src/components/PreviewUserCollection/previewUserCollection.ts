import { Component } from '@components/Component';
import { API } from '@config/config';
import {
    decoreDate,
} from '@utils/decorationData';

import { PreviewUserCollectionUI } from 'moviegate-ui-kit';
/**
* Рейтинг фильма.
* Отрисовывает рейтинг и форму для отправки удаления оценки.
* Подписывается на измненение state rating
*/
export class PreviewUserCollection extends Component {
    static createUserCollection(collectionData: userCollection, mode = '') {

        const collection = PreviewUserCollectionUI.renderTemplate({
            ...collectionData,
            poster: API.img.collection_poster(collectionData.poster),
            create_time: decoreDate(collectionData.create_time),
            count_films: collectionData.count_films || '0',
        });

        return collection;
    }
}
