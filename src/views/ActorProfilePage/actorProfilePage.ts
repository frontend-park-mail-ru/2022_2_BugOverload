import { View } from '@views/View';
import { Collection } from '@components/Collection/collection';
import { Film } from '@components/Film/film';
import template from '@views/ActorProfilePage/actorProfilePage.handlebars';
import { store } from '@store/Store';
import { actionGetActor } from '@store/actionCreater/actorActions';

import { CollectionUI, ActorProfileUI } from 'moviegate-ui-kit';

/**
 * Отрисовывает страницу актера, добавляя HTML-шаблон в root в index.html
 *
 */
class ActorPage extends View {
    /**
     * Cохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props: componentProps) {
        super(props);
        this.state = {
            actor: null,
            id: null, 
        };
    }

    /**
     * Рендерит страницу актёра
     */
    render(id: number|null = null) {
        if (id) {
            this.state.id = id;
        }
        if (!this.state.id) {
            return;
        }

        if (!this.state.actor) {
            store.subscribe(`actor${this.state.id}`, subscribeActorPage, true);
            store.dispatch(actionGetActor(this.state.id));
            return;
        }

        super.render();
        const actorPageElement = this.rootNode.querySelector('.actor-page');
        if (actorPageElement) {
            actorPageElement.remove();
        }

        const films = this.state.actor.best_films.reduce((res: string, filmData: film) => res + Film.createFilm(filmData), '');
        const collection = new Collection('');

        this.rootNode.insertAdjacentHTML('beforeend', template({
            actorProfile: ActorProfileUI.renderTemplate({
                ...this.state.actor,
                birthday: this.state.actor?.birthday?.split(' ')[0].split('.').reverse().join('.'),
            }),
            collectionBestFilms: CollectionUI.renderTemplate({
                films,
                name: 'Лучшие фильмы',
                url: `actor${this.state.id}`,
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
