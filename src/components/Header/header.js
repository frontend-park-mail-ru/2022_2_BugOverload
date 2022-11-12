import { Userbar } from '@components/Userbar/userbar.js';
import template from '@components/Header/header.handlebars';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { actionAuth } from '@store/actionCreater/userActions.js';
import { ShowMessage } from '@components/Message/message.js';

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
        store.subscribe('user', () => {
            this.state.user = store.getState('user');
            this.render();
        });

        this.isMounted = false;
    }

    /**
     * Рендерит стандартный хэдер без пользовательских данных
     */
    render() {
        if (this.isMounted) {
            this.componentWillUnmount();
        }
        const header = this.rootNode.querySelector('.js-header');
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

        this.componentDidMount();
    }

    componentDidMount() {
        const btnMyFilms = this.rootNode.querySelector('.js-header__navlink-my-films');
        this.handlerOpenMyFilms = () => ShowMessage('\"Мои Фильмы\" в разработке');
        btnMyFilms.addEventListener('click', handlerOpenMyFilms);

        const btnMyColls = this.rootNode.querySelector('.js-header__navlink-my-colls');
        this.handlerOpenColls = () => ShowMessage('\"Коллекции\" в разработке');
        btnMyColls.addEventListener('click', handlerOpenColls);

        const btnTop = this.rootNode.querySelector('.js-header__navlink-top-250');
        this.handlerOpenTop = () => ShowMessage('\"Топ-250\" в разработке');
        btnTop.addEventListener('click', handlerOpenTop);
    }

    componentWillUnmount() {
        const btnMyFilms = this.rootNode.querySelector('.js-header__navlink-my-films');
        btnMyFilms.removeEventListener('click', handlerOpenMyFilms);

        const btnMyColls = this.rootNode.querySelector('.js-header__navlink-my-colls');
        btnMyColls.removeEventListener('click', handlerOpenColls);

        const btnTop = this.rootNode.querySelector('.js-header__navlink-top-250');
        btnTop.removeEventListener('click', handlerOpenTop);
    }
}

export const header = new Header({ rootNode: document.getElementById('root') });
