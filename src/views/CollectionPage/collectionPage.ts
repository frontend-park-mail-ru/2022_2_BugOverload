import { View } from '@views/View';
import { Film } from '@components/Film/film';
import template from '@views/CollectionPage/collectionPage.handlebars';
import { actionGetCollectionData, actionGetUserCollectionData } from '@actions/commonActions';
import { store } from '@store/Store';
import { actionGetActor } from '@store/actionCreater/actorActions';
import { actionRemoveFromCollection, actionGetSimilarFilms } from '@store/actionCreater/filmActions';
import { ShowMessage } from '@/components/Message/message';
import { isMobile } from '@/config/config';
import { API } from '@config/config';

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
            isSubscribedLogout: false,
            private_col: false,
        }

        this.collectionPageSubscribe = this.collectionPageSubscribe.bind(this);
        this.userCollectionPageSubscribe = this.userCollectionPageSubscribe.bind(this);
        this.collectionPageSubscribeLogout = this.collectionPageSubscribeLogout.bind(this);
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
                if(!this.state.isSubscribedLogout) {
                    this.state.isSubscribedLogout = true;
                    store.subscribe('logoutStatus', this.collectionPageSubscribeLogout);
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
            films = this.state.collection.films.reduce((res: string, filmData: film) => res + Film.createFilm(filmData, this.state.isUserCollection, this.state.collection?.is_author), '');
        }

        const name = this.state.collection.name;
        this.state.collection.private_col = (name === 'Избранное' || name === 'Буду смотреть')?true:false;
        const author = this.state.collection?.author;
        let user;
        if (author) {
            user = store.getState('user');
            author.avatar = API.img.user_avatar(author.avatar);
        }
        this.rootNode.insertAdjacentHTML('beforeend', template({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            description: this.state.collection.description,
            films,
            private_col: this.state.collection.private_col,
            isMobile,
            author: user? null: author,
        }));

        this.copyHandler = (() => {
            let counterCopyed = 0;
            return () => {
                navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    if (counterCopyed === 0) {
                        ShowMessage('Скопировано!', 'positive');
                        ++counterCopyed;
                        return;
                    }
                    if (counterCopyed === 1) {
                        ShowMessage('Двойное копирование!', 'positive');
                        ++counterCopyed;
                        return;
                    }
                    if (counterCopyed === 2) {
                        ShowMessage('Тройное копирование!', 'positive');
                        ++counterCopyed;
                        return;
                    }
                    if (counterCopyed === 3) {
                        ShowMessage('Безумие!', 'positive');
                        ++counterCopyed;
                        return;
                    }
                    if (counterCopyed === 4) {
                        ShowMessage('Ты потрясающий!', 'positive');
                        ++counterCopyed;
                        return;
                    }
                    ShowMessage('Скопировано!', 'positive');
                    counterCopyed = 1;
                })
                .catch(err => {
                    ShowMessage('Не удалось скопировать');
                    console.log('Something went wrong', err);
                });
            }
        })();
        const shareButton = this.rootNode.querySelector('.js-page__collection__share');
        if (shareButton) {
            shareButton.addEventListener('click', this.copyHandler);
        }

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

    collectionPageSubscribeLogout() {
        console.log('logout', this.state.collection)
        if(!this.state.collection.private_col) {
            this.state.collection = null;
            this.render();
        }
    }

    userCollectionPageSubscribe() {
        this.state.collection = store.getState(`collection-${this.state.typeCollection}`);
        this.render();
    }

    componentWillUnmount() {
        this.state.collection = null;
        this.state.isUserCollection = false;
        this.state.isDispatched = false;

        const shareButton = this.rootNode.querySelector('.js-page__collection__share');
        if (shareButton) {
            shareButton.removeEventListener('click', this.copyHandler);
        }

        if(this.state.isSubscribedUserCollection) {
            this.state.isSubscribedUserCollection = false;
            store.unsubscribe(`collection-${this.state.typeCollection}`, this.userCollectionPageSubscribe);
        }

        if(this.state.isSubscribedRemoveCollection) {
            this.state.isSubscribedRemoveCollection = false;
            store.unsubscribe('removeFromCollStatus', this.collectionPageSubscribe);
        }

        if(this.state.isSubscribedLogout) {
            this.state.isSubscribedLogout = false;
            store.unsubscribe('logoutStatus', this.collectionPageSubscribeLogout);
        }
    }
}

export const collectionPage = new CollectionPage({ rootNode: document.getElementById('root') });
