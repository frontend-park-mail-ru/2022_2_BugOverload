import { View } from '@views/View';
import { Film } from '@components/Film/film.js';
import template from '@views/CollectionPage/collectionPage.handlebars';
import { actionGetCollectionData } from '@actions/commonComponentsActions';
import { store } from '@store/Store';

/**
* Отрисовывает главную страницу, добавляя HTML-шаблон в root в index.html
*
*/
class CollectionPage extends View {
    constructor(props :componentProps) {
        super(props);

        this.state = {
            nameObjectStore: null,
            collection: null,
            isDispatched: false,
            isSubscribed: false,
        }
    }


    render(path :string) {
        const pageCollection = this.rootNode.querySelector('.page__collection');
        if(pageCollection) {
            pageCollection.remove();
        }
        super.render();

        if(!path.match(/d+/)) {
            this.state.nameObjectStore = `collection-${path}`;
        } else {
            this.state.nameObjectStore = path;
        }

        console.log('path', this.state.nameObjectStore, store.getState(this.state.nameObjectStore));

        this.state.collection = store.getState(this.state.nameObjectStore);

        const params = path.split('-');
        if(!this.state.collection && !this.state.isDispatched) {
            store.dispatch(actionGetCollectionData({ 
                name: this.state.nameObjectStore,
                target: params[params.length - 2],
                key: params[params.length - 1],
                sortParam: 'rating',
                countFilms: 20,
                delimiter: 20,
            }))
        }


        const films = this.state.collection.films.reduce((res: string, filmData: film) => res + Film.createFilm(filmData), '');
        this.rootNode.insertAdjacentHTML('beforeend', template({
            name: this.state.collection.name,
            description: this.state.collection.description,
            films,
        }));
    }

    componentWillUnmount() {

    }
}

export const collectionPage = new CollectionPage({ rootNode: document.getElementById('root') });
