import { ROOT } from '@config/config';
import { store } from '@store/Store';
import { router } from '@router/Router';
import { actionGetUserCollections } from '@actions/userActions';
import { View } from '@views/View';
import template from '@views/UserCollections/userCollections.handlebars';
import templateProfileMenu from '@components/ProfileMenu/profileMenu.handlebars';
import { UserCollList } from '@components/UserCollList/userCollList';

/**
* Отрисовывает главную страницу, добавляя HTML-шаблон в root в index.html
*
*/
class UserCollections extends View {
    constructor(props: componentProps) {
        super(props);
        this.state = {
            userCollections: null,
            isSubscribed: false,
        };
    }

    render() {
        console.log(`this.state ${JSON.stringify(this.state.userCollections)}`);
        const userCollectionsBody: Element = document.querySelector('.js-user-collections');
        if (userCollectionsBody) {
            userCollectionsBody.remove();
        }
        super.render();

        this.subHandler = () => {
            this.state.userCollections = store.getState('userCollections');
            console.log(`this.render()`);
            this.render();
        }

        if (!this.state.isSubscribed) {
            store.subscribe('userCollections', this.subHandler);
            console.log(`this.subscribe()`);
            this.state.isSubscribed = true;
        }

        if (!this.state.userCollections && this.state.isSubscribed) {
            store.dispatch(actionGetUserCollections({
                sort_param: 'create_time',
                count_collections: 15,
                delimiter: 'now',
            }));
            console.log(`this.dispatched`);
            return;
        }

        ROOT.insertAdjacentHTML('beforeend', template({
            profileMenu: templateProfileMenu(),
        }));

        // if ('error' in this.state.userCollections) {
        //     ROOT.querySelector('.js-search-page__content-container')?.insertAdjacentHTML('beforeend', `
        //     <div class="search-page__no-content">
        //         По вашему запросу ничего не нашлось :(
        //         <div data-section="/" class="search-page__no-content-btn secondary-btn-med">Перейти на главную</div>
        //     </div>`);
        // }

        this.userCollList = new UserCollList({
            nameLocation: 'js-user-collections__content-container',
            rootNode: ROOT,
            data: this.state.userCollections,
        });
        this.userCollList.render();
    }

    componentWillUnmount() {
        store.unsubscribe('userCollections', this.subHandler);
        console.log(`unsubscribe()`);
        this.state.isSubscribed = false;
        this.state.userCollections = null;
    }
}

export const userCollections = new UserCollections({ rootNode: document.getElementById('root') });
