import { View } from '@views/View';
import { Film } from '@components/Film/film';
import template from '@views/CollectionPage/collectionPage.handlebars';
import { actionGetCollectionData, actionGetUserCollectionData } from '@actions/commonActions';
import { store } from '@store/Store';
import { actionGetActor } from '@store/actionCreater/actorActions';
import { actionRemoveFromCollection, actionGetSimilarFilms } from '@store/actionCreater/filmActions';

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
            typeCollection: null,
            isUserCollection: false,
            isDispatched: false,
            isSubscribedUserCollection: false,
            isSubscribedRemoveCollection: false,
        }

        this.collectionPageSubscribe = this.collectionPageSubscribe.bind(this);
        this.userCollectionPageSubscribe = this.userCollectionPageSubscribe.bind(this);
    }

    render(typeCollection :string|number = null) {
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

        if(!this.state.typeCollection.match(/\w+\d+/)) {
            //tag genre
            this.state.nameObjectStore = `collection-${this.state.typeCollection}`;
            this.state.collection = store.getState(this.state.nameObjectStore);

            const params = this.state.typeCollection.split('-');
            if(!this.state.collection) {
                store.subscribe(this.state.nameObjectStore, this.collectionPageSubscribe, true);

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
            //actor || film
            if(this.state.typeCollection.match(/[a-z]+[0-9]+/)) {
                console.log('actor,film')
                let actionCreator;

                if(this.state.typeCollection.match('film')) {
                    actionCreator = actionGetSimilarFilms;
                    this.state.nameObjectStore = this.state.typeCollection + 'Similar';

                        this.state.collection = {
                            name: store.getState(this.state.nameObjectStore)?.name,
                            films: store.getState(this.state.nameObjectStore)?.films,
                        };
                    
                }

                if(this.state.typeCollection.match('actor')) {
                    actionCreator = actionGetActor;
                    this.state.collection = {
                        name: 'Лучшие фильмы',
                        films: store.getState(this.state.nameObjectStore)?.best_films,
                    };
                    this.state.nameObjectStore = this.state.typeCollection;
                }

                if(!this.state.collection.films) {
                    store.subscribe(this.state.nameObjectStore, this.collectionPageSubscribe, true);

                    store.dispatch(actionCreator(this.state.nameObjectStore.match(/\d+/)[0]));
                    return;
                }
            } else {
                if(!this.state.isSubscribedRemoveCollection) {
                    this.state.isSubscribedRemoveCollection = true;
                    store.subscribe('removeFromCollStatus', this.collectionPageSubscribe);
                }
                //user
                this.state.isUserCollection = true;

                if(!this.state.collection && !this.state.isDispatched) {
                    this.state.isDispatched = true;

                    if(!this.state.isSubscribedUserCollection) {
                        this.state.isSubscribedUserCollection = true;
                        store.subscribe(`collection-${this.state.typeCollection}`, this.userCollectionPageSubscribe);
                    }

                    store.dispatch(actionGetUserCollectionData({
                        id: this.state.typeCollection,
                    }));
                    return;
                }
            }
        }

        let films = null;
        if(this.state.collection && Object.hasOwnProperty.call(this.state.collection, 'films')) {
            films = this.state.collection.films.reduce((res: string, filmData: film) => res + Film.createFilm(filmData, this.state.isUserCollection), '');
        }

        const name = this.state.collection.name;
        this.rootNode.insertAdjacentHTML('beforeend', template({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            description: this.state.collection.description,
            films,
        }));
        if(this.state.isUserCollection) {
            const pageUserCollection = this.rootNode.querySelector('.page__collection');
            pageUserCollection.addEventListener('click', (e) => {
                if( (e.target as SVGElement).dataset.idfilm) {
                    const idFilm = (e.target as SVGElement).dataset.idfilm;
                    if (this.state.collection.films.length === 1) {
                        delete this.state.collection.films;
                    } else {
                        this.state.collection = null;
                        this.state.isDispatched = false;
                    }

                    store.dispatch(actionRemoveFromCollection({
                        idFilm,
                        idCollection: this.state.typeCollection,
                    }))
                }
            })
        }
    }

    collectionPageSubscribe() {
        this.render();
    }

    userCollectionPageSubscribe() {
        this.state.collection = store.getState(`collection-${this.state.typeCollection}`);
        this.render();
    }

    componentWillUnmount() {
        this.state.collection = null;
        this.state.isUserCollection = false;
        this.state.isDispatched = false;

        if(this.state.isSubscribedUserCollection) {
            this.state.isSubscribedUserCollection = false;
            store.unsubscribe(`collection-${this.state.typeCollection}`, this.userCollectionPageSubscribe);
        }

        if(this.state.isSubscribedRemoveCollection) {
            this.state.isSubscribedRemoveCollection = false;
            store.unsubscribe('removeFromCollStatus', this.collectionPageSubscribe);
        }
    }
}

export const collectionPage = new CollectionPage({ rootNode: document.getElementById('root') });
