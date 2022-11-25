import { View } from '@views/View';
import { Film } from '@components/Film/film.js';
import template from '@views/CollectionPage/collectionPage.handlebars';
import { actionGetCollectionData } from '@actions/commonActions';
import { store } from '@store/Store';
import { actionGetActor } from '@store/actionCreater/actorActions';

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
            isSubscribedCollection: false,
            isSubscribedPerson: false,
            typeCollection: null,
        }

        this.collectionPageSubscribe = this.collectionPageSubscribe.bind(this);
    }


    render(typeCollection :string = null) {
        if(typeCollection) {
            this.state.typeCollection = typeCollection;
        }
        if(!this.state.typeCollection) {
            return;
        }


        const pageCollection = this.rootNode.querySelector('.page__collection');
        if(pageCollection) {
            pageCollection.remove();
        }
        super.render();

        if(!this.state.typeCollection.match(/\d+/)) {
            this.state.nameObjectStore = `collection-${this.state.typeCollection}`;
            this.state.collection = store.getState(this.state.nameObjectStore);

            const params = this.state.typeCollection.split('-');
            if(!this.state.collection && !this.state.isDispatched) {
                this.state.isDispatched = true;

                if(!this.state.isSubscribedCollection) {
                    this.state.isSubscribedCollection = true;
                    store.subscribe(this.state.nameObjectStore, this.collectionPageSubscribe);
                }

                store.dispatch(actionGetCollectionData({
                    name: this.state.nameObjectStore,
                    target: params[params.length - 2],
                    key: params[params.length - 1],
                    sortParam: 'rating',
                    countFilms: 20,
                    delimiter: 20,
                }));
                return;
            }
        } else {
            this.state.nameObjectStore = this.state.typeCollection;
            this.state.collection = {
                name: 'Лучшие фильмы',
                films: store.getState(this.state.nameObjectStore)?.best_films,
            };

            if(!this.state.collection.films && !this.state.isDispatched) {
                this.state.isDispatched = true;

                if(!this.state.isSubscribedPerson) {
                    this.state.isSubscribedPerson = true;
                    store.subscribe(this.state.nameObjectStore, this.collectionPageSubscribe);
                }

                store.dispatch(actionGetActor(this.state.nameObjectStore.match(/\d+/)[0]));
                return;
            }
        }

        const films = this.state.collection.films.reduce((res: string, filmData: film) => res + Film.createFilm(filmData), '');
        this.rootNode.insertAdjacentHTML('beforeend', template({
            name: this.state.collection.name,
            description: this.state.collection.description,
            films,
        }));
    }

    collectionPageSubscribe() {
        this.render();
    }

    componentWillUnmount() {
        if(this.state.isSubscribedCollection) {
            this.state.isSubscribedCollection = false;
            store.unsubscribe(this.state.nameObjectStore, this.collectionPageSubscribe);
        }
        if(this.state.isSubscribedPerson) {
            this.state.isSubscribedPerson = false;
            store.unsubscribe(this.state.nameObjectStore, this.collectionPageSubscribe);
        }

        this.state.isDispatched = false;
    }
}

export const collectionPage = new CollectionPage({ rootNode: document.getElementById('root') });
