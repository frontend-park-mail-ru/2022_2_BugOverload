import { View } from '@views/View.js';
import { Collection } from '@components/Collection/collection.js';
import { Film } from '@components/Film/film.js';
import template from '@views/ActorProfilePage/actorProfilePage.handlebars';
import templateProfile from '@components/ActorProfile/actorProfile.handlebars';
import templateCollection from '@components/Collection/collection.handlebars';
import { store } from '@store/Store.js';
import { actionGetActor } from '@store/actionCreater/actorActions.js';

/**
 * Отрисовывает страницу актера, добавляя HTML-шаблон в root в index.html
 *
 */
class ActorPage extends View {
    /**
     * Cохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props) {
        super(props);
        this.state = {
            actor: null,
            id: null,
            isSubscribed: false,
        };
    }

    /**
     * Рендерит страницу актёра
     */
    render(id = null) {
        if (id) {
            this.state.id = id;
        }
        if (!this.state.id) {
            return;
        }

        if (!this.state.actor) {
            if (!this.state.isSubscribed) {
                store.subscribe(`actor${this.state.id}`, subscribeActorPage);
                this.state.isSubscribed = true;
                store.dispatch(actionGetActor(this.state.id));
            }
            return;
        }

        if (this.state.isSubscribed) {
            store.unsubscribe(`actor${this.state.id}`, subscribeActorPage);
            this.state.isSubscribed = false;
        }

        super.render();

        const films = this.state.actor.best_films.reduce((res, filmData) => res + Film.createFilm(filmData), '');
        const collection = new Collection();

        this.rootNode.insertAdjacentHTML('beforeend', template({
            actorProfile: templateProfile({
                ...this.state.actor,
                birthday: this.state.actor?.birthday.split(' ')[0].split('.').reverse().join('.'),
            }),
            collectionBestFilms: templateCollection({
                films,
                title: 'Лучшие фильмы',
            }),
        }));
        collection.addHandlerSlider(
            this.rootNode.querySelector('.js-collection__container'),
        );
    }

    componentWillUnmount() {
        this.state.id = null;
        this.state.actor = null;
    }
}

export const actorPage = new ActorPage({ rootNode: document.getElementById('root') });

/**
* Функция, вызываемая при изменении актёра в store
*/
const subscribeActorPage = () => {
    actorPage.state.actor = store.getState(`actor${actorPage.state.id}`);
    actorPage.render();
};
