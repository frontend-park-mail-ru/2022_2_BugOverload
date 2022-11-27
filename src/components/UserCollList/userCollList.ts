import template from '@components/UserCollList/userCollList.handlebars';
import { Component } from '@components/Component';
import { PreviewUserCollection } from '@components/PreviewUserCollection/previewUserCollection';

/**
* Список премьер.
* Отрисовывает блоки фильмов, сгруппированных по дням.
* Делегирует создание блока компоненту PremiereFilm.
*/
export class UserCollList extends Component {
    constructor(props: componentProps) {
        super(props);
        this.nameLocation = props.nameLocation;
        this.location = document.querySelector(`.${this.nameLocation}`);

        this.collectionsData = props.data;
    }

    render() {
        if (!this.collectionsData || !this.location) {
            return;
        }

        const collections = this.collectionsData
            .reduce((res: string, collData: userCollection) => res + PreviewUserCollection.createUserCollection(collData), '');
        // const date: Array<string> = decoreDate(this.filmsData[0].prod_date).split(' ');

        const t = template({
            collections: collections,
            // dateDay: date[0],
            // dateMonth: date[1][0].toUpperCase() + date[1].slice(1),
            // daysLeft: decoreDaysLeft(this.filmsData[0].prod_date),
        });

        this.location.insertAdjacentHTML('beforeend', t);
    }
}
