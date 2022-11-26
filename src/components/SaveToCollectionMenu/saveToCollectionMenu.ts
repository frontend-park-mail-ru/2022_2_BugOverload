import template from '@components/SaveToCollectionMenu/saveToCollectionMenu.handlebars';
import { Component } from '@components/Component';
import { store } from '@store/Store';
import { ShowMessage } from '@components/Message/message';
import {
    actionSaveToCollection,
} from '@actions/filmActions';

/**
* Отражает меню со списком имеющихся коллеций у пользователя
* Подписывается на измнение state listCollectionsUser
*/
export class SaveToCollectionMenu extends Component {
    constructor(nameLocation: string, filmId: number) {
        super();
        this.state.collections = null;
        this.filmId = filmId;
        this.placeholder = this.rootNode.querySelector(`.${nameLocation}`);

        // Навешиваем обработчик на выход по клику вне области меню
        this.closeMenuHandler = (e: Event) => {
            if (!(e.target as HTMLElement).closest(`.${nameLocation}`)) {
                this.close();
            }
        };
        document.addEventListener('click', this.closeMenuHandler);

        this.subHandler = () => {
            this.state.collections = store.getState('listCollectionsUser');
        };

        store.subscribe('listCollectionsUser', this.subHandler);
    }

    /**
     * Обработчик открытия меню
     *
     */
    open() {
        if (!this.placeholder) {
            return;
        }
        let menu = this.placeholder.querySelector('.js-menu-save__container');
        if (menu && menu.hasAttribute('open')) {
            this.close();
            return;
        }
        this.render();
        menu = this.placeholder.querySelector('.js-menu-save__container');
        menu.setAttribute('open', '');
    }

    /**
     * Обработчик закрытия меню
     */
    close() {
        if (!this.placeholder) {
            return;
        }

        const menu = this.placeholder.querySelector('.js-menu-save__container');
        if (menu) {
            this.componentWillUnmount();
            menu.remove();
        }
    }

    /**
     * Отрисовывает компонент, используя location и hbs-template.
     */
    render() {
        this.placeholder.insertAdjacentHTML('beforeend', template({ collections: this.state.collections }));
        this.componentDidMount();
    }

    /**
     * Навешивает обработчики на добаление в коллекцию
     */
    componentDidMount() {
        const btns = this.placeholder.querySelectorAll('.js-menu-save__item-btn');
        btns.forEach((button: HTMLElement) => {
            this[`${button.dataset.name}`] = (event: Event) => {
                event.preventDefault();
                // ShowMessage(`Коллекция ${button.dataset.name} в данный момент не доступна`, 'negative');

                this.state.collections = store.getState('listCollectionsUser');
                console.log(`dispatched LIST: ${JSON.stringify(this.state.collections)}`);

                if (!this.state.collections) {
                    ShowMessage('Ошибочная :(', 'negative');
                    return;
                }

                // const collection = this.state.collections.filter((coll: userCollListItem) => coll.name === 'Буду смотреть')
                store.dispatch(actionSaveToCollection({
                    idCollection: +button.dataset.id,
                    idFilm: this.filmId,
                }));
                console.log(`dispatched idCollection: ${button.id}, idFilm: ${this.filmId}`);
            };
            button.addEventListener('click', this[`${button.dataset.name}`]);
        });
    }

    /**
     * Освобождает ресурсы удалением обработчиков
     */
    componentWillUnmount() {
        const btns = this.placeholder.querySelectorAll('.js-menu-save__item-btn');
        if (!btns) {
            return;
        }
        btns.forEach((button: HTMLElement) => {
            button.removeEventListener('click', this[`${button.dataset.name}`]);
        });
    }

    unsubscribe() {
        this.componentWillUnmount();
        store.unsubscribe('listCollectionsUser', this.subHandler);
    }
}
