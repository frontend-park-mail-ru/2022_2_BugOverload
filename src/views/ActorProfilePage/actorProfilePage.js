import { View } from '@views/View.js';
import { Collection } from '@components/Collection/collection.js';
import template from '@views/ActorProfilePage/actorProfilePage.handlebars';
import templateProfile from '@components/ActorProfile/actorProfile.handlebars';
import { store } from '@store/Store.js';
import { actionGetActor } from '@store/actionCreater/actorActions.js';

/**
 * Отрисовывает страницу актера, добавляя HTML-шаблон в root в index.html
 *
 */
class ActorPage extends View {
    constructor(props) {
        super(props);
        this.state = {
            actor: null,
            id: null,
            isSubscribed: false,
        };
    }

    render(id = null) {
        if (id) {
            this.id = id;
        }
        if (!this.id) {
            return;
        }

        if (!this.actor) {
            store.subscribe(`actor${this.id}`, subscribeActorPage);
            this.isSubscribed = true;
            store.dispatch(actionGetActor(this.id));
            return;
        }

        if (this.isSubscribed) {
            store.unsubscribe(`actor${this.id}`, subscribeActorPage);
            this.isSubscribed = false;
        }

        super.render();
        const collectionBestFilms = new Collection(COLLECTION_TYPE.popular);

        const bestActorFilms = {
            films: this.actor.best_films,
            title: 'Лучшие фильмы',
        };

        this.rootNode.insertAdjacentHTML('beforeend', template({
            actorProfile: templateProfile(this.actor),
            collectionBestFilms: collectionBestFilms.getTemplate(bestActorFilms),
        }));
        Collection.addHandlers();
    }
}

export const actorPage = new ActorPage({ rootNode: document.getElementById('root') });

const subscribeActorPage = () => {
    actorPage.actor = store.getState(`actor${actorPage.id}`);
    actorPage.render();
};
