import { Userbar } from '@components/Userbar/userbar.js';
import template from '@components/Header/header.handlebars';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { actionAuth } from '@store/actionCreater/userActions.js';

/**
* Отрисовывает хедер.
* Обращается к бэкенду для авторизации пользователя или проверки его авторизации.
* Добавляет обработчики событий.
*
*/
export class Header extends Component {
    /**
     * Cохраняет rootNode.
     * @param {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
        const headerSubscribe = () => {
            this.state.user = store.getState('user');
            this.render();
            store.unsubscribe('user', headerSubscribe);
        };
        store.subscribe('user', headerSubscribe);
    }

    /**
     * Рендерит стандартный хэдер без пользовательских данных
     */
    render() {
        const header = this.rootNode.querySelector('.header');
        if (header) {
            header.remove();
        }

        this.rootNode.insertAdjacentHTML('afterbegin', template(this.state.user));

        if (this.state.user) {
            const userbar = new Userbar({ rootNode: this.rootNode });
            userbar.componentDidMount(this.state.user);
        } else {
            store.dispatch(actionAuth());
        }
    }
}
