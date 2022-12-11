import { Component } from '@components/Component';
import { PreviewUserCollection } from '@components/PreviewUserCollection/previewUserCollection';

import { UserCollListUI } from 'moviegate-ui-kit';

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

        const t = UserCollListUI.renderTemplate({
            collections: collections,
        });

        this.location.insertAdjacentHTML('beforeend', t);
    }
}
