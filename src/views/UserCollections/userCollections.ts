import { ROOT } from '@config/config';
import { store } from '@store/Store';
import { router } from '@router/Router';
import { actionGetUserCollections } from '@actions/userActions';
import { View } from '@views/View';
import template from '@views/UserCollections/userCollections.handlebars';
import { UserCollList } from '@components/UserCollList/userCollList';
import { responsStatuses } from '@config/config';
import { ShowMessage } from '@components/Message/message';

import { ProfileMenuUI } from 'moviegate-ui-kit';

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
        const userCollectionsBody: Element = document.querySelector('.js-user-collections');
        if (userCollectionsBody) {
            userCollectionsBody.remove();
        }
        super.render();

        this.subHandler = () => {
            this.state.userCollections = store.getState('userCollections');

            this.render();
        }

        if (!this.state.isSubscribed) {
            store.subscribe('userCollections', this.subHandler);
            this.state.isSubscribed = true;
        }

        if (!this.state.userCollections && this.state.isSubscribed) {
            store.dispatch(actionGetUserCollections({
                sort_param: 'create_time',
                count_collections: 15,
                delimiter: 'now',
            }));
            return;
        }

        ROOT.insertAdjacentHTML('beforeend', template({
            profileMenu: ProfileMenuUI.renderTemplate(),
        }));

        this.rootNode?.querySelectorAll('.js-profile__menu__links')?.forEach((elem: HTMLElement) => {
            if (elem.dataset.activeLink === 'true') {
                elem.dataset.activeLink = 'false';
            }

            if (elem.classList.contains('js-profile__menu-item-collections')) {
                elem.dataset.activeLink = 'true';
            }
        });

        this.userCollList = new UserCollList({
            nameLocation: 'js-user-collections__content-container',
            rootNode: ROOT,
            data: this.state.userCollections,
        });
        this.userCollList.render();
    }

    componentWillUnmount() {
        store.unsubscribe('userCollections', this.subHandler);
        this.state.isSubscribed = false;
        this.state.userCollections = null;
    }
}

export const userCollections = new UserCollections({ rootNode: document.getElementById('root') });
