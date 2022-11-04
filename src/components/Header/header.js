import { Userbar } from '@components/Userbar/userbar.js';
import template from '@components/Header/header.handlebars';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { actionAuth } from '@store/actionCreater/userActions.js';

/**
* Отрисовывает хедер.
* Прокидывает actions в стору для авторизации
* также подписывается на изменения user, 
*
*/
export class Header extends Component {
    /**
     * Cохраняет props, подписывает на изменение user
     * @param {Object} props - параметры компонента
     */
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
        store.subscribe('user', () => {
            this.state.user = store.getState('user');
            this.render();
        });
    }

    /**
     * Рендерит стандартный хэдер в зависимости от this.state.user
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

export const header = new Header({ rootNode: document.getElementById('root') });
