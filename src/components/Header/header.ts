import { Userbar } from '@components/Userbar/userbar';
import template from '@components/Header/header.handlebars';
import { Component } from '@components/Component';
import { store } from '@store/Store';
import { router } from '@router/Router';
import { actionAuth } from '@store/actionCreater/userActions';
import { isMobile } from '@/config/config';

export interface Header {
    state: {
        user: user,
    }
}

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
    constructor(props :componentProps) {
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
     * Рендерит стандартный хэдер без пользовательских данных
     */
    render( search = '') {
        const header = this.rootNode.querySelector('.js-header');
        if (header) {
            header.remove();
        }

        this.rootNode.insertAdjacentHTML('afterbegin', template(
            Object.assign(
                { isMobile },
                this.state.user,
                { search },
            )
        ));

        if (this.state.user) {
            const userbar = new Userbar({ rootNode: this.rootNode });
            userbar.componentDidMount(this.state.user);
        } else {
            store.dispatch(actionAuth());
        }

        this.componentDidMount();
    }

    componentDidMount() {
        const form = this.rootNode.querySelector('.js-header-search');
        if (!form) {
            return;
        }
        this.submitHadndler = (e: Event) => {
            e.preventDefault();
            const request: string = (form.querySelector('.js-header__form__input') as HTMLInputElement).value;
            router.go({ path: '/search/', props: `q-${request}` }, { pushState: true, refresh: false  });
        }

        form.addEventListener('submit', this.submitHadndler);

        /*const collButton = this.rootNode.querySelector('.js-header__navlink-my-colls');

        if (!isMobile) {
            this.collHandler = function (e: Event) {
                if (!store.getState('user')) {
                    e.preventDefault(); 
                    ShowMessage('Вы должны быть авторизованы', 'negative');
                    return;
                }
            };
    
            collButton.addEventListener('click', this.collHandler);
        }*/
    }

    componentWillUnmount() {
        const form = this.rootNode.querySelector('.js-header-search');
        if (!form) {
            return;
        }

        form.removeEventListener('submit', this.submitHadndler)
    }
}

export const header = new Header({ rootNode: document.getElementById('root') });
