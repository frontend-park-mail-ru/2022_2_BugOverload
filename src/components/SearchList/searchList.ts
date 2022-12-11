import { Component } from '@components/Component';

import { SearchListUI } from 'moviegate-ui-kit';

/**
* Рейтинг фильма.
* Отрисовывает рейтинг и форму для отправки удаления оценки.
* Подписывается на измненение state rating
*/
export class SearchList extends Component {
    constructor(props: componentProps) {
        super(props);
        this.nameLocation = props.nameLocation;
        this.itemsCreator = props.itemCreator;
        this.itemsData = props.data;
        this.nameList = props.name;

        this.location = this.rootNode.querySelector(`.${props.nameLocation}`);
    }

    render() {
        const items = this.itemsData.reduce((res: string, itemData: person|filmPremiere) => res + this.itemsCreator(itemData), '');

        this.location.insertAdjacentHTML('beforeend', SearchListUI.renderTemplate({ name: this.nameList , items }));
    }
}
