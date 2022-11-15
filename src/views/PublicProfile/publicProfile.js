import { View } from '@views/View.js';
import templateProfile from '@views/UserProfile/userProfile.handlebars';
import { store } from '@store/Store.js';
import { actionGetPublicProfile } from '@store/actionCreater/userActions.js';

/**
* Публичная страница профиля
*/
class PublicProfile extends View {
    /**
     * Привязывает функцию subscribePublicProfile к текущему this
     * @param {Object} - сохраняемые начальные параметры
     */
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            id: null,
            isSubscribed: false,
        };

        this.subscribePublicProfile = this.subscribePublicProfile.bind(this);
    }

    /**
     * Посылает запрос в Store, если нет информауии о пользователе, и рендерит страницу
     */
    render(id) {
        if (id) {
            this.state.id = id;
        }
        if (!this.state.id) {
            return;
        }

        if (!this.state.user) {
            if (!this.state.isSubscribed) {
                store.subscribe(`user${this.state.id}`, this.subscribePublicProfile);
                this.state.isSubscribed = true;
                store.dispatch(actionGetPublicProfile(this.state.id));
            }
            return;
        }

        super.render();
        this.rootNode.insertAdjacentHTML('beforeend', templateProfile(
            {
                public: true,
                ...this.state.user,
            },
        ));
    }

    /**
     * Вызывается при получение пользовательских данных
     */
    subscribePublicProfile() {
        this.state.user = store.getState(`user${this.state.id}`);
        this.render();
    }

    /**
     * Вызывается при переходе на другие страницы
     */
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            store.unsubscribe(`user${this.state.id}`, this.subscribePublicProfile);
            this.state.isSubscribed = false;
        }
        this.state.id = null;
        this.state.user = null;
    }
}

export const publicProfile = new PublicProfile({ rootNode: document.getElementById('root') });
