import { ROOT } from '@config/config';
import { PremiereList } from '@components/PremiereList/premiereList';
import { store } from '@store/Store';
import { actionGetPremieresData } from '@actions/filmActions';
import template from '@views/PremierePage/premierePage.handlebars';
import { View } from '@views/View';

/**
* Отрисовывает фильма страницу, добавляя HTML-шаблон в root в index.html
*
*/
export class PremierePage extends View {
    constructor(props: componentProps) {
        super(props);
        this.state = {
            premieres: null,
            isSubscribed: false,
        };
    }

    /**
    * Отрисовывает *** страницу, добавляя HTML-шаблон в root в index.html
    * Подписывается на изменение состояния state film<id>
    * Используется при первом заходе на страницу
    */
    render() {
        const premierePageElement = this.rootNode.querySelector('.js-premiere-page');
        if (premierePageElement) {
            premierePageElement.remove();
        }

        super.render();
        this.subHandler = () => {
            this.state.premieres = store.getState('premieres');
            this.render();
        }

        if (!this.state.isSubscribed) {
            store.subscribe('premieres', this.subHandler);
            this.state.isSubscribed = true;
        }

        if (!this.state.premieres) {
            store.dispatch(actionGetPremieresData());
            return;
        }

        ROOT.insertAdjacentHTML('beforeend', template());
        const premiereList = new PremiereList({
            nameLocation: 'js-premiere-content',
            rootNode: this.rootNode,
            films: this.state.premieres.films,
        });

        premiereList.render();
    }

    /**
     * Используется для обнуления состояния *** для перехода к новому фильму
     */
    componentWillUnmount() {
        store.unsubscribe('premieres', this.subHandler);
        this.state.isSubscribed = false;
    }
}

export const premierePage = new PremierePage({ rootNode: document.getElementById('root') });
