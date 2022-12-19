import { View } from '@views/View';
import templateProfile from '@views/UserProfile/userProfile.handlebars';
import { store } from '@store/Store';
import { actionGetPublicProfile } from '@store/actionCreater/userActions';

interface PublicProfile {
    state: {
        user: user,
        id: number,
    }
}
/**
* Публичная страница профиля
*/
class PublicProfile extends View {
    /**
     * Привязывает функцию subscribePublicProfile к текущему this
     * @param {Object} - сохраняемые начальные параметры
     */
    constructor(props :componentProps) {
        super(props);
        this.state = {
            user: null,
            id: null,
        };

        this.subscribePublicProfile = this.subscribePublicProfile.bind(this);
    }

    /**
     * Посылает запрос в Store, если нет информауии о пользователе, и рендерит страницу
     */
    render(id = null as number) {
        if (id) {
            this.state.id = id;
        }
        if (!this.state.id) {
            return;
        }

        super.render();

        if (!this.state.user) {
            store.subscribe(`user${this.state.id}`, this.subscribePublicProfile, true);
            store.dispatch(actionGetPublicProfile(this.state.id));
            return;
        }

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
        this.state.id = null;
        this.state.user = null;
    }
}

export const publicProfile = new PublicProfile({ rootNode: document.getElementById('root') });
