import { View } from '@views/View';
import template from '@views/CollectionPage/collectionPage.handlebars';
import { store } from '@store/Store';

/**
* Отрисовывает главную страницу, добавляя HTML-шаблон в root в index.html
*
*/
class CollectionPage extends View {
    render(path :string) {
        const pageCollection = this.rootNode.querySelector('.page__collection');
        if(pageCollection) {
            pageCollection.remove();
        }

        console.log(store.getState(`collection-${path}`));

        super.render();
        this.rootNode.insertAdjacentHTML('beforeend', template());
    }

    componentWillUnmount() {

    }
}

export const collectionPage = new CollectionPage({ rootNode: document.getElementById('root') });
